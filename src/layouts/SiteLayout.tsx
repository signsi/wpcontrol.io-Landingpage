import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import ConsentBanner from '../components/ConsentBanner'
import { useHashScroll } from '../lib/useHashScroll'
import { track } from '../lib/analytics'

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

/**
 * Meldet jeden Seitenaufruf an die dataLayer, auch den ersten: Die Seite lädt
 * bei Navigation nicht neu, und GA4 sendet im GTM selbst keine Seitenaufrufe
 * (`send_page_view: false`). Ein Frame später, damit `document.title` schon
 * zur neuen Seite gehört.
 */
function RouteAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      track('page_view', {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, search])

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
      <RouteAnalytics />
      <ConsentBanner />
    </div>
  )
}
