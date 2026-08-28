import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { allFeatures, tickerItems } from '../data/features'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [
  { label: 'Produkt', path: '/produkt' },
  { label: 'Funktionen', path: '/produkt/funktionen' },
]

export default function FeaturesPage() {
  return (
    <>
      <Seo
        title="Alle Funktionen"
        description="Von der lokalen Entwicklung bis zur automatisierten Wartung: alle Funktionen von WPorbit im Detail."
        path="/produkt/funktionen"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Funktionen"
        title="Alle Funktionen. Im Detail."
        lead="Von der lokalen Entwicklung bis zur automatisierten Wartung: alles, was WordPress-Agenturen täglich brauchen, in einer Plattform."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/demo" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/produkt" className="btn btn-secondary btn-md">Zum Überblick</Link>
          </>
        }
      />

      {/* Ticker */}
      <div className="overflow-hidden border-b border-line bg-surface" aria-hidden="true">
        <div className="flex w-max animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="border-r border-line px-5 py-2.5 text-[0.72rem] font-medium tracking-[0.02em] text-tertiary whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Feature-Sektionen, abwechselnd ausgerichtet */}
      {allFeatures.map((feature, i) => (
        <section key={feature.title} className="reveal-up border-b border-line px-6 py-16 last:border-b-0">
          <div
            className={`grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20 ${
              i % 2 === 1 ? 'lg:[direction:rtl]' : ''
            }`}
          >
            <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
              <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-tertiary">
                Funktion {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mb-4 font-heading text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                {feature.title}
              </h2>
              <p className="max-w-[46ch] text-[0.95rem] leading-[1.78] text-secondary">
                {feature.detail}
              </p>
            </div>

            <div
              className={`flex min-h-72 flex-col overflow-hidden rounded-xl border border-line ${
                i % 2 === 1 ? 'lg:[direction:ltr]' : ''
              }`}
            >
              {feature.visual}
            </div>
          </div>
        </section>
      ))}

      <CTABand
        title="Bereit, den WordPress-Alltag zu vereinfachen?"
        text="Teste WPorbit zehn Tage lang mit einem Projekt und vollem Funktionsumfang. Keine Kreditkarte nötig."
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
