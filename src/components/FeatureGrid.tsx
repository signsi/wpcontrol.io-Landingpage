import { Link } from 'react-router-dom'
import { featureCards } from '../data/landing'
import PlanetDot from './PlanetDot'

export default function FeatureGrid() {
  return (
    <section className="px-6 py-24" id="produkt">
      <div className="reveal-up mb-12">
        <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-3">
          Du entwickelst. WPorbit erledigt den Rest.
        </h2>
        <p className="text-secondary leading-[1.75] text-[0.9375rem] max-w-[52ch]">
          Vom lokalen Setup bis zur automatisierten Wartung: alle Prozesse, die WordPress-Agenturen täglich brauchen.
        </p>
      </div>

      <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {featureCards.map((card) => (
          <article key={card.title} className="bg-surface p-6 flex flex-col gap-4 hover:bg-raised transition-colors group">
            <PlanetDot color={card.dot} size={16} ring ringPadding={9} />
            <p className="font-heading font-semibold text-[0.9375rem] tracking-[-0.01em] text-primary leading-snug">{card.title}</p>
            <p className="text-secondary text-[0.875rem] leading-[1.65]">{card.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/features" className="text-[0.875rem] font-medium text-secondary hover:text-accent transition-colors">
          Features im Detail ansehen →
        </Link>
      </div>
    </section>
  )
}
