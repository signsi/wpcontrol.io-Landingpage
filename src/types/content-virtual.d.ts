declare module 'virtual:wporbit-content' {
  export interface ContentIndexEntry {
    /** Root-relativer Pfad, identisch mit den Schlüsseln des lazy MDX-Globs. */
    id: string
    collection: string
    category: string | null
    slug: string
    data: Record<string, unknown>
    wordCount: number
    readingMinutes: number
    toc: { depth: number; id: string; text: string }[]
    steps: string[]
  }

  export const contentIndex: ContentIndexEntry[]
}
