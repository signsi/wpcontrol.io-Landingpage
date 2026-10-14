import { Link, useLocation } from 'react-router-dom'
import { track } from '../lib/analytics'

/**
 * Störer in der Navigation: weist auf WPorbit Cloud hin. Auf /cloud selbst
 * nicht nötig. `compact` für die schmale Kopfzeile auf dem Handy.
 */
export default function CloudBadge({ compact = false }: { compact?: boolean }) {
  const { pathname } = useLocation()
  if (pathname === '/cloud' || pathname.startsWith('/cloud/')) return null

  return (
    <Link
      to="/cloud"
      onClick={() => track('cta_click', { location: compact ? 'nav_badge_compact' : 'nav_badge', target: '/cloud' })}
      className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint px-3 py-1.5 text-[0.78rem] font-semibold text-accent-strong transition-colors duration-200 hover:border-accent/60 hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {compact ? 'Neu: Cloud' : (
        <>
          Neu: WPorbit Cloud
          <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </>
      )}
    </Link>
  )
}
