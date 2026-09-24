import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import NumberedFeatures from '../components/NumberedFeatures'
import CTABand from '../components/CTABand'
import { CLOUD_INCLUDED_SEATS, plans } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'

const cloud = plans.find((p) => p.id === 'cloud')!

const features = [
  {
    title: 'Projekte und Arbeitsstände synchronisieren',
    detail: 'Cloud wird Projekte, Konfigurationen und aktuelle Arbeitsstände zwischen berechtigten Teammitgliedern synchronisieren. Dadurch arbeitet jede Person mit demselben verlässlichen Projektstand.',
  },
  {
    title: 'Nahtlose Übergaben und Know-how-Transfer',
    detail: 'Teammitglieder sollen dort weiterarbeiten können, wo andere aufgehört haben. Projektwissen, Standards und wiederkehrende Abläufe bleiben für das Team verfügbar, statt nur bei einzelnen Personen.',
  },
  {
    title: 'Staging und Preview',
    detail: 'Geplant sind isolierte Staging-Umgebungen für Tests vor dem Live-Gang. Vorschau-Links sollen sich direkt mit Kunden teilen lassen, ohne Änderungen zu veröffentlichen.',
  },
  {
    title: 'Monitoring und Update-Planung',
    detail: 'Uptime, Security-Scans und Performance-Checks sollen automatisiert für alle Sites laufen. Updates werden künftig im Cloud Portal geplant, gegen Staging getestet und kontrolliert ausgerollt.',
  },
  {
    title: 'Vault-Synchronisation',
    detail: 'Der geplante Team-Vault wird Zugangsdaten sicher zwischen berechtigten Teammitgliedern synchronisieren. SSH-Keys, Logins und Tokens bleiben dabei pro Projekt organisiert und auf Personenebene freigegeben.',
  },
  {
    title: 'Projekte und Zugänge zentral verwalten',
    detail: 'Das Cloud Portal soll Kundenprojekte, Sites und Zugänge an einem Ort zusammenführen. Neue Teammitglieder erhalten später gezielten Zugriff auf Projektebene.',
  },
  {
    title: 'Wartungsplanung im Dashboard',
    detail: 'Core-, Plugin- und Theme-Updates sollen sich gebündelt oder einzeln planen lassen. Zeitpläne und Benachrichtigungen werden Teil des gemeinsamen Dashboards.',
  },
  {
    title: 'Deploy via Pipelines',
    detail: 'WPorbit funktioniert grundsätzlich mit jedem Anbieter, der Pipelines unterstützt. GitLab ist der erste Anwendungsfall, GitHub funktioniert analog. Die Pipelines liegen in der Verantwortung der Agentur; für GitLab bieten wir vorgefertigte Vorlagen an.',
  },
]

const crumbs = [{ label: 'Cloud', path: '/cloud' }]

export default function CloudPage() {
  return (
    <>
      <Seo
        title="Cloud"
        description="WPorbit Cloud synchronisiert Projekte, Arbeitsstände und Zugänge im ganzen Agenturteam. Aktuell in Entwicklung."
        path="/cloud"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Cloud"
        title="Dort weiterarbeiten, wo das Team aufgehört hat."
        lead="Cloud synchronisiert Projekte, Arbeitsstände und Standards. So bleibt Know-how im Team und Aufgaben können ohne Übergabeverlust weitergeführt werden."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/demo" className="btn btn-primary btn-md">Standalone jetzt testen</Link>
            <Link to="/preise" className="btn btn-secondary btn-md">Alle Pläne vergleichen</Link>
          </>
        }
      >
        <div className="mt-5 flex items-end gap-2 leading-none">
          <span className="font-heading text-[2.8rem] font-semibold leading-none tracking-[-0.03em] text-primary">
            {cloud.priceMain}
          </span>
          <span className="mb-1.5 text-[0.88rem] leading-tight text-secondary">
            {cloud.priceSub}
            <br />
            <span className="text-[0.78rem] text-tertiary">{CLOUD_INCLUDED_SEATS} Personen inkl.</span>
          </span>
        </div>
      </PageHero>

      <section className="border-b border-line bg-raised px-6 py-8">
        <div className="flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-accent">Produktstatus</p>
            <p className="mt-1 text-[0.9rem] leading-[1.65] text-secondary">
              Die folgenden Funktionen beschreiben die geplante Cloud-Version. Standalone ist davon unabhängig.
            </p>
          </div>
          <Link to="/standalone" className="shrink-0 text-sm font-semibold text-primary hover:text-accent">
            Verfügbare Funktionen ansehen →
          </Link>
        </div>
      </section>

      <NumberedFeatures features={features} />

      <CTABand
        title="Heute mit Standalone starten."
        text="Die lokale App funktioniert unabhängig von Cloud. Du kannst sie bereits heute zehn Tage lang mit einem Projekt testen."
        primary={{ label: 'Standalone testen', to: '/demo' }}
        secondary={{ label: 'Standalone-Plan ansehen', to: '/standalone' }}
      />
    </>
  )
}
