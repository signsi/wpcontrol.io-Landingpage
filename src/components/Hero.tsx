import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft px-6 pb-20 pt-16 text-center sm:pb-24 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] w-screen">
        <div className="animate-halo bg-orbit-halo absolute -top-52 left-1/2 size-[26rem] -translate-x-1/2 rounded-full blur-[30px]" />
      </div>

      <div className="relative mx-auto flex max-w-[48rem] flex-col items-center">
        <Link
          to="/cloud"
          onClick={() => track('cta_click', { location: 'home_hero_cloud', target: '/cloud' })}
          className="hero-kicker group mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-left text-[0.84rem] text-secondary shadow-card transition-colors duration-200 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[0.72rem] font-semibold text-on-accent">Neu</span>
          <span className="truncate">
            <strong className="font-semibold text-primary">WPorbit Cloud:</strong> alle Kundenseiten im Blick, ohne Plugin
          </span>
          <span className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </Link>
        <h1 className="hero-heading text-balance font-heading text-[clamp(2.7rem,6.4vw,4.75rem)] leading-[1.03] tracking-[-0.04em]">
          <span className="block font-medium text-tertiary">WordPress-Agenturen:</span>
          <span className="block font-bold text-primary">weniger Chaos, mehr Projekte.</span>
        </h1>
        <p className="hero-body mt-7 max-w-[38rem] text-[1.08rem] leading-[1.65] text-secondary sm:text-[1.2rem]">
          Lokal entwickeln, sicher veröffentlichen, Zugänge im Team teilen und jede Kundenseite im Blick behalten. In einer Mac-App, unabhängig vom Hosting, entwickelt in der Schweiz.
        </p>
        <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#demo" onClick={() => track('cta_click', { location: 'home_hero', target: '#demo' })} className="btn btn-primary btn-lg">
            10 Tage gratis testen
          </a>
          <Link to="/produkt" onClick={() => track('cta_click', { location: 'home_hero', target: '/produkt' })} className="btn btn-secondary btn-lg">So funktioniert’s</Link>
        </div>
        <p className="mt-5 text-[0.78rem] font-medium text-tertiary">Keine Kreditkarte · Voller Funktionsumfang · für macOS</p>
      </div>

      {/* Die App selbst: echter Screenshot, damit klar ist, was man bekommt. */}
      <figure className="hero-image relative mx-auto mt-14 max-w-[64rem]">
        <img
          src="/home/app.webp"
          alt="WPorbit-App: links die Projekte, rechts die Übersicht eines laufenden Projekts mit Verbindungen, Projektdetails, Zugangsdaten und Wartung"
          width={2560}
          height={1560}
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full rounded-[14px] shadow-overlay ring-1 ring-line"
        />
      </figure>
    </section>
  )
}
