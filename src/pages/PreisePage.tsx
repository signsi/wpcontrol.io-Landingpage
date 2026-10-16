import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Pricing from '../components/Pricing'
import Comparison from '../components/Comparison'
import FAQ from '../components/FAQ'
import CTABand from '../components/CTABand'
import { pricingFaq } from '../data/plans'
import { breadcrumbLd, softwareApplicationLd } from '../lib/jsonld'

const crumbs = [{ label: 'Preise', path: '/preise' }]

export default function PreisePage() {
  return (
    <>
      <Seo
        title="Preise für Standalone und Cloud"
        description="WPorbit Preise: Demo kostenlos, Standalone ab 290 CHF pro Person und Monat, Cloud ab 1200 CHF pro Monat. Monatlich kündbar, ohne Hoster-Bindung."
        path="/preise"
        jsonLd={[breadcrumbLd(crumbs), softwareApplicationLd()]}
      />

      <PageHero
        kicker="Preise"
        title="Standalone für Einzelne. Cloud für Teams."
        lead="Alle Pläne im Überblick. Monatlich kündbar, ohne Bindung an ein bestimmtes Hosting und ohne versteckte Einrichtungskosten."
        crumbs={crumbs}
        bordered={false}
      />

      <Pricing variant="page" />

      <Comparison
        kicker="Im Vergleich"
        heading="Was WPorbit anders macht"
      />

      <FAQ
        items={pricingFaq}
        heading="Fragen zu Preisen und Abrechnung"
        intro="Alles Weitere klären wir gerne direkt im Gespräch."
      />

      <p className="px-6 pb-12 text-center text-[0.82rem] text-tertiary">
        Wo deine Daten liegen und wer sie lesen kann:{' '}
        <Link to="/sicherheit" className="underline hover:text-accent">Sicherheit &amp; Datenschutz</Link>
      </p>

      <CTABand
        title="Erst testen, dann entscheiden."
        text="Zehn Tage, voller Funktionsumfang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
      />
    </>
  )
}
