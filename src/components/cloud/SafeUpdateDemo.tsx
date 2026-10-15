import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const steps = [
  { label: 'Backup erstellt', detail: 'Dateien und Datenbank, vor jeder Änderung' },
  { label: 'Update eingespielt', detail: 'Contact Form 7 · 6.1.1 → 6.1.2' },
  { label: 'Visuell verglichen', detail: '5 wichtige Seiten · keine Abweichung' },
  { label: 'Lücke geschlossen', detail: 'Ohne Abweichung bleibt das Update. Sonst geht es zurück.' },
]

/** Schritt, der gerade läuft; `steps.length` heisst: alles erledigt. */
const STEP_MS = 1500
const HOLD_MS = 2600

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}

/** Eine Seite als Skizze: Kopf, Bild, Zeilen. Keine erfundene Website. */
function PageSketch({ label, scanning }: { label: string; scanning: boolean }) {
  return (
    <figure className="flex-1">
      <div className="relative overflow-hidden rounded-control border border-line bg-base p-2.5">
        <div className="mb-2 h-2 w-1/3 rounded-full bg-line" />
        <div className="mb-2 h-10 rounded-[6px] bg-accent-tint" />
        <div className="mb-1.5 h-1.5 w-full rounded-full bg-line" />
        <div className="mb-1.5 h-1.5 w-5/6 rounded-full bg-line" />
        <div className="h-1.5 w-2/3 rounded-full bg-line" />
        {scanning && (
          <span className="animate-scan pointer-events-none absolute inset-x-0 top-0 block h-6 bg-gradient-to-b from-transparent via-accent/25 to-transparent" aria-hidden="true" />
        )}
      </div>
      <figcaption className="mt-1.5 text-center text-[0.68rem] text-tertiary">{label}</figcaption>
    </figure>
  )
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/**
 * Vorschau auf „sicheres Update“: Backup, Update, Vergleich, fertig. Läuft als
 * Schleife, solange es zu sehen ist; mit reduzierter Bewegung steht es im
 * Endzustand. Klar als Vorschau beschriftet, weil die Funktion erst kommt.
 */
export default function SafeUpdateDemo() {
  const [running, setStep] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  // Ohne Bewegung gleich der fertige Stand, ohne setState im Effekt.
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false)
  const step = reduced ? steps.length : running

  useEffect(() => {
    if (typeof window === 'undefined' || reduced) return
    let timer: number | undefined
    let visible = false
    const tick = (s: number) => {
      if (!visible) return
      setStep(s)
      const next = s >= steps.length ? 0 : s + 1
      timer = window.setTimeout(() => tick(next), s >= steps.length ? HOLD_MS : STEP_MS)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (timer !== undefined) window.clearTimeout(timer)
      timer = undefined
      if (visible) tick(0)
    }, { threshold: 0.35 })
    if (ref.current) io.observe(ref.current)
    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      io.disconnect()
    }
  }, [reduced])

  const done = step >= steps.length

  return (
    <div ref={ref} className="rounded-panel border border-line bg-surface p-5 shadow-card sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.72rem] text-tertiary">Velo Shop Bern</p>
          <p className="font-heading text-[1.02rem] font-semibold text-primary">Contact Form 7 aktualisieren</p>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent-tint px-2.5 py-1 text-[0.68rem] font-semibold text-accent">
          Vorschau · kommt bis Ende 2026
        </span>
      </div>

      <ol className="mb-5 flex flex-col gap-2.5" aria-label="Ablauf eines sicheren Updates">
        {steps.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'run' : 'wait'
          return (
            <li key={s.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                  state === 'done'
                    ? 'border-transparent bg-[oklch(62%_0.14_150)] text-white'
                    : state === 'run'
                      ? 'border-accent text-accent'
                      : 'border-line text-transparent'
                }`}
                aria-hidden="true"
              >
                {state === 'done' ? <Check /> : state === 'run' ? <span className="size-2 rounded-full bg-accent motion-safe:animate-pulse" /> : null}
              </span>
              <span>
                <span className={`block text-[0.88rem] font-semibold transition-colors ${state === 'wait' ? 'text-tertiary' : 'text-primary'}`}>
                  {s.label}
                </span>
                <span className="block text-[0.76rem] text-tertiary">{s.detail}</span>
              </span>
            </li>
          )
        })}
      </ol>

      <div className="flex gap-3">
        <PageSketch label="vorher" scanning={step === 2} />
        <PageSketch label="nachher" scanning={step === 2} />
      </div>

      <p
        className={`mt-4 rounded-control px-3 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
          done ? 'bg-[oklch(95%_0.04_150)] text-[oklch(38%_0.1_150)]' : 'bg-raised text-tertiary'
        }`}
        aria-live="polite"
      >
        {done ? 'Fertig: Update eingespielt, Lücke geschlossen.' : 'Läuft …'}
      </p>
    </div>
  )
}
