/**
 * Breite und Höhe aller WebP-Bilder in public/anleitungen, damit MdxImage
 * `width`/`height` setzen kann und der Text beim Laden nicht springt (CLS).
 *
 * Liest nur den WebP-Kopf (VP8, VP8L, VP8X), ohne zusätzliche Abhängigkeit.
 * Läuft beim Laden der Vite-Konfiguration und schreibt src/data/image-sizes.json.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const PUBLIC = join(ROOT, 'public')
const DIRS = ['anleitungen']
const OUT = join(ROOT, 'src', 'data', 'image-sizes.json')

function webpSize(buf: Buffer): [number, number] | null {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = buf.toString('ascii', 12, 16)
  if (chunk === 'VP8X') {
    const w = 1 + buf.readUIntLE(24, 3)
    const h = 1 + buf.readUIntLE(27, 3)
    return [w, h]
  }
  if (chunk === 'VP8 ') {
    return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff]
  }
  if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21)
    return [1 + (b & 0x3fff), 1 + ((b >> 14) & 0x3fff)]
  }
  return null
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (name.endsWith('.webp')) out.push(path)
  }
  return out
}

export function writeImageSizes(): void {
  const sizes: Record<string, [number, number]> = {}
  for (const dir of DIRS) {
    for (const file of walk(join(PUBLIC, dir))) {
      const size = webpSize(readFileSync(file))
      if (size) sizes['/' + relative(PUBLIC, file).split(sep).join('/')] = size
    }
  }
  const json = JSON.stringify(sizes) + '\n'
  // Nur schreiben, wenn sich etwas geändert hat: sonst löst der Dev-Server
  // bei jedem Start einen Neuladen aus.
  let current = ''
  try { current = readFileSync(OUT, 'utf8') } catch { /* noch nicht vorhanden */ }
  if (current !== json) writeFileSync(OUT, json)
}
