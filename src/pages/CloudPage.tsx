import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

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

export default function CloudPage() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="features" />
      <main className="pt-[3.75rem]">

        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <div className="flex items-center gap-2.5 mb-3">
            <p className="font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent">
              Cloud
            </p>
            <span className="text-[0.65rem] font-bold tracking-wide text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-0.5">
              In Entwicklung
            </span>
          </div>
          <h1 className="font-heading font-semibold text-[clamp(2.1rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] mb-4 max-w-2xl">
            Dort weiterarbeiten, wo das Team aufgehört hat.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[50ch] mb-2">
            Cloud synchronisiert Projekte, Arbeitsstände und Standards. So bleibt Know-how im Team und Aufgaben können ohne Übergabeverlust weitergeführt werden.
          </p>
          <div className="flex items-end gap-2 leading-none mb-8 mt-5">
            <span className="font-heading font-semibold text-[2.8rem] tracking-[-0.03em] text-primary leading-none">ab 1200</span>
            <span className="text-secondary text-[0.88rem] leading-tight mb-1.5">CHF / Monat<br /><span className="text-tertiary text-[0.78rem]">3 Personen inkl.</span></span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#demo" className="gradient-solar rounded-full px-5 py-3 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              Standalone jetzt testen
            </Link>
            <Link to="/#preise" className="border border-line text-secondary text-sm px-5 py-3 rounded-full hover:text-primary hover:border-secondary/60 transition-colors">
              Alle Pläne vergleichen
            </Link>
          </div>
        </section>

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

        {features.map((f, i) => (
          <section key={f.title} className="px-6 py-14 border-b border-line last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 items-start max-w-4xl">
              <div>
                <p className="font-bold text-[0.62rem] uppercase tracking-[0.13em] text-tertiary mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-heading font-semibold text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.2] tracking-[-0.02em] text-primary">
                  {f.title}
                </h2>
              </div>
              <p className="text-secondary text-[0.95rem] leading-[1.78] lg:pt-8">
                {f.detail}
              </p>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="px-6 py-20 bg-surface border-t border-line text-center">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-3 max-w-[26ch] mx-auto">
            Heute mit Standalone starten.
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[44ch] mx-auto mb-7">
            Die lokale App funktioniert unabhängig von Cloud. Du kannst sie bereits heute zehn Tage lang mit einem Projekt testen.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/#demo" className="gradient-solar rounded-full px-5 py-3 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              Standalone testen
            </Link>
            <Link to="/standalone" className="border border-line text-secondary text-sm px-5 py-3 rounded-full hover:text-primary hover:border-secondary/60 transition-colors">
              Standalone-Plan ansehen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
