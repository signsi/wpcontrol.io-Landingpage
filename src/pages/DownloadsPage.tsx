import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { getChangelog } from '../lib/content'
import { formatDate } from '../lib/format'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Downloads', path: '/downloads' }]

const requirements = [
  { label: 'Betriebssystem', value: 'macOS 15 Sequoia oder neuer' },
  { label: 'Prozessor', value: 'Apple Silicon oder Intel' },
  { label: 'Arbeitsspeicher', value: 'Mindestens 8 GB, empfohlen 16 GB' },
  { label: 'Speicherplatz', value: 'Rund 2 GB, zusätzlich Platz pro Projekt' },
  { label: 'Zusätzlich nötig', value: 'Homebrew (auf Entwicklungs-Macs meist schon vorhanden). Colima, die Docker-Werkzeuge und Vault richtet WPorbit selbst ein, Docker Desktop ist nicht nötig' },
]

const installSteps = [
  {
    title: 'Download anfordern',
    text: 'Auf der Seite Gratis testen deine E-Mail-Adresse eingeben und WPorbit direkt laden. Den Link zum Anmelden bekommst du per E-Mail.',
  },
  {
    title: 'In den Programme-Ordner legen',
    text: 'Die .dmg-Datei öffnen und WPorbit in den Ordner Programme ziehen. Beim ersten Öffnen fragt macOS einmal nach, weil die App aus dem Internet stammt.',
  },
  {
    title: 'Umgebung einrichten lassen',
    text: 'Nach der Anmeldung richtet der Assistent Colima, Docker, Vault und lokale Domains ein. Dabei lädt er rund 500 MB und fragt einmal nach deinem Mac-Passwort.',
  },
]

export default function DownloadsPage() {
  const latest = getChangelog()[0]

  return (
    <>
      <Seo
        title="Download für macOS: WordPress-App für Agenturen"
        description="WPorbit für macOS herunterladen: aktuelle Version, Systemvoraussetzungen, Installation in drei Schritten und Updates direkt über die App."
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
            <Link to="/testen" className="btn btn-primary btn-md">Download anfordern</Link>
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

        <h2 className="mb-6 mt-16 font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Installation in drei Schritten
        </h2>

        <ol className="grid list-none gap-4 p-0 md:grid-cols-3">
          {installSteps.map((step, i) => (
            <li key={step.title} className="rounded-panel border border-line bg-surface p-6">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">Schritt {i + 1}</p>
              <h3 className="mt-2 font-heading text-[1.0625rem] font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.65] text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-[0.875rem] leading-[1.7] text-secondary">
          Jeden Schritt mit Bildern zeigt die Anleitung{' '}
          <Link to="/anleitungen/erste-schritte/wporbit-installieren" className="text-accent-strong underline">
            WPorbit installieren und einrichten
          </Link>
          . Bricht die Einrichtung ab, hilft{' '}
          <Link to="/anleitungen/fehlerbehebung/einrichtung-schlaegt-fehl" className="text-accent-strong underline">
            Einrichtung schlägt fehl
          </Link>
          .
        </p>

        <h2 className="mb-3 mt-16 font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Updates kommen über die App
        </h2>
        <p className="max-w-[60ch] text-[0.9375rem] leading-[1.7] text-secondary">
          Einmal installiert, musst du nichts mehr von dieser Seite laden. WPorbit sucht selbst nach
          neuen Versionen, zeigt dir die Änderungen und installiert das Update auf Wunsch. Jedes
          Update ist signiert. Von Hand prüfst du über WPorbit → Nach Updates suchen…, mehr dazu in{' '}
          <Link to="/anleitungen/wartung/wporbit-aktualisieren" className="text-accent-strong underline">
            WPorbit aktualisieren
          </Link>
          .
        </p>
      </section>

      <CTABand
        title="Noch keine Lizenz?"
        text="Teste WPorbit zehn Tage lang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
