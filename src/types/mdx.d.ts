declare module '*.mdx' {
  import type { ComponentType } from 'react'

  /** Wird von `build/remark-content-meta.ts` erzeugt. */
  export const meta: Record<string, unknown>

  const MDXContent: ComponentType<{ components?: Record<string, unknown> }>
  export default MDXContent
}
