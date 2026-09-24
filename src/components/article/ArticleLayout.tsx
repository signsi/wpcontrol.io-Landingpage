import type { ReactNode } from 'react'
import Breadcrumbs from '../Breadcrumbs'
import TableOfContents from './TableOfContents'
import type { TocItem } from '../../lib/content/types'
import type { Crumb } from '../../lib/jsonld'

interface ArticleLayoutProps {
  crumbs: Crumb[]
  kicker?: ReactNode
  title: string
  lead?: string
  meta?: ReactNode
  toc: TocItem[]
  children: ReactNode
  /** Inhalt unterhalb des Artikels: verwandte Beiträge, CTA, Newsletter. */
  footer?: ReactNode
  /** Rechtstexte werden dichter gesetzt. */
  compact?: boolean
}

/**
 * Gemeinsames Gerüst für Blog, Anleitungen und Rechtstexte.
 *
 * Das Raster ist bewusst schmal: `#root` ist auf 1120px begrenzt, der
 * Fliesstext bekommt maximal 68ch, damit die Zeilenlänge lesbar bleibt.
 * Breite Elemente brechen über `.prose-bleed` aus.
 */
export default function ArticleLayout({
  crumbs,
  kicker,
  title,
  lead,
  meta,
  toc,
  children,
  footer,
  compact = false,
}: ArticleLayoutProps) {
  return (
    <article className="px-6 pb-20 pt-12">
      <Breadcrumbs crumbs={crumbs} className="mb-7" />

      <header className="mb-10 max-w-[46rem] border-b border-line pb-9">
        {kicker && <div className="mb-3">{kicker}</div>}
        <h1 className="font-heading text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-primary">
          {title}
        </h1>
        {lead && <p className="prose-lede mt-4">{lead}</p>}
        {meta && <div className="mt-6">{meta}</div>}
      </header>

      <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className={`min-w-0 ${compact ? 'prose-article prose-compact' : 'prose-article'}`}>
          {children}
        </div>

        <aside className="order-first lg:order-none">
          <TableOfContents items={toc} />
        </aside>
      </div>

      {footer && <div className="mt-16 max-w-[46rem]">{footer}</div>}
    </article>
  )
}
