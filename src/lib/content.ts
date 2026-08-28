/**
 * Content-Layer. Die einzige Stelle im Projekt, die weiss, dass Inhalte aus
 * MDX-Dateien stammen. Seitenkomponenten importieren ausschliesslich von hier.
 *
 * Für einen späteren Wechsel auf ein CMS muss nur dieses Modul ersetzt werden
 * (dann asynchron) — die Seitenkomponenten bleiben unverändert.
 *
 * Aufbau:
 *   - Metadaten kommen aus `virtual:wporbit-content`, das beim Build in Node
 *     erzeugt wird und keinerlei Artikeltext enthält.
 *   - Artikeltexte kommen aus einem lazy Glob, damit jeder Beitrag einen
 *     eigenen Chunk bekommt und nur beim Aufruf geladen wird.
 */
import { contentIndex } from 'virtual:wporbit-content'
import { resolveAuthor } from '../content/authors'
import { blogCategories, guideCategories } from '../content/taxonomy'
import type {
  BlogPost,
  CategorySummary,
  ChangelogEntry,
  Guide,
  GuideCategoryNode,
  LegalDoc,
  MdxLoader,
  SearchDoc,
} from './content/types'

const bodies = import.meta.glob('/src/content/**/*.mdx') as Record<string, MdxLoader>

const INCLUDE_DRAFTS = import.meta.env.DEV

const byCollection = (name: string) => contentIndex.filter((entry) => entry.collection === name)

const str = (value: unknown, fallback = ''): string => (value == null ? fallback : String(value))

/* ────────────────────────────── Blog ────────────────────────────── */

const posts: BlogPost[] = byCollection('blog')
  .map((entry) => {
    const { data } = entry
    return {
      kind: 'blog' as const,
      slug: entry.slug,
      path: `/blog/${entry.slug}`,
      title: str(data.title, entry.slug),
      description: str(data.description),
      date: str(data.date),
      updated: data.updated ? str(data.updated) : undefined,
      category: str(data.category, 'produkt'),
      tags: (data.tags as string[]) ?? [],
      author: resolveAuthor(data.author as string | undefined),
      cover: data.cover as string | undefined,
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      file: entry.id,
      wordCount: entry.wordCount,
      readingMinutes: entry.readingMinutes,
      toc: entry.toc,
      load: bodies[entry.id],
    }
  })
  .filter((post) => INCLUDE_DRAFTS || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getFeaturedPost(): BlogPost | undefined {
  return posts.find((post) => post.featured) ?? posts[0]
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return posts.filter((post) => post.category === categorySlug)
}

/** Nur Kategorien, die tatsächlich Beiträge enthalten — keine leeren Archivseiten. */
export function getBlogCategories(): CategorySummary[] {
  return blogCategories
    .map((category) => ({
      slug: category.slug,
      label: category.label,
      description: category.description,
      count: getPostsByCategory(category.slug).length,
      path: `/blog/kategorie/${category.slug}`,
    }))
    .filter((category) => category.count > 0)
}

/** Gleiche Kategorie zuerst, dann Tag-Überschneidung, dann die neuesten Beiträge. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return posts.slice(0, limit)

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score:
        (post.category === current.category ? 10 : 0) +
        post.tags.filter((tag) => current.tags.includes(tag)).length * 3,
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((hit) => hit.post)
}

/* ─────────────────────────── Hilfe-Center ─────────────────────────── */

const guides: Guide[] = byCollection('anleitungen')
  .map((entry) => {
    const { data } = entry
    const category = entry.category ?? 'erste-schritte'
    return {
      kind: 'guide' as const,
      slug: entry.slug,
      category,
      path: `/anleitungen/${category}/${entry.slug}`,
      title: str(data.title, entry.slug),
      description: str(data.description),
      order: Number(data.order ?? 999),
      updated: str(data.updated),
      type: (data.type as Guide['type']) ?? 'anleitung',
      audience: (data.audience as Guide['audience']) ?? 'alle',
      appliesTo: (data.appliesTo as string[]) ?? [],
      related: (data.related as string[]) ?? [],
      duration: data.duration as string | undefined,
      draft: Boolean(data.draft),
      steps: entry.steps,
      file: entry.id,
      wordCount: entry.wordCount,
      readingMinutes: entry.readingMinutes,
      toc: entry.toc,
      load: bodies[entry.id],
    }
  })
  .filter((guide) => INCLUDE_DRAFTS || !guide.draft)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'de-CH'))

