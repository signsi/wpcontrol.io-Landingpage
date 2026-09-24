/**
 * Node-seitiges Gegenstück zum Content-Layer.
 *
 * `import.meta.glob` steht in vite.config.ts nicht zur Verfügung, deshalb liest
 * dieses Modul die MDX-Dateien direkt vom Dateisystem — ausschliesslich, um für
 * die Sitemap ein `lastmod` je URL zu bestimmen. Es enthält bewusst keine
 * Routing-Logik, damit es nicht von `src/lib/content.ts` abweichen kann.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content')

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.name.endsWith('.mdx')) out.push(full)
  }
  return out
}

function frontmatter(source: string): Record<string, unknown> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)
  if (!match) return {}
  try {
    return (parseYaml(match[1]) as Record<string, unknown>) ?? {}
  } catch {
    return {}
  }
}

function toDateString(value: unknown): string | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

/** Liefert z. B. `{ '/blog/mein-artikel': '2026-04-02' }`. */
export async function lastmodByPath(): Promise<Record<string, string>> {
  const files = await walk(CONTENT_DIR)
  const result: Record<string, string> = {}

  for (const file of files) {
    const rel = path.relative(CONTENT_DIR, file).split(path.sep)
    const collection = rel[0]
    const slug = rel[rel.length - 1].replace(/\.mdx$/, '')
    const data = frontmatter(await readFile(file, 'utf8'))
    const lastmod = toDateString(data.updated) ?? toDateString(data.date)
    if (!lastmod) continue

    if (collection === 'blog') result[`/blog/${slug}`] = lastmod
    else if (collection === 'anleitungen') result[`/anleitungen/${rel[1]}/${slug}`] = lastmod
    else if (collection === 'legal') result[`/${slug}`] = lastmod
  }

  return result
}
