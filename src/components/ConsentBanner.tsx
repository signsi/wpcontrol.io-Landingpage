import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, OPEN_CONSENT_EVENT, setConsent, type Consent } from '../lib/analytics'

/**
 * Einwilligung für Google Analytics. Erscheint, solange keine Wahl gespeichert
 * ist, und erneut über „Cookie-Einstellungen“ im Footer. Zwei gleichwertige
 * Knöpfe, nichts vorausgewählt; die Seite bleibt bedienbar.
 */
/** Die Wahl ändert sich nur über diesen Banner; er rendert danach selbst neu. */
const noSubscription = () => () => {}

export default function ConsentBanner() {
  // Beim Vorrendern unbekannt (Server-Wert `false`), erst im Browser
  // entscheiden, sonst wiche die Hydration ab. `useSyncExternalStore` liest den
  // Browser-Wert nach der Hydration, ohne setState im Effekt.
  const undecided = useSyncExternalStore(noSubscription, () => getConsent() === null, () => false)
  const [decided, setDecided] = useState(false)
  const [reopened, setReopened] = useState(false)
  const open = reopened || (undecided && !decided)
  const first = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const reopen = () => setReopened(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (open) first.current?.focus({ preventScroll: true })
  }, [open])

  if (!open) return null

  const choose = (value: Consent) => {
    setConsent(value)
    setDecided(true)
    setReopened(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Einwilligung zur Messung"
      aria-describedby="consent-text"
      className="fixed inset-x-4 bottom-4 z-[55] max-w-[24rem] rounded-panel border border-line bg-surface p-5 shadow-overlay sm:left-6 sm:right-auto sm:bottom-6"
    >
      <p className="font-heading text-[0.98rem] font-semibold text-primary">Darf WPorbit mitzählen?</p>
      <p id="consent-text" className="mt-1.5 text-[0.86rem] leading-[1.6] text-secondary">
        Mit deiner Zustimmung messen wir mit Google Analytics, wie die Website genutzt wird. Ohne Zustimmung setzen
        wir keine Cookies dafür. Mehr in der{' '}
        <Link to="/datenschutz" className="underline underline-offset-2 hover:text-accent">Datenschutzerklärung</Link>.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button ref={first} type="button" onClick={() => choose('granted')} className="btn btn-secondary btn-sm">
          Akzeptieren
        </button>
        <button type="button" onClick={() => choose('denied')} className="btn btn-secondary btn-sm">
          Nur notwendige
        </button>
      </div>
    </div>
  )
}
