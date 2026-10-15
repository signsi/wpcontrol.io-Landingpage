import type { ReactNode } from 'react'
import { NoIcon, YesIcon } from './icons'

export type Mark = 'yes' | 'no' | 'partly' | 'soon'

interface Point {
  mark: Mark
  text: string
}

const usual: Point[] = [
  { mark: 'no', text: 'Plugin auf jeder Kundenseite' },
  { mark: 'no', text: 'Zugangsdaten je nach Dienst beim Anbieter' },
  { mark: 'no', text: 'Kein Mailtest über den echten Mailweg' },
  { mark: 'partly', text: 'Änderungsverlauf teils als Zusatz' },
  { mark: 'yes', text: 'Updates aus der Ferne' },
  { mark: 'partly', text: 'Backups teils als Zusatz oder über Plugins' },
  { mark: 'no', text: 'Betrieb in der EU oder den USA' },
  { mark: 'no', text: 'Nur Wartung, keine lokale Entwicklung' },
]

const orbit: Point[] = [
  { mark: 'yes', text: 'Kein Plugin, nur ein beschränkter Lese-Schlüssel' },
  { mark: 'yes', text: 'Keine Zugangsdaten beim Dienst' },
  { mark: 'yes', text: 'Mailtest über den echten Mailweg' },
  { mark: 'yes', text: 'Änderungsverlauf, Alarm bei neuem Admin' },
  { mark: 'soon', text: 'Updates aus der Ferne, bis Ende 2026' },
  { mark: 'soon', text: 'Backups, bis Ende 2026' },
  { mark: 'yes', text: 'Entwickelt und gehostet in der Schweiz' },
  { mark: 'yes', text: 'Mit der App für die lokale Entwicklung' },
]

export function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === 'yes')
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
        <YesIcon />
        <span className="sr-only">Ja:</span>
      </span>
    )
  if (mark === 'soon')
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-dashed border-accent/50 text-accent">
        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" />
          <path d="M8 5v3l2 1.5" />
        </svg>
        <span className="sr-only">Kommt:</span>
      </span>
    )
  if (mark === 'partly')
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-raised text-tertiary">
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
          <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="sr-only">Teilweise:</span>
      </span>
    )
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-raised text-tertiary">
      <NoIcon />
      <span className="sr-only">Nein:</span>
    </span>
  )
}

/** Eine Kundenseite als Kachel, mit dem, was darauf liegt. */
export function SiteTile({ badge }: { badge: ReactNode }) {
  return (
    <div className="relative flex-1 rounded-[8px] border border-line bg-base p-2">
      <div className="mb-1.5 flex gap-1" aria-hidden="true">
        <span className="size-1 rounded-full bg-line" />
        <span className="size-1 rounded-full bg-line" />
        <span className="size-1 rounded-full bg-line" />
      </div>
      <div className="mb-1.5 h-5 rounded-[4px] bg-raised" />
      <div className="mb-1 h-1 w-full rounded-full bg-line" />
      <div className="h-1 w-2/3 rounded-full bg-line" />
      <span className="absolute -right-2 -top-2">{badge}</span>
    </div>
  )
}

export const PluginBadge = () => (
  <span className="grid size-6 place-items-center rounded-full border border-line bg-surface text-tertiary shadow-card" title="Plugin">
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0zM12 16v5" />
    </svg>
  </span>
)

export const KeyBadge = () => (
  <span className="grid size-6 place-items-center rounded-full bg-accent text-on-accent shadow-action" title="Lese-Schlüssel">
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2 2M14 9l2 2" />
    </svg>
  </span>
)

function Card({
  title,
  where,
  badge,
  points,
  accent = false,
}: {
  title: string
  where: string
  badge: ReactNode
  points: Point[]
  accent?: boolean
}) {
  return (
    <article
      className={`flex flex-col rounded-panel border p-6 ${
        accent ? 'border-accent/30 bg-accent/[0.06] shadow-card' : 'border-line bg-surface'
      }`}
    >
      <div className={`mb-6 rounded-control p-4 ${accent ? 'bg-surface' : 'bg-raised'}`}>
        <div className="flex gap-3">
          <SiteTile badge={badge} />
          <SiteTile badge={badge} />
          <SiteTile badge={badge} />
        </div>
        <p className="mt-3 text-center text-[0.72rem] text-tertiary">{where}</p>
      </div>
      <h3 className={`mb-4 font-heading text-[1.15rem] font-semibold ${accent ? 'text-accent' : 'text-primary'}`}>{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p.text} className="flex items-start gap-2.5 text-[0.88rem] leading-[1.45]">
            <MarkIcon mark={p.mark} />
            <span className={p.mark === 'no' ? 'text-tertiary' : 'text-secondary'}>{p.text}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

/**
 * Gegenüberstellung statt Tabelle: oben der Aufbau als Bild (Plugin auf jeder
 * Seite gegen Lese-Schlüssel), darunter die Unterschiede als Liste.
 */
export default function CompareCards() {
  return (
    <div className="stagger-group grid grid-cols-1 gap-5 md:grid-cols-2">
      <Card title="Übliche Wartungsdienste" where="je ein Plugin auf jeder Kundenseite" badge={<PluginBadge />} points={usual} />
      <Card title="WPorbit Cloud" where="ein beschränkter Lese-Schlüssel, kein Plugin" badge={<KeyBadge />} points={orbit} accent />
    </div>
  )
}
