import type { ComponentType } from 'react'
import type { Author } from '../../content/authors'

export interface TocItem {
  depth: number
  id: string
  text: string
}

/** Wird vom remark-Plugin `build/remark-content-meta.ts` erzeugt. */
export interface DerivedMeta {
  file: string
  wordCount: number
  readingMinutes: number
  toc: TocItem[]
}

export type MdxBody = ComponentType<{ components?: Record<string, unknown> }>
export type MdxLoader = () => Promise<{ default: MdxBody }>

export interface BlogPost extends DerivedMeta {
  kind: 'blog'
  slug: string
  path: string
  title: string
  description: string
  date: string
  updated?: string
  category: string
  tags: string[]
  author: Author
  cover?: string
  featured: boolean
  draft: boolean
  load: MdxLoader
}

export type GuideType = 'anleitung' | 'fehlerbehebung' | 'referenz'
export type GuideAudience = 'alle' | 'einsteiger' | 'fortgeschritten'

export interface Guide extends DerivedMeta {
  kind: 'guide'
  slug: string
  category: string
  path: string
  title: string
  description: string
  order: number
  updated: string
  type: GuideType
  audience: GuideAudience
  appliesTo: string[]
  related: string[]
  duration?: string
  draft: boolean
  /** Titel der Arbeitsschritte, Grundlage der HowTo-Auszeichnung. */
  steps: string[]
  load: MdxLoader
}

export interface ChangelogEntry extends DerivedMeta {
  kind: 'changelog'
  version: string
  anchor: string
  date: string
  title: string
  type: 'release' | 'patch' | 'beta'
  highlights: string[]
  draft: boolean
  load: MdxLoader
}

export interface LegalDoc extends DerivedMeta {
  kind: 'legal'
  slug: string
  path: string
  title: string
  description: string
  updated: string
  load: MdxLoader
}

export interface CategorySummary {
  slug: string
  label: string
  description: string
  count: number
  path: string
}

export interface GuideCategoryNode extends CategorySummary {
  guides: Guide[]
}

export interface SearchDoc {
  path: string
  kind: 'blog' | 'guide' | 'changelog'
  title: string
  description: string
  keywords: string
}
