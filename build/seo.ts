/**
 * Erzeugt die Sitemap nach dem Prerendering.
 *
 * Die Quelle sind die tatsächlich geschriebenen HTML-Dateien, nicht die
 * Routen-Definition. Damit kann die Sitemap keine URL nennen, die nicht
 * gebaut wurde.
 */
import { readdir, writeFile } from 'node:fs/promises'
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
  const buildDay = new Date().toISOString().slice(0, 10)

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
      (url) =>
        `  <url><loc>${SITE.url}${url}</loc><lastmod>${lastmod[url] ?? buildDay}</lastmod></url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
  console.log(`[seo] sitemap.xml mit ${urls.length} URLs geschrieben`)
}
