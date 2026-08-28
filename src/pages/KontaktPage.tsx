import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { isValidEmail, submitForm, type FormStatus } from '../lib/forms'
import { SITE } from '../config/site'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Kontakt', path: '/kontakt' }]

const topics = [
  'Allgemeine Frage',
  'Demo-Termin vereinbaren',
  'Offerte für Cloud',
  'Massgeschneiderte Lösung',
  'Support für bestehende Kunden',
]

const inputClass =
  'rounded-control border border-line bg-base px-3.5 py-2.5 text-[0.9375rem] text-primary outline-none transition-colors placeholder:text-tertiary focus:border-accent'

export default function KontaktPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    const nextErrors: Record<string, string> = {}
    if (!data.name?.trim()) nextErrors.name = 'Bitte gib deinen Namen an.'
    if (!isValidEmail(data.email ?? '')) nextErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    if (!data.nachricht?.trim()) nextErrors.nachricht = 'Bitte schreib uns kurz, worum es geht.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    const result = await submitForm('kontakt', data)
    setStatus(result.ok ? 'success' : 'error')
    setMessage(result.message)
  }

  return (
    <>
      <Seo
        title="Kontakt"
        description="Fragen zu WPorbit, ein Demo-Termin oder eine Offerte für eine massgeschneiderte Lösung? Schreib uns."
        path="/kontakt"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Kontakt"
        title="Schreib uns"
        lead="Ob konkrete Frage, Demo-Termin oder Offerte: wir antworten innerhalb von zwei Arbeitstagen."
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="rounded-panel border border-line bg-surface p-7">
            {status === 'success' ? (
              <div className="flex flex-col items-start gap-3 py-6" role="status">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
                  ✓
                </span>
                <p className="font-heading text-[1.125rem] font-semibold text-primary">Nachricht angekommen</p>
                <p className="text-[0.9375rem] leading-[1.7] text-secondary">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus. */}
                <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[0.75rem] font-semibold text-secondary">Name</label>
                    <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} aria-invalid={Boolean(errors.name)} />
                    {errors.name && <p className="text-[0.75rem] text-danger" role="alert">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="agentur" className="text-[0.75rem] font-semibold text-secondary">Agentur (optional)</label>
                    <input id="agentur" name="agentur" type="text" autoComplete="organization" className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.75rem] font-semibold text-secondary">E-Mail</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="name@agentur.ch" className={inputClass} aria-invalid={Boolean(errors.email)} />
                  {errors.email && <p className="text-[0.75rem] text-danger" role="alert">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="thema" className="text-[0.75rem] font-semibold text-secondary">Thema</label>
                  <select id="thema" name="thema" className={inputClass} defaultValue={topics[0]}>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nachricht" className="text-[0.75rem] font-semibold text-secondary">Nachricht</label>
                  <textarea id="nachricht" name="nachricht" required rows={6} className={`${inputClass} resize-y`} aria-invalid={Boolean(errors.nachricht)} />
                  {errors.nachricht && <p className="text-[0.75rem] text-danger" role="alert">{errors.nachricht}</p>}
                </div>

                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-md self-start disabled:opacity-60">
                  {status === 'submitting' ? 'Wird gesendet …' : 'Nachricht senden'}
                </button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-7">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">Direkt per E-Mail</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 block text-[0.9375rem] text-accent-strong underline">
                {SITE.email}
              </a>
            </div>

            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">Schon Kunde?</p>
              <p className="mt-2 text-[0.875rem] leading-[1.65] text-secondary">
                Für technische Fragen führt der schnellste Weg über die{' '}
                <Link to="/anleitungen" className="text-accent-strong underline">Anleitungen</Link>{' '}
                oder den{' '}
                <Link to="/support" className="text-accent-strong underline">Support</Link>.
              </p>
            </div>

            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">Antwortzeit</p>
              <p className="mt-2 text-[0.875rem] leading-[1.65] text-secondary">
                Innerhalb von zwei Arbeitstagen, meist deutlich schneller.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
