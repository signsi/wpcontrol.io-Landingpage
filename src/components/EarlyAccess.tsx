import { useState, type FormEvent } from 'react'
import { OrbitDivider } from './OrbitMotif'
import { isValidEmail, submitForm, type FormStatus } from '../lib/forms'
import { TRIAL_DAYS } from '../data/plans'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Bitte gib eine gültige geschäftliche E-Mail-Adresse ein.')
      return
    }

    setStatus('submitting')
    const result = await submitForm('demo', { email, website: honeypot })
    setStatus(result.ok ? 'success' : 'error')
    setMessage(result.message)
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
            Geschäftliche E-Mail eingeben, WPorbit herunterladen und direkt loslegen. Ein Projekt mit allen verfügbaren Funktionen, ohne Kreditkarte.
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
          {status === 'success' ? (
            <div className="flex flex-col items-start gap-3 py-4" role="status">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
                ✓
              </span>
              <p className="font-heading text-[1.0625rem] font-semibold text-primary">
                Fast geschafft
              </p>
              <p className="text-[0.875rem] leading-[1.7] text-secondary">{message}</p>
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
                  Geschäftliche E-Mail
                </label>
                <input
                  id="email-main"
                  type="email"
                  placeholder="team@agentur.ch"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'email-main-error' : undefined}
                  className={`bg-base border text-primary text-sm px-3.5 py-2.5 rounded-lg placeholder:text-tertiary outline-none transition-colors ${
                    status === 'error' ? 'border-danger' : 'border-line focus:border-accent'
                  }`}
                />
                {status === 'error' && (
                  <p id="email-main-error" className="text-[0.75rem] text-danger" role="alert">
                    {message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary btn-md mt-1 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Einen Moment …' : 'Kostenlos testen →'}
              </button>

              <p className="text-[0.75rem] text-tertiary text-center">
                Keine Kreditkarte. {TRIAL_DAYS} Tage gratis. Voller Funktionsumfang.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
