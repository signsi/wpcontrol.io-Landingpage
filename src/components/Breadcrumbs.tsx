import { Link } from 'react-router-dom'
import type { Crumb } from '../lib/jsonld'

interface BreadcrumbsProps {
  /**
   * Ohne „Startseite" — die wird hier ergänzt. Dasselbe Array geht an
   * `breadcrumbLd()`, damit sichtbare und strukturierte Daten nie auseinanderlaufen.
   */
  crumbs: Crumb[]
  className?: string
}

export default function Breadcrumbs({ crumbs, className = '' }: BreadcrumbsProps) {
  const all = [{ label: 'Start', path: '/' }, ...crumbs]

  return (
    <nav aria-label="Brotkrümelnavigation" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[0.8125rem] text-tertiary">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-secondary">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="transition-colors hover:text-primary">
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className="text-line">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
