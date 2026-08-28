import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import type { Crumb } from '../lib/jsonld'

interface PageHeroProps {
  kicker?: string
  title: ReactNode
  lead?: ReactNode
  crumbs?: Crumb[]
  actions?: ReactNode
  /** Zusätzlicher Inhalt unterhalb der CTAs, z. B. Preisangabe oder Meta-Zeile. */
  children?: ReactNode
  bordered?: boolean
}

/**
 * Einheitlicher Seitenkopf. Ersetzt den zuvor auf jeder Unterseite von Hand
 * kopierten Hero-Block (Standalone, Cloud, Custom, Features).
 */
export default function PageHero({
  kicker,
  title,
  lead,
  crumbs,
  actions,
  children,
  bordered = true,
}: PageHeroProps) {
  return (
    <section className={`px-6 pt-12 pb-14 ${bordered ? 'border-b border-line' : ''}`}>
      {crumbs && <Breadcrumbs crumbs={crumbs} className="mb-6" />}

      {kicker && (
        <p className="hero-kicker mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">
          {kicker}
        </p>
      )}

      <h1 className="hero-heading mb-4 max-w-3xl font-heading text-[clamp(2.1rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        {title}
      </h1>

      {lead && (
        <p className="hero-body max-w-[52ch] text-[1rem] leading-[1.75] text-secondary">
          {lead}
        </p>
      )}

      {children}

      {actions && <div className="hero-ctas mt-8 flex flex-wrap gap-3">{actions}</div>}
    </section>
  )
}
