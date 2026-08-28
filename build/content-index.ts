/**
 * Stellt das virtuelle Modul `virtual:wporbit-content` bereit: den Index aller
 * Inhalte mit Frontmatter, Lesezeit und Inhaltsverzeichnis.
 *
 * Warum nicht `import.meta.glob(..., { eager: true, import: 'meta' })`?
 * Ein eager Glob erzeugt einen *statischen* Import derselben Datei, die auch
 * lazy geladen wird. Rollup legt beides in denselben Chunk — dadurch wurde auf
 * jeder Seite jeder Artikeltext per `modulepreload` mitgeladen und das
 * Code-Splitting pro Beitrag war wirkungslos.
 *
 * Der Index wird deshalb in Node berechnet und enthält keinerlei Artikeltext.
 * Die Texte kommen ausschliesslich über einen lazy Glob.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'
import GithubSlugger from 'github-slugger'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:wporbit-content'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

const WORDS_PER_MINUTE = 200

interface TocEntry {
  depth: number
  id: string
  text: string
}

export interface ContentIndexEntry {
  /** Root-relativer Pfad, identisch mit den Schlüsseln des lazy Globs. */
  id: string
  collection: string
  category: string | null
  slug: string
  data: Record<string, unknown>
  wordCount: number
  readingMinutes: number
  toc: TocEntry[]
  /** Titel der `<Step>`-Blöcke — Grundlage für die HowTo-Auszeichnung. */
  steps: string[]
}

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, out)
    else if (entry.name.endsWith('.mdx')) out.push(full)
  }
  return out
}

function splitFrontmatter(source: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) return { data: {}, body: source }

  const body = source.slice(match[0].length)
  try {
    return { data: (parseYaml(match[1]) as Record<string, unknown>) ?? {}, body }
  } catch {
    // Fehlerhaftes Frontmatter darf den Build nicht abbrechen; der Eintrag
    // fällt dann über fehlende Pflichtfelder auf.
    return { data: {}, body }
  }
}

/** Datumsangaben aus YAML kommen als Date-Objekt zurück und müssen serialisierbar sein. */
function normaliseData(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    out[key] = value instanceof Date ? value.toISOString().slice(0, 10) : value
  }
  return out
}

/** Entfernt Inline-Markdown, damit der Slug dem von rehype-slug entspricht. */
function headingText(raw: string): string {
  return raw
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

/**
 * Die echten Arbeitsschritte stehen in `<Step title="…">`, nicht in den
 * Überschriften. Würde man h2 verwenden, landeten Abschnitte wie
 * „Nächste Schritte" fälschlich als HowTo-Schritt in den strukturierten Daten.
 */
function extractSteps(body: string): string[] {
  const steps: string[] = []
  const pattern = /<Step\s+title="([^"]+)"/g
  let match: RegExpExecArray | null
  while ((match = pattern.exec(body)) !== null) steps.push(match[1])
  return steps
}

function analyse(body: string): { wordCount: number; toc: TocEntry[] } {
  const lines = body.split(/\r?\n/)
  const slugger = new GithubSlugger()
  const toc: TocEntry[] = []
  const prose: string[] = []
  let inFence = false

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const heading = /^(#{2,3})\s+(.*)$/.exec(line)
    if (heading) {
      const text = headingText(heading[2])
      toc.push({ depth: heading[1].length, id: slugger.slug(text), text })
      prose.push(text)
      continue
    }

    prose.push(line)
  }

  const wordCount = prose
    .join(' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/[#*_>|`-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return { wordCount, toc }
}

async function buildIndex(contentDir: string): Promise<ContentIndexEntry[]> {
  const files = await walk(contentDir)
  files.sort()

  const entries: ContentIndexEntry[] = []
  for (const file of files) {
    const relative = path.relative(contentDir, file).split(path.sep)
    const source = await readFile(file, 'utf8')
    const { data, body } = splitFrontmatter(source)
    const { wordCount, toc } = analyse(body)

    entries.push({
      id: `/src/content/${relative.join('/')}`,
      collection: relative[0],
      category: relative.length > 2 ? relative[1] : null,
      slug: relative[relative.length - 1].replace(/\.mdx$/, ''),
      data: normaliseData(data),
      wordCount,
      readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
      toc,
      steps: extractSteps(body),
    })
  }

  return entries
}

export function contentIndexPlugin(): Plugin {
  const contentDir = path.resolve(process.cwd(), 'src/content')

  return {
    name: 'wporbit:content-index',
    enforce: 'pre',

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },

    async load(id) {
      if (id !== RESOLVED_ID) return null
      const entries = await buildIndex(contentDir)
      return `export const contentIndex = ${JSON.stringify(entries)}\n`
    },

    configureServer(server) {
      // Frontmatter-Änderungen wirken sich auf den Index aus, nicht nur auf die
      // Datei selbst — deshalb das virtuelle Modul gezielt invalidieren.
      server.watcher.add(contentDir)
      const invalidate = (file: string) => {
        if (!file.endsWith('.mdx')) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', invalidate)
      server.watcher.on('change', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}
