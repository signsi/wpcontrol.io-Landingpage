import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initAnimations(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const ctx = gsap.context(() => {

    // ── Hero entrance: staggered timeline ──────────────────────────────────
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-kicker',  { opacity: 0, y: 10, duration: 0.5 })
      .from('.hero-heading', { opacity: 0, y: 26, duration: 0.75 }, '-=0.3')
      .from('.hero-body',    { opacity: 0, y: 18, duration: 0.65 }, '-=0.45')
      .from('.hero-ctas',    { opacity: 0, y: 14, duration: 0.55 }, '-=0.4')
      .from('.hero-image',   { opacity: 0, x: 28, duration: 0.85, ease: 'power2.out' }, '-=0.65')

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

  })

  return () => ctx.revert()
}
