import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

const features = [
  {
    title: 'Alles aus dem Cloud-Plan',
    detail: 'Custom baut auf dem gesamten Cloud-Plan auf: Monitoring, Update-Planung, Vault-Synchronisation, Staging, Deploy-Pipelines und das zentrale Portal sind vollständig enthalten. Was hinzukommt, ist massgeschneidert auf deine Agentur.',
  },
  {
    title: 'CRM- und ERP-Integrationen',
    detail: 'Verbinde WPorbit mit bestehenden Systemen in deiner Agentur – etwa HubSpot, Salesforce, SAP, Bexio oder anderen CRM- und ERP-Lösungen. Projektdaten, Kundenstamm und Zugänge lassen sich so in bestehende Prozesse einbetten.',
  },
  {
    title: 'Custom Workflows',
    detail: 'Definiere eigene Automatisierungsabläufe, die auf deine internen Prozesse passen: Onboarding neuer Projekte, Übergaben zwischen Entwicklung und Betrieb, automatisierte Qualitätsprüfungen vor jedem Deploy – oder was immer dein Team regelmässig manuell erledigt.',
  },
  {
    title: 'Eigene Abfragen und Reports',
    detail: 'Werte Projekt- und Site-Daten nach eigenen Kriterien aus: Plugin-Versionen über alle Kunden, Update-Rückstände, Performance-Trends oder SLA-relevante Metriken. Reports lassen sich exportieren oder in bestehende Dashboards einbinden.',
  },
  {
    title: 'Dedizierter Support',
    detail: 'Im Custom-Plan gibt es einen festen Ansprechpartner. Onboarding, Konfiguration und laufende Anpassungen werden gemeinsam begleitet. Reaktionszeiten und Umfang werden vertraglich vereinbart.',
  },
]

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="features" />
      <main className="pt-[3.25rem]">

        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <p className="font-mono font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            Custom
          </p>
          <h1 className="font-heading font-extrabold text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] mb-4 max-w-2xl">
            WPorbit nach Mass.<br />Für deine Agentur.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[52ch] mb-5">
            CRM- und ERP-Integrationen, eigene Workflows, Custom Abfragen und dedizierter Support – alles aufgebaut auf dem Cloud-Plan, abgestimmt auf die Prozesse deiner Agentur.
          </p>
          <div className="inline-flex items-center gap-3 bg-surface border border-line rounded-xl px-5 py-3.5 mb-8">
            <span className="font-heading font-extrabold text-[1.5rem] tracking-[-0.02em] text-primary leading-none">Auf Anfrage</span>
            <span className="text-tertiary text-[0.8rem] leading-snug border-l border-line pl-3">Individuelles Angebot<br />nach Anforderung</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Anfrage stellen
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
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.12] tracking-[-0.025em] mb-3 max-w-[28ch] mx-auto">
            Klingt nach deiner Agentur?
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[44ch] mx-auto mb-7">
            Schreib uns, was du dir vorstellst. Wir schauen gemeinsam, was sich sinnvoll umsetzen lässt – ohne Overhead.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Anfrage stellen
            </Link>
            <Link to="/cloud" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
              Cloud-Plan ansehen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
