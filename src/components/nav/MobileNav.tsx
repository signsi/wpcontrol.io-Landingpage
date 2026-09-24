import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { primaryCta, primaryNav, secondaryCta } from '../../config/navigation'

interface MobileNavProps {
  onNavigate: () => void
}

/**
 * Vollflächiges Overlay unterhalb der Topbar. Die Gruppen sind native
 * <details>-Akkordeons — `index.css` entfernt den Marker bereits im
 * @layer base, deshalb braucht das keinerlei JavaScript.
 */
export default function MobileNav({ onNavigate }: MobileNavProps) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-0 top-[3.75rem] z-40 flex flex-col overflow-y-auto border-t border-line bg-base md:hidden">
      <nav className="flex flex-col gap-1 px-6 py-5" aria-label="Hauptnavigation mobil">
        {primaryNav.map((group) => {
          if (group.to) {
            return (
              <Link
                key={group.label}
                to={group.to}
                onClick={onNavigate}
                className="py-3 text-[0.9375rem] font-semibold text-primary"
              >
                {group.label}
              </Link>
            )
          }

          const items = group.columns ? group.columns.flatMap((c) => c.items) : (group.items ?? [])

          return (
            <details key={group.label} className="border-b border-border-soft last:border-b-0">
              <summary className="flex cursor-pointer items-center justify-between py-3 text-[0.9375rem] font-semibold text-primary">
                {group.label}
                <svg width="10" height="7" viewBox="0 0 9 6" fill="none" aria-hidden="true" className="text-tertiary">
                  <path d="M1 1.5L4.5 4.5L8 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="flex flex-col gap-0.5 pb-3 pl-1">
                {items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className="flex items-center gap-2 py-2 text-[0.875rem] text-secondary"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] font-semibold text-tertiary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </details>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2.5 border-t border-line bg-surface px-6 py-5">
        <Link to={primaryCta.to} onClick={onNavigate} className="btn btn-primary btn-md">
          {primaryCta.label}
        </Link>
        <Link to={secondaryCta.to} onClick={onNavigate} className="btn btn-secondary btn-md">
          {secondaryCta.label}
        </Link>
      </div>
    </div>
  )
}
