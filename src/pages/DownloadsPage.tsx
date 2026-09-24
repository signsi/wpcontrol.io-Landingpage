import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { getChangelog } from '../lib/content'
import { formatDate } from '../lib/format'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Downloads', path: '/downloads' }]

const requirements = [
  { label: 'Betriebssystem', value: 'macOS 14 Sonoma oder neuer' },
  { label: 'Prozessor', value: 'Apple Silicon oder Intel' },
  { label: 'Arbeitsspeicher', value: 'Mindestens 8 GB, empfohlen 16 GB' },
  { label: 'Speicherplatz', value: 'Rund 2 GB, zusätzlich Platz pro Projekt' },
  { label: 'Zusätzlich nötig', value: 'Kein Docker, kein lokaler Webserver' },
]

export default function DownloadsPage() {
  const latest = getChangelog()[0]

  return (
    <>
      <Seo
        title="Downloads"
        description="WPorbit herunterladen: aktuelle Version, Systemvoraussetzungen und Installationshinweise für macOS."
        path="/downloads"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Downloads"
        title="WPorbit herunterladen"
        lead="Die Demo und die Vollversion nutzen dieselbe Anwendung. Nach der Anmeldung erhältst du den Download-Link per E-Mail."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/demo" className="btn btn-primary btn-md">Download anfordern</Link>
            <Link to="/changelog" className="btn btn-secondary btn-md">Changelog ansehen</Link>
          </>
        }
        bordered={false}
      />

      <section className="px-6 pb-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-panel border border-line bg-surface p-7">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-accent">
              Aktuelle Version
            </p>
            {latest ? (
              <>
                <p className="mt-3 font-heading text-[2rem] font-semibold leading-none text-primary">
                  {latest.version}
                </p>
                <p className="mt-2 text-[0.875rem] text-tertiary">
                  Veröffentlicht am {formatDate(latest.date)}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-secondary">{latest.title}</p>
                <Link
                  to={`/changelog#${latest.anchor}`}
                  className="mt-5 inline-block text-[0.875rem] font-medium text-accent-strong"
                >
                  Was ist neu →
                </Link>
              </>
            ) : (
              <p className="mt-3 text-[0.9375rem] text-secondary">
                Versionsangaben folgen mit dem ersten Changelog-Eintrag.
              </p>
            )}
          </article>

          <article className="rounded-panel border border-line bg-surface p-7">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">
              Systemvoraussetzungen
            </p>
            <dl className="mt-4 flex flex-col gap-3">
              {requirements.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 border-b border-border-soft pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:gap-4">
                  <dt className="text-[0.8125rem] text-tertiary sm:w-40 sm:shrink-0">{item.label}</dt>
                  <dd className="text-[0.875rem] text-secondary">{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <p className="mt-8 text-[0.875rem] leading-[1.7] text-secondary">
          Hilfe bei der Installation findest du in der Anleitung{' '}
          <Link to="/anleitungen/erste-schritte/wporbit-installieren" className="text-accent-strong underline">
            WPorbit installieren und Lizenz aktivieren
          </Link>
          .
        </p>
      </section>

      <CTABand
        title="Noch keine Lizenz?"
        text="Teste WPorbit zehn Tage lang mit einem Projekt. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
