import { useState, type FormEvent } from 'react'
import { isValidEmail, submitForm, type FormStatus } from '../../lib/forms'

interface NewsletterSignupProps {
  variant?: 'footer' | 'article'
}

export default function NewsletterSignup({ variant = 'article' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.')
      return
    }

    setStatus('submitting')
    const result = await submitForm('newsletter', { email, website: honeypot })
    setStatus(result.ok ? 'success' : 'error')
    setMessage(result.message)
    if (result.ok) setEmail('')
  }

  const isArticle = variant === 'article'

  return (
    <div
      className={
        isArticle
          ? 'rounded-panel border border-line bg-surface p-7'
          : 'flex flex-col gap-3'
      }
    >
      <div>
        <p className={isArticle
          ? 'font-heading text-[1.125rem] font-semibold text-primary'
          : 'text-[0.75rem] font-bold uppercase tracking-[0.13em] text-tertiary'}>
          {isArticle ? 'Neue Beiträge direkt ins Postfach' : 'Newsletter'}
        </p>
        <p className={`text-[0.875rem] leading-[1.6] text-secondary ${isArticle ? 'mt-2 max-w-[52ch]' : 'mt-2'}`}>
          {isArticle
            ? 'Praxiswissen für WordPress-Agenturen. Etwa einmal im Monat, jederzeit abbestellbar.'
            : 'Tipps für WordPress-Agenturen, etwa monatlich.'}
        </p>
      </div>

      {status === 'success' ? (
        <p className="mt-4 flex items-center gap-2 text-[0.875rem] font-medium text-success" role="status">
          <span aria-hidden="true">✓</span>
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-2 sm:flex-row ${isArticle ? 'mt-5' : ''}`} noValidate>
          {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus. */}
          <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
            Website
            <input
              type="text" tabIndex={-1} autoComplete="off"
              value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>

          <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
            E-Mail-Adresse
          </label>
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            required
            placeholder="name@agentur.ch"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? `newsletter-error-${variant}` : undefined}
            className={`min-w-0 flex-1 rounded-control border bg-base px-4 py-2.5 text-[0.875rem] text-primary transition-colors placeholder:text-tertiary ${
              status === 'error' ? 'border-danger' : 'border-line focus:border-accent'
            }`}
          />
          <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-md disabled:opacity-60">
            {status === 'submitting' ? 'Wird gesendet …' : 'Abonnieren'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p id={`newsletter-error-${variant}`} className="mt-2 text-[0.8125rem] text-danger" role="alert">
          {message}
        </p>
      )}
    </div>
  )
}
