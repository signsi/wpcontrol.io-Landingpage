import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Dieses Modul darf nur dynamisch importiert werden (siehe SiteLayout).
 * Es registriert Plugins auf Modulebene und greift auf `window` zu — beides
 * würde beim Prerendering in Node fehlschlagen.
 */
export function initAnimations(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const ctx = gsap.context(() => {

    // ── Hero entrance: staggered timeline ──────────────────────────────────
    // Nur auf Seiten mit Hero. Ohne diese Prüfung meldet GSAP auf jeder
    // Unterseite „target not found" für alle fünf Selektoren.
    if (document.querySelector('.hero-heading')) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (document.querySelector('.hero-kicker')) tl.from('.hero-kicker', { opacity: 0, y: 10, duration: 0.5 })
      tl.from('.hero-heading', { opacity: 0, y: 26, duration: 0.75 }, '-=0.3')
      if (document.querySelector('.hero-body')) tl.from('.hero-body', { opacity: 0, y: 18, duration: 0.65 }, '-=0.45')
      if (document.querySelector('.hero-ctas')) tl.from('.hero-ctas', { opacity: 0, y: 14, duration: 0.55 }, '-=0.4')
      if (document.querySelector('.hero-image')) tl.from('.hero-image', { opacity: 0, x: 28, duration: 0.85, ease: 'power2.out' }, '-=0.65')
    }

    // ── Scroll: single reveal (opacity + y) ───────────────────────────────
    gsap.utils.toArray<Element>('.reveal-up').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    // ── Scroll: stagger children ───────────────────────────────────────────
    gsap.utils.toArray<Element>('.stagger-group').forEach((group) => {
      gsap.from(Array.from(group.children), {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      })
    })

    // ── Scroll: horizontal stagger (logo row) ─────────────────────────────
    gsap.utils.toArray<Element>('.stagger-x').forEach((group) => {
      gsap.from(Array.from(group.children), {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: 'top 90%', once: true },
      })
    })

    // Nach einem Routenwechsel sind alle Positionen neu — Trigger nachmessen.
    ScrollTrigger.refresh()
  })

  return () => ctx.revert()
}
