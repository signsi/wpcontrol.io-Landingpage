import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

const features = [
  {
    title: 'Staging und Preview',
    detail: 'Änderungen gegen eine isolierte Staging-Umgebung testen, bevor sie live gehen. Vorschau-Links lassen sich direkt mit Kunden teilen – ohne etwas zu veröffentlichen. Jede Staging-Umgebung ist unabhängig von der Produktion.',
  },
  {
    title: 'Monitoring und Update-Planung',
    detail: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert für alle Sites. Updates werden im Cloud Portal geplant, gegen Staging getestet und mit einem Klick ausgerollt. Rollback jederzeit möglich.',
  },
  {
    title: 'Vault-Synchronisation',
    detail: 'Der Team-Vault synchronisiert Zugangsdaten sicher zwischen allen Teammitgliedern. SSH-Keys, WP-Admin-Logins, Datenbank-Credentials und API-Tokens – pro Projekt organisiert, auf Personenebene freigegeben. Gehostet in der Schweiz, DSGVO-konform verschlüsselt.',
  },
  {
    title: 'Projekte und Zugänge zentral verwalten',
    detail: 'Alle Kundenprojekte, Sites und Zugänge an einem Ort. Neue Teammitglieder erhalten Zugang auf Projektebene – nie alles auf einmal. Das Cloud Portal ist über den Browser erreichbar, ohne lokale Installation.',
  },
  {
    title: 'Wartungsplanung im Dashboard',
    detail: 'Core-, Plugin- und Theme-Updates werden gebündelt oder einzeln geplant. Der Zeitplan ist im Dashboard sichtbar, Benachrichtigungen laufen per Mail, Slack oder Webhook. Weniger manuelle Abstimmung, weniger vergessene Updates.',
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
      <main className="pt-[3.25rem]">

        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <div className="flex items-center gap-2.5 mb-3">
            <p className="font-mono font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent">
              Cloud
            </p>
            <span className="text-[0.65rem] font-bold tracking-wide text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-0.5">
              Empfohlen
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] mb-4 max-w-2xl">
            Alles für das Team.<br />Im Cloud Portal.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[50ch] mb-2">
            Monitoring, Update-Planung, Vault-Synchronisation und Projektverwaltung – alles in einer zentralen Oberfläche für das gesamte Team.
          </p>
          <div className="flex items-end gap-2 leading-none mb-8 mt-5">
            <span className="font-heading font-extrabold text-[2.8rem] tracking-[-0.03em] text-primary leading-none">ab 1200</span>
            <span className="text-secondary text-[0.88rem] leading-tight mb-1.5">CHF / Monat<br /><span className="text-tertiary text-[0.78rem]">3 Personen inkl.</span></span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Early Access sichern
            </Link>
            <Link to="/#preise" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
              Alle Pläne vergleichen
            </Link>
          </div>
        </section>

        {/* Features */}
        {features.map((f, i) => (
          <section key={f.title} className="px-6 py-14 border-b border-line last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 items-start max-w-4xl">
              <div>
                <p className="font-mono font-bold text-[0.62rem] uppercase tracking-[0.13em] text-tertiary mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-heading font-bold text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.2] tracking-[-0.02em] text-primary">
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
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.12] tracking-[-0.025em] mb-3 max-w-[26ch] mx-auto">
            Bereit, den WordPress-Alltag zu vereinfachen?
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[44ch] mx-auto mb-7">
            Sichere dir Early Access, erhalte sofort die ROI- und Migrations-Checkliste und gestalte die nächsten Prioritäten aktiv mit.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Early Access sichern
            </Link>
            <Link to="/standalone" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
              Standalone-Plan ansehen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
