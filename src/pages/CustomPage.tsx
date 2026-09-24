import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import NumberedFeatures from '../components/NumberedFeatures'
import CTABand from '../components/CTABand'
import { breadcrumbLd } from '../lib/jsonld'

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

const crumbs = [{ label: 'Massgeschneidert', path: '/massgeschneidert' }]

export default function CustomPage() {
  return (
    <>
      <Seo
        title="Massgeschneidert"
        description="WPorbit nach Mass: CRM- und ERP-Integrationen, eigene Workflows, individuelle Auswertungen und dedizierter Support für deine Agentur."
        path="/massgeschneidert"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Massgeschneidert"
        title={<>WPorbit nach Mass.<br />Für deine Agentur.</>}
        lead="CRM- und ERP-Integrationen, eigene Workflows, eigene Auswertungen und dedizierter Support – alles aufgebaut auf dem Cloud-Plan, abgestimmt auf die Prozesse deiner Agentur."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/kontakt" className="btn btn-primary btn-md">Anfrage stellen</Link>
            <Link to="/preise" className="btn btn-secondary btn-md">Alle Pläne vergleichen</Link>
          </>
        }
      >
        <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-3.5">
          <span className="font-heading text-[1.5rem] font-semibold leading-none tracking-[-0.02em] text-primary">
            Auf Anfrage
          </span>
          <span className="border-l border-line pl-3 text-[0.8rem] leading-snug text-tertiary">
            Individuelles Angebot
            <br />
            nach Anforderung
          </span>
        </div>
      </PageHero>

      <NumberedFeatures features={features} />

      <CTABand
        title="Klingt nach deiner Agentur?"
        text="Schreib uns, was du dir vorstellst. Wir schauen gemeinsam, was sich sinnvoll umsetzen lässt – ohne Overhead."
        primary={{ label: 'Anfrage stellen', to: '/kontakt' }}
        secondary={{ label: 'Cloud-Plan ansehen', to: '/cloud' }}
      />
    </>
  )
}
