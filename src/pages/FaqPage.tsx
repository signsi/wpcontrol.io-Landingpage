import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'
import CTABand from '../components/CTABand'
import { faqItems } from '../data/landing'
import { pricingFaq } from '../data/plans'
import { breadcrumbLd, faqPageLd } from '../lib/jsonld'

const crumbs = [{ label: 'FAQ', path: '/faq' }]

/**
 * `FAQPage`-Markup wird bewusst nur hier ausgegeben. Dieselben Fragen auf
 * mehreren Seiten auszuzeichnen, lässt die Seiten in der Suche gegeneinander
 * antreten statt zu helfen.
 */
const allFaq = [...faqItems, ...pricingFaq]

export default function FaqPage() {
  return (
    <>
      <Seo
        title="Häufige Fragen"
        description="Antworten auf die häufigsten Fragen zu WPorbit: Hosting-Unabhängigkeit, Standalone und Cloud, Zugangsdaten, Veröffentlichungen, Preise und Abrechnung."
        path="/faq"
        jsonLd={[breadcrumbLd(crumbs), faqPageLd(allFaq)]}
      />

      <PageHero
        kicker="FAQ"
        title="Häufige Fragen"
        lead="Die Fragen, die vor dem Start am häufigsten kommen. Konkrete Anleitungen zur Anwendung findest du im Hilfe-Center."
        crumbs={crumbs}
        bordered={false}
      />

      <FAQ items={faqItems} heading="Zum Produkt" />
      <FAQ items={pricingFaq} heading="Zu Preisen und Abrechnung" intro="Alles Weitere klären wir gerne direkt im Gespräch." />

      <CTABand
        title="Frage nicht dabei?"
        text="Schreib uns direkt. Wir antworten innerhalb von zwei Arbeitstagen."
        primary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
        secondary={{ label: 'Zu den Anleitungen', to: '/anleitungen' }}
      />
    </>
  )
}
