import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PlanMatrix from '../components/PlanMatrix'
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
      {/* TODO Patrick: Preise inkl. oder exkl. MwSt.? Hinweis hier und in den Preiskarten ergänzen. */}

      <PlanMatrix />

      <section className="border-t border-line px-6 py-16">
        <div className="reveal-up grid gap-8 rounded-panel border border-line bg-surface p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:p-9">
          <div>
            <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-accent">Gerechnet</p>
            <h2 className="font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              Was kostet es, nichts zu ändern?
            </h2>
          </div>
          <div className="text-[0.9375rem] leading-[1.75] text-secondary">
            <p>
              Für eine kleine Agentur mit 15 Projekten, 3 Personen und einem Ansatz von 140 CHF pro Stunde
              haben wir den Aufwand zwischen den Projekten gerechnet: Umgebungen aufsetzen, Zugänge suchen,
              Kontextwechsel, Nacharbeit. Das sind rund <strong className="text-primary">263 Stunden oder 36 820 CHF im Jahr</strong>.
            </p>
            <p className="mt-3">
              Beseitigt ein Werkzeug die Hälfte davon, stehen rund 18 000 CHF gegen gut 10 000 CHF für drei
              Personen im Standalone-Plan. Die Rechnung geht auf, aber nicht so deutlich, dass man sie nicht
              prüfen müsste.
            </p>
            <Link to="/blog/tool-chaos-kostenrechnung" className="mt-4 inline-block font-semibold text-accent-strong underline underline-offset-[3px]">
              Die ganze Rechnung lesen
            </Link>
          </div>
        </div>
      </section>

      <Comparison
        kicker="Im Vergleich"
        heading="Was WPorbit anders macht"
      />

      <FAQ
        items={pricingFaq}
        heading="Fragen zu Preisen, Test und Kauf"
        intro="Alles Weitere klären wir gerne direkt im Gespräch."
      />

      <CTABand
        title="Erst testen, dann entscheiden."
        text="Zehn Tage, voller Funktionsumfang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
      />
    </>
  )
}
