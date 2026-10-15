import { useRef, useState, type FormEvent } from 'react'
import { OrbitDivider } from './OrbitMotif'
import { TRIAL_DAYS } from '../data/plans'
import { isValidEmail } from '../lib/forms'
import { downloadUrl, requestTrialLink, trialErrorText } from '../lib/trial'
import { track } from '../lib/analytics'

type Phase = 'ask' | 'sending' | 'done'

/**
 * Anmeldung zum Testen. Der Lizenz-Server schickt den Link zum Anmelden; die
 * Bestätigung zeigt gleich den Download, denn der Link öffnet nur die
 * installierte App.
 */
export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [phase, setPhase] = useState<Phase>('ask')
  const [error, setError] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [againNote, setAgainNote] = useState('')
  const [againBusy, setAgainBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const address = email.trim()
    if (!isValidEmail(address)) {
      setError(address ? trialErrorText(400) : 'Gib deine E-Mail-Adresse ein.')
      inputRef.current?.focus()
      return
    }
    setError('')
    setPhase('sending')
    // Honeypot: von echten Personen nie ausgefüllt. Der Bot sieht Erfolg und
    // erfährt nichts über den Filter.
    const status = honeypot ? 200 : await requestTrialLink(address)
    if (status !== 200) {
      setPhase('ask')
      setError(trialErrorText(status))
      inputRef.current?.focus()
      return
    }
    setSentTo(address)
    setAgainNote('')
    setPhase('done')
    if (!honeypot) track('trial_signup')
  }

  async function sendAgain() {
    setAgainBusy(true)
    setAgainNote('Wird gesendet …')
    const status = await requestTrialLink(sentTo)
    setAgainBusy(false)
    setAgainNote(status === 200 ? `Neuer Link an ${sentTo} ist unterwegs.` : trialErrorText(status))
  }

  function changeAddress() {
    setPhase('ask')
    setAgainNote('')
    requestAnimationFrame(() => inputRef.current?.select())
  }

  return (
    <section
      className="relative px-6 py-24 overflow-hidden"
      id="demo"
    >
      {/* Signature curved divider — marks the final transition into the CTA */}
      <OrbitDivider className="absolute inset-x-0 top-0 w-full h-6 text-line pointer-events-none" />

      {/* Subtle background glow */}
      <div aria-hidden="true" className="bg-orbit-halo pointer-events-none absolute -right-24 -top-32 size-[31.25rem] rounded-full blur-[80px]" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="reveal-up">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-4">
            10 Tage gratis. Ohne Risiko.
          </h2>
          <p className="text-secondary text-[0.9375rem] leading-[1.78] max-w-[44ch] mb-6">
            E-Mail-Adresse eingeben, WPorbit herunterladen und direkt loslegen. Ein Projekt mit allen verfügbaren Funktionen, ohne Kreditkarte.
          </p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {[
              'Ein Projekt mit allen verfügbaren Funktionen',
              'In wenigen Minuten startklar',
              'Keine Kreditkarte, keine Verpflichtung',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.875rem] text-secondary">
                <span className="text-accent flex-shrink-0 text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-up rounded-panel border border-line bg-surface p-6 shadow-card">
          {phase === 'done' ? (
            <div className="flex flex-col gap-5">
              <div>
                <h3
                  className="font-heading text-[1.25rem] font-semibold text-primary outline-none"
                  tabIndex={-1}
                  ref={(el) => el?.focus()}
                >
                  Prüfe deine E-Mails
                </h3>
                <p className="mt-2 text-[0.875rem] leading-[1.7] text-secondary">
                  Wir haben einen Link an <strong className="break-all font-semibold text-primary">{sentTo}</strong> geschickt.
                  Er gilt 30 Minuten.
                </p>
              </div>

              <ol className="flex flex-col gap-3 list-none p-0 m-0">
                <li className="flex gap-3 rounded-lg border border-line p-4">
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line font-heading text-[0.75rem] font-semibold text-primary">1</span>
                  <div>
                    <p className="font-heading text-[0.9375rem] font-semibold text-primary">WPorbit für macOS laden</p>
                    <p className="mt-1 text-[0.8125rem] leading-[1.6] text-secondary">
                      Datei öffnen und WPorbit in den Ordner „Programme“ ziehen.
                    </p>
                    <a href={downloadUrl} onClick={() => track('download_click', { location: 'testen' })} className="btn btn-primary btn-md mt-3">WPorbit laden</a>
                  </div>
                </li>
                <li className="flex gap-3 rounded-lg border border-line p-4">
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line font-heading text-[0.75rem] font-semibold text-primary">2</span>
                  <div>
                    <p className="font-heading text-[0.9375rem] font-semibold text-primary">Link aus der E-Mail auf diesem Mac öffnen</p>
                    <p className="mt-1 text-[0.8125rem] leading-[1.6] text-secondary">
                      WPorbit startet und meldet dich an. Bist du gerade nicht am Mac, öffne die E-Mail später dort.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="border-t border-line pt-4 text-[0.8125rem] text-secondary">
                <p>Keine E-Mail? Schau im Spam-Ordner nach.</p>
                <p className="mt-1 flex flex-wrap gap-x-5">
                  <button type="button" onClick={sendAgain} disabled={againBusy}
                    className="min-h-11 font-semibold text-accent-strong underline underline-offset-[3px] disabled:opacity-60">
                    Nochmals senden
                  </button>
                  <button type="button" onClick={changeAddress}
                    className="min-h-11 font-semibold text-accent-strong underline underline-offset-[3px]">
                    Andere Adresse eingeben
                  </button>
                </p>
                <p role="status" className="empty:hidden">{againNote}</p>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus. */}
              <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
                Website
                <input
                  type="text" tabIndex={-1} autoComplete="off"
                  value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold text-secondary" htmlFor="email-main">
                  E-Mail-Adresse
                </label>
                <input
                  id="email-main"
                  ref={inputRef}
                  type="email"
                  placeholder="du@agentur.ch"
                  required
                  autoComplete="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'email-main-error' : undefined}
                  className={`bg-base border text-primary text-sm px-3.5 py-2.5 rounded-lg placeholder:text-tertiary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    error ? 'border-danger' : 'border-line focus:border-accent'
                  }`}
                />
                {error && (
                  <p id="email-main-error" className="text-[0.75rem] text-danger" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={phase === 'sending'}
                className="btn btn-primary btn-md mt-1 disabled:opacity-60"
              >
                {phase === 'sending' ? 'Wird gesendet …' : 'Kostenlos testen →'}
              </button>

              <p className="text-[0.75rem] text-tertiary text-center">
                WPorbit ist eine App für macOS. Keine Kreditkarte, {TRIAL_DAYS} Tage gratis.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
