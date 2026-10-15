import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Vor dem ersten Zeichnen, aber ohne Warnung beim Vorrendern auf dem Server. */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

type Tone = 'down' | 'warn' | 'ok'

interface Alert {
  tone: Tone
  title: string
  detail: string
}

/** Demo-Meldungen, passend zu den Projekten im Screenshot daneben. */
const alerts: Alert[] = [
  { tone: 'down', title: 'Kanzlei Weber ist nicht erreichbar', detail: 'seit 2 Min. · Nachprüfung bestätigt' },
  { tone: 'warn', title: 'Velo Shop Bern: Update schliesst Lücke', detail: 'Contact Form 7 · 6.1.1 → 6.1.2' },
  { tone: 'ok', title: 'Muster AG: Testmail angekommen', detail: 'nach 4 s · SPF, DKIM, DMARC in Ordnung' },
  { tone: 'warn', title: 'Stiftung Blau: SSL läuft bald ab', detail: 'in 12 Tagen · Zertifikat erneuern' },
]

const dot: Record<Tone, string> = {
  down: 'bg-[oklch(58%_0.19_25)]',
  warn: 'bg-[oklch(72%_0.15_75)]',
  ok: 'bg-[oklch(62%_0.14_150)]',
}

const VISIBLE = 3
/** Pause zwischen dem Erscheinen des Fensters und der ersten Meldung. */
const FIRST_MS = 450
/** Abstand der ersten Meldungen beim Auffüllen. */
const FILL_MS = 650
/** Danach: alle paar Sekunden eine neue Meldung. */
const STEP_MS = 2800

/**
 * Der Team-Kanal zum Screenshot: Das Fenster fährt ein, sobald die
 * Visualisierung ganz zu sehen ist; dann laufen die Meldungen einzeln ein,
 * jede mit einem kurzen Aufleuchten. Ohne JavaScript und bei reduzierter
 * Bewegung stehen Fenster und drei Meldungen von Anfang an da.
 */
export default function AlertStream() {
  const ref = useRef<HTMLDivElement>(null)
  // Zustand vor dem Einfahren. Erst nach dem Mounten gesetzt, damit der
  // vorgerenderte HTML-Stand das Fenster zeigt.
  const [armed, setArmed] = useState(false)
  const [open, setOpen] = useState(false)
  // Wie viele Meldungen schon da sind, und welche als neueste oben steht.
  const [count, setCount] = useState(VISIBLE)
  const [head, setHead] = useState(VISIBLE - 1)

  useBeforePaint(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setArmed(true)
    setCount(0)
    setHead(-1)
  }, [])

  // Einfahren, sobald die Visualisierung ganz sichtbar ist. Auf schmalen
  // Bildschirmen steht das Fenster unter dem Bild; dann zählt das Fenster.
  useEffect(() => {
    if (!armed || open || !ref.current) return
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const target = (wide ? ref.current.closest('.hero-image') : null) ?? ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.92 || (entry.isIntersecting && entry.boundingClientRect.height > window.innerHeight)) {
          setOpen(true)
          io.disconnect()
        }
      },
      { threshold: [0, 0.5, 0.92, 1] },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [armed, open])

  // Auffüllen, dann in Ruhe weiterlaufen lassen, solange es zu sehen ist.
  useEffect(() => {
    if (!armed || !open) return
    let timer: number | undefined
    let visible = true
    const schedule = (ms: number) => {
      timer = window.setTimeout(() => {
        if (!visible) return
        setHead((h) => h + 1)
        setCount((c) => Math.min(c + 1, VISIBLE))
        schedule(STEP_MS)
      }, ms)
    }
    // Die ersten Meldungen dichter hintereinander.
    let filled = 0
    const fill = () => {
      timer = window.setTimeout(
        () => {
          setHead((h) => h + 1)
          setCount((c) => Math.min(c + 1, VISIBLE))
          filled += 1
          if (filled < VISIBLE) fill()
          else schedule(STEP_MS)
        },
        filled === 0 ? FIRST_MS : FILL_MS,
      )
    }
    fill()
    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (!visible && timer !== undefined && filled >= VISIBLE) {
        window.clearTimeout(timer)
        timer = undefined
      }
      if (visible && !was && filled >= VISIBLE) schedule(STEP_MS)
    })
    if (ref.current) io.observe(ref.current)
    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      io.disconnect()
    }
  }, [armed, open])

  const shown = Array.from({ length: Math.max(0, count) }, (_, i) => ({
    alert: alerts[(((head - i) % alerts.length) + alerts.length) % alerts.length],
    key: head - i,
    depth: i,
  }))

  const hidden = armed && !open

  return (
    // Ein geschlossenes, deckendes Kanal-Fenster: nichts vom Screenshot darunter
    // scheint durch. Ältere Meldungen treten über die Textfarbe zurück.
    <div
      ref={ref}
      className={`w-full max-w-[22rem] overflow-hidden rounded-panel border border-line bg-surface shadow-overlay transition-[opacity,transform,filter] duration-700 ease-out-expo ${
        hidden ? 'translate-y-10 scale-90 opacity-0 blur-sm' : 'translate-y-0 scale-100 opacity-100 blur-0'
      }`}
      aria-label="Beispiele für Alarme im Team-Kanal"
    >
      <p className="flex items-center gap-2 border-b border-line bg-raised px-4 py-2.5 text-[0.76rem] font-semibold text-primary">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        #wartung
        <span className="ml-auto font-normal text-tertiary">Slack</span>
      </p>
      {/* Feste Höhe für drei Meldungen, damit beim Auffüllen nichts springt. */}
      <ul className="h-[12.65rem] divide-y divide-line">
        {shown.map(({ alert, key, depth }) => (
          <li key={key} className={`px-4 py-3 ${depth === 0 && armed ? 'animate-alert-in' : ''}`}>
            <p
              className={`flex items-center gap-2 text-[0.82rem] font-semibold transition-colors duration-500 ${
                depth === 0 ? 'text-primary' : 'text-secondary'
              }`}
            >
              <span className={`size-2 shrink-0 rounded-full ${dot[alert.tone]}`} aria-hidden="true" />
              <span className="truncate">{alert.title}</span>
            </p>
            <p className="mt-0.5 truncate pl-4 text-[0.74rem] text-tertiary">{alert.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
