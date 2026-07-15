import { Link } from 'react-router-dom'
import Topbar  from '../components/Topbar'
import Footer  from '../components/Footer'
import { allFeatures, tickerItems } from '../data/features'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="features" />

      <main className="pt-[3.25rem]">
        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <p className="font-mono font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            WPorbit Features
          </p>
          <h1 className="font-heading font-extrabold text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] mb-5 max-w-2xl">
            Alle Funktionen. Im Detail.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[48ch] mb-7">
            Von der lokalen Entwicklung bis zur automatisierten Wartung: alles, was WordPress-Agenturen täglich brauchen, in einer Plattform.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Early Access sichern
            </Link>
            <Link to="/" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
              Zurück zur Übersicht
            </Link>
          </div>
        </section>

        {/* Ticker */}
        <div className="overflow-hidden border-b border-line bg-surface" aria-hidden="true">
          <div className="flex w-max animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="px-5 py-2.5 text-[0.72rem] font-medium text-tertiary whitespace-nowrap border-r border-line tracking-[0.02em]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Feature sections — alternating layout */}
        {allFeatures.map((feature, i) => (
          <section key={feature.title} className="px-6 py-16 border-b border-line last:border-b-0">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${
              i % 2 === 1 ? 'lg:[direction:rtl]' : ''
            }`}>
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <p className="font-mono font-bold text-[0.62rem] uppercase tracking-[0.13em] text-tertiary mb-3">
                  Feature {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-heading font-bold text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.15] tracking-[-0.025em] mb-4">
                  {feature.title}
                </h2>
                <p className="text-secondary text-[0.95rem] leading-[1.78] max-w-[46ch]">
                  {feature.detail}
                </p>
              </div>

              <div className={`border border-line rounded-xl overflow-hidden flex flex-col min-h-72 ${
                i % 2 === 1 ? 'lg:[direction:ltr]' : ''
              }`}>
                {feature.visual}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="px-6 py-20 bg-surface border-t border-line text-center">
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.12] tracking-[-0.025em] mb-4 max-w-[24ch] mx-auto">
            Bereit, den WordPress-Alltag zu vereinfachen?
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[44ch] mx-auto mb-7">
            Sichere dir Early Access, erhalte sofort die ROI- und Migrations-Checkliste und gestalte die nächsten Prioritäten aktiv mit.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
              Early Access sichern
            </Link>
            <Link to="/" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
              Zur Startseite
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