export function getAllGuides(): Guide[] {
  return guides
}

export function getGuide(category: string, slug: string): Guide | undefined {
  return guides.find((guide) => guide.category === category && guide.slug === slug)
}

export function getGuidesByCategory(categorySlug: string): Guide[] {
  return guides.filter((guide) => guide.category === categorySlug)
}

export function getGuideTree(): GuideCategoryNode[] {
  return guideCategories
    .map((category) => {
      const items = getGuidesByCategory(category.slug)
      return {
        slug: category.slug,
        label: category.label,
        description: category.description,
        count: items.length,
        path: `/anleitungen/${category.slug}`,
        guides: items,
      }
    })
    .filter((category) => category.count > 0)
}

/** Vorheriger und nächster Beitrag in der Reihenfolge des gesamten Hilfe-Centers. */
export function getGuideNeighbours(
  category: string,
  slug: string,
): { prev?: Guide; next?: Guide } {
  const flat = getGuideTree().flatMap((node) => node.guides)
  const index = flat.findIndex((guide) => guide.category === category && guide.slug === slug)
  if (index === -1) return {}
  return { prev: flat[index - 1], next: flat[index + 1] }
}

export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  const explicit = guide.related
    .map((ref) => {
      const [category, slug] = ref.split('/')
      return getGuide(category, slug)
    })
    .filter((found): found is Guide => Boolean(found))

  if (explicit.length >= limit) return explicit.slice(0, limit)

  const sameCategory = getGuidesByCategory(guide.category).filter(
    (candidate) =>
      candidate.slug !== guide.slug && !explicit.some((item) => item.path === candidate.path),
  )
  return [...explicit, ...sameCategory].slice(0, limit)
}

/* ──────────────────────────── Changelog ──────────────────────────── */

const changelog: ChangelogEntry[] = byCollection('changelog')
  .map((entry) => {
    const { data } = entry
    const version = str(data.version, entry.slug)
    return {
      kind: 'changelog' as const,
      version,
      anchor: `v${version.replace(/\./g, '-')}`,
      date: str(data.date),
      title: str(data.title),
      type: (data.type as ChangelogEntry['type']) ?? 'release',
      highlights: (data.highlights as string[]) ?? [],
      draft: Boolean(data.draft),
      file: entry.id,
      wordCount: entry.wordCount,
      readingMinutes: entry.readingMinutes,
      toc: entry.toc,
      load: bodies[entry.id],
    }
  })
  .filter((entry) => INCLUDE_DRAFTS || !entry.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getChangelog(): ChangelogEntry[] {
  return changelog
}

/* ────────────────────────────── Legal ────────────────────────────── */

const legalDocs: LegalDoc[] = byCollection('legal').map((entry) => {
  const { data } = entry
  return {
    kind: 'legal' as const,
    slug: entry.slug,
    path: `/${entry.slug}`,
    title: str(data.title, entry.slug),
    description: str(data.description),
    updated: str(data.updated),
    file: entry.id,
    wordCount: entry.wordCount,
    readingMinutes: entry.readingMinutes,
    toc: entry.toc,
    load: bodies[entry.id],
  }
})

export function getLegalDocs(): LegalDoc[] {
  return legalDocs
}

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug)
}

/* ─────────────────────────────── Suche ─────────────────────────────── */

export function searchIndex(): SearchDoc[] {
  return [
    ...posts.map((post) => ({
      path: post.path,
      kind: 'blog' as const,
      title: post.title,
      description: post.description,
      keywords: [...post.tags, post.category, ...post.toc.map((item) => item.text)].join(' '),
    })),
    ...guides.map((guide) => ({
      path: guide.path,
      kind: 'guide' as const,
      title: guide.title,
      description: guide.description,
      keywords: [guide.category, guide.type, ...guide.toc.map((item) => item.text)].join(' '),
    })),
  ]
}
