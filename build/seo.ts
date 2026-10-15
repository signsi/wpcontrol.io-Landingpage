/**
 * Erzeugt die Sitemap nach dem Prerendering.
 *
 * Die Quelle sind die tatsächlich geschriebenen HTML-Dateien, nicht die
 * Routen-Definition. Damit kann die Sitemap keine URL nennen, die nicht
 * gebaut wurde.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { SITE } from '../src/config/site'
import { lastmodByPath } from './content-fs'

async function collectHtmlFiles(dir: string, out: string[] = []): Promise<string[]> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await collectHtmlFiles(full, out)
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

export async function writeSeoFiles(outDir = 'dist'): Promise<void> {
  const files = await collectHtmlFiles(outDir)
  const lastmod = await lastmodByPath()

  const urls = files
    .map((file) => '/' + path.relative(outDir, file).split(path.sep).join('/'))
    .map((url) => url.replace(/\/index\.html$/, '').replace(/\.html$/, ''))
    .map((url) => (url === '' ? '/' : url))
    .filter((url) => url !== '/404')
    .sort()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      // lastmod nur, wenn es ein echtes Änderungsdatum gibt (Frontmatter).
      // Das Build-Datum auf allen übrigen Seiten wäre jeden Tag neu, und
      // Google ignoriert lastmod ganz, sobald es unzuverlässig wirkt.
      (url) =>
        `  <url><loc>${SITE.url}${url === '/' ? '/' : url}</loc>${
          lastmod[url] ? `<lastmod>${lastmod[url]}</lastmod>` : ''
        }</url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
  console.log(`[seo] sitemap.xml mit ${urls.length} URLs geschrieben`)

  await lintSeo(outDir, files)
}

/**
 * Warnt bei Titeln über 60 Zeichen, Beschreibungen ausserhalb 110–160
 * Zeichen, doppelten Titeln oder Beschreibungen und Seiten ohne genau einen
 * JSON-LD-Block. Bricht den Build nicht ab.
 */
async function lintSeo(outDir: string, files: string[]): Promise<void> {
  const decode = (s: string) =>
    s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const warnings: string[] = []
  const seenTitle = new Map<string, string>()
  const seenDesc = new Map<string, string>()
  for (const file of files) {
    const rel = '/' + path.relative(outDir, file).split(path.sep).join('/')
    if (rel === '/404.html') continue
    const html = await readFile(file, 'utf8')
    if (/<meta[^>]+name="robots"[^>]+noindex/.test(html)) continue
    const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '')
    const desc = decode(html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)?.[1] ?? '')
    const ld = (html.match(/application\/ld\+json/g) ?? []).length
    if ([...title].length > 60) warnings.push(`${rel}: Titel ${[...title].length} Zeichen`)
    const d = [...desc].length
    if (d < 110 || d > 160) warnings.push(`${rel}: Beschreibung ${d} Zeichen`)
    if (ld !== 1) warnings.push(`${rel}: ${ld} JSON-LD-Blöcke`)
    if (seenTitle.has(title)) warnings.push(`${rel}: gleicher Titel wie ${seenTitle.get(title)}`)
    if (seenDesc.has(desc)) warnings.push(`${rel}: gleiche Beschreibung wie ${seenDesc.get(desc)}`)
    seenTitle.set(title, rel)
    seenDesc.set(desc, rel)
  }
  if (warnings.length) {
    console.warn(`[seo] ${warnings.length} Hinweise:\n  ` + warnings.join('\n  '))
  } else {
    console.log('[seo] Titel, Beschreibungen und JSON-LD in Ordnung')
  }
}
