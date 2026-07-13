import { Link } from 'react-router-dom'
import { featureCards } from '../data/landing'

export default function FeatureGrid() {
  return (
    <section className="px-6 py-16 border-t border-line" id="produkt">
      <div className="mb-10">
        <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
          Capabilities
        </p>
        <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em] mb-3">
          Du entwickelst. WPorbit erledigt den Rest.
        </h2>
        <p className="text-secondary leading-[1.75] text-[0.95rem] max-w-[52ch]">
          Vom lokalen Setup bis zur automatisierten Wartung: alle Prozesse, die WordPress-Agenturen täglich brauchen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {featureCards.map((card) => (
          <article key={card.title} className="bg-surface p-6 flex flex-col gap-3 hover:bg-raised transition-colors">
            <div className="text-accent">{card.icon}</div>
            <p className="font-heading font-bold text-[0.9rem] tracking-[-0.01em] text-primary">{card.title}</p>
            <p className="text-secondary text-[0.85rem] leading-[1.65]">{card.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/features" className="text-[0.82rem] font-medium text-secondary hover:text-accent transition-colors">
          Features im Detail ansehen →
        </Link>
      </div>
    </section>
  )
}
