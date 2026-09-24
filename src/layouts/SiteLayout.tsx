import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import { useHashScroll } from '../lib/useHashScroll'

/** Höhe der fixierten Topbar (3.75rem) plus etwas Luft. */
const HEADER_OFFSET = 76

/**
 * Startet die GSAP-Animationen nach jedem Routenwechsel neu.
 *
 * Der dynamische Import ist entscheidend: `src/lib/animations.ts` registriert
 * ScrollTrigger auf Modulebene und greift auf `window` zu. Ein statischer
 * Import würde GSAP ins Server-Bundle ziehen und den Prerender zerlegen.
 */
function RouteAnimations() {
  const { pathname } = useLocation()

  useEffect(() => {
    let revert: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const { initAnimations } = await import('../lib/animations')
      if (cancelled) return
      revert = initAnimations()
    })()

    return () => {
      cancelled = true
      revert?.()
    }
  }, [pathname])

  return null
}

export default function SiteLayout() {
  useHashScroll(HEADER_OFFSET)

  return (
    <div className="min-h-screen bg-base text-primary">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] btn btn-secondary btn-sm focus:bg-surface"
      >
        Zum Inhalt springen
      </a>

      <Topbar />

      <main id="inhalt" className="pt-[3.75rem]">
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration getKey={(location) => location.pathname} />
      <RouteAnimations />
    </div>
  )
}
