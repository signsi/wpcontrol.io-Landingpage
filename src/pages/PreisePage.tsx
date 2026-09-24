import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Pricing from '../components/Pricing'
import Comparison from '../components/Comparison'
import FAQ from '../components/FAQ'
import CTABand from '../components/CTABand'
import { pricingFaq } from '../data/plans'
import { breadcrumbLd, faqPageLd, softwareApplicationLd } from '../lib/jsonld'

const crumbs = [{ label: 'Preise', path: '/preise' }]

export default function PreisePage() {
  return (
    <>
      <Seo
        title="Preise"
        description="WPorbit Preise im Überblick: Demo kostenlos, Standalone ab 290 CHF pro Person und Monat, Cloud ab 1200 CHF pro Monat. Monatlich kündbar, ohne Hoster-Bindung."
        path="/preise"
        jsonLd={[breadcrumbLd(crumbs), softwareApplicationLd(), faqPageLd(pricingFaq)]}
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

      <CTABand
        title="Erst testen, dann entscheiden."
        text="Zehn Tage, ein Projekt, voller Funktionsumfang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
      />
    </>
  )
}
