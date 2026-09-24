import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrollt nach einer Navigation zu `#anker`.
 *
 * React Router navigiert bei `<Link to="/#preise">` zwar, scrollt aber nicht —
 * der Browser wertet den Hash nur bei einem echten Seitenaufruf aus.
 *
 * Der doppelte `requestAnimationFrame` ist notwendig: `initAnimations()` setzt
 * auf allen `.reveal-up`-Elementen `opacity: 0` und `y: 32`, was das Layout
 * verschiebt. Wer vorher misst, landet an der falschen Position.
 */
export function useHashScroll(offset = 76) {
  const { hash, key, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    let second = 0

    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      })
    })

    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [hash, key, pathname, offset])
}
