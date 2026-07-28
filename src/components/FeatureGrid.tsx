import { Link } from 'react-router-dom'
import { featureCards } from '../data/landing'
import PlanetDot from './PlanetDot'

export default function FeatureGrid() {
  return (
    <section className="px-6 py-24" id="produkt">
      <div className="reveal-up mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-tint px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent-strong">
          <span className="size-1.5 rounded-full bg-accent" />
          Jetzt in Standalone
        </div>
        <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-3">
          Alles für deinen lokalen WordPress-Workflow.
        </h2>
        <p className="text-secondary leading-[1.75] text-[0.9375rem] max-w-[52ch]">
          Vom ersten lokalen Start bis zum kontrollierten Deploy: diese Funktionen stehen in WPorbit Standalone zur Verfügung.
        </p>
      </div>

      <div className="stagger-group grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {featureCards.map((card) => (
          <article key={card.title} className="group flex flex-col gap-4 bg-surface p-6 transition-colors hover:bg-raised">
            <PlanetDot color={card.dot} size={16} ring ringPadding={9} />
            <p className="font-heading font-semibold text-[0.9375rem] tracking-[-0.01em] text-primary leading-snug">{card.title}</p>
            <p className="text-secondary text-[0.875rem] leading-[1.65]">{card.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/standalone" className="text-[0.875rem] font-medium text-secondary hover:text-accent transition-colors">
          Standalone im Detail ansehen →
        </Link>
      </div>
    </section>
  )
}
