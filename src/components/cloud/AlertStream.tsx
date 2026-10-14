import { useEffect, useRef, useState } from 'react'

type Tone = 'down' | 'warn' | 'ok'

interface Alert {
  tone: Tone
  title: string
  detail: string
}

/** Demo-Meldungen, passend zu den Projekten im Screenshot darunter. */
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
const STEP_MS = 2600

/**
 * Alarme laufen ein wie im Team-Kanal: die neueste oben, ältere rutschen nach
 * unten und verblassen. Zeigt, was „beantwortet, bevor der Kunde anruft“
 * konkret heisst. Läuft nur, solange der Block sichtbar ist; mit reduzierter
 * Bewegung stehen die Meldungen still.
 */
export default function AlertStream() {
  const [head, setHead] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: number | undefined
    const start = () => {
      if (timer === undefined) timer = window.setInterval(() => setHead((h) => (h + 1) % alerts.length), STEP_MS)
    }
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer)
      timer = undefined
    }
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => {
      stop()
      io.disconnect()
    }
  }, [])

  const shown = Array.from({ length: VISIBLE }, (_, i) => ({
    alert: alerts[(head - i + alerts.length * 2) % alerts.length],
    key: head - i,
    depth: i,
  }))

  return (
    <div ref={ref} className="flex w-full max-w-[22rem] flex-col gap-2" aria-label="Beispiele für Alarme im Team-Kanal">
      <p className="mb-1 flex items-center gap-2 text-[0.72rem] font-semibold text-tertiary">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        #wartung
      </p>
      {shown.map(({ alert, key, depth }) => (
        <div
          key={key}
          className={`rounded-control border border-line bg-surface/95 px-3.5 py-2.5 shadow-overlay backdrop-blur-sm transition-[opacity,transform] duration-500 ease-out-expo ${depth === 0 ? 'animate-alert-in' : ''}`}
          style={{ opacity: 1 - depth * 0.28, transform: `scale(${1 - depth * 0.03})`, transformOrigin: 'top center' }}
        >
          <p className="flex items-center gap-2 text-[0.82rem] font-semibold text-primary">
            <span className={`size-2 shrink-0 rounded-full ${dot[alert.tone]}`} aria-hidden="true" />
            {alert.title}
          </p>
          <p className="mt-0.5 pl-4 text-[0.74rem] text-tertiary">{alert.detail}</p>
        </div>
      ))}
    </div>
  )
}
