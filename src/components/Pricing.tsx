import { Link } from 'react-router-dom'
import PlanetDot from './PlanetDot'

const plans = [
  {
    name: 'Demo',
    priceMain: 'Kostenlos',
    priceSub: '',
    note: '10 Tage gratis. Voller Funktionsumfang. Kein Risiko.',
    badge: '10 Tage · 1 Projekt',
    features: ['Voller Funktionsumfang', 'Direkter Download', 'Keine Kreditkarte'],
    highlighted: false,
    href: '#demo',
    isAnchor: true,
  },
  {
    name: 'Standalone',
    priceMain: 'ab 40',
    priceSub: 'CHF / Person / Monat',
    note: 'Für Agenturen, die lokal starten wollen.',
    badge: 'Max. 3 Projekte',
    features: ['Lokale Entwicklungsumgebung', 'Vault für Zugangsdaten', 'Deploy und Pull Prozesse'],
    highlighted: false,
    href: '/standalone',
    isAnchor: false,
  },
  {
    name: 'Cloud',
    priceMain: 'ab 1200',
    priceSub: 'CHF / Monat',
    note: '3 Personen, inkl. Cloud Portal für das gesamte Team.',
    badge: null,
    features: ['Staging und Preview', 'Monitoring und Update-Planung', 'Vault-Synchronisation', 'Projekte und Zugänge zentral verwalten', 'Wartungsplanung im Dashboard'],
    highlighted: true,
    href: '/cloud',
    isAnchor: false,
  },
]

const customPlan = {
  features: ['Alles aus Cloud', 'CRM- und ERP-Integrationen', 'Custom Workflows und Prozesse', 'Eigene Abfragen und Automatisierungen', 'Dedizierter Support'],
  href: '/custom',
}

export default function Pricing() {
  return (
    <section className="px-6 py-28" id="preise">
      <div className="reveal-up mb-12">
        <p className="font-bold text-[0.75rem] uppercase tracking-[0.13em] text-accent mb-3">
          Pricing
        </p>
        <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em]">
          Standalone, Cloud oder Custom – du wählst, wie du startest.
        </h2>
        <p className="text-secondary text-[0.9375rem] leading-[1.75] mt-3 max-w-[62ch]">
          Spart Zeit beim Setup, Unterhalt und Wartung. Typische Fehler und Stolperfallen fangen wir direkt ab und leisten Hilfestellung – das spart Zeit, Ärger und am Ende Geld.
        </p>
      </div>

      <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col gap-6 p-7 rounded-2xl border ${
              plan.highlighted
                ? 'bg-surface border-line shadow-[0_16px_48px_-12px_oklch(52%_0.185_288/18%)]'
                : 'bg-surface border-line'
            }`}
          >
            {/* Planet-dot mark — signals "empfohlen" without a generic top bar */}
            {plan.highlighted && (
              <PlanetDot color="solar" size={18} ring ringPadding={10} className="absolute -top-4 -right-4 bg-base" />
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <p className={`font-bold text-[0.75rem] uppercase tracking-[0.13em] ${
                plan.highlighted ? 'text-accent' : 'text-tertiary'
              }`}>
                {plan.name}
              </p>
              {plan.badge && (
                <span className="text-[0.6875rem] font-semibold tracking-wide text-tertiary border border-line rounded-full px-2.5 py-0.5 whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              {plan.highlighted && (
                <span className="text-[0.6875rem] font-bold tracking-wide text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                  Empfohlen
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 leading-none">
              {plan.priceSub ? (
                <>
                  <span className="font-heading font-semibold text-[2.6rem] tracking-[-0.03em] text-primary leading-none">
                    {plan.priceMain}
                  </span>
                  <span className="text-secondary text-[0.875rem] leading-tight mb-1">
                    {plan.priceSub}
                  </span>
                </>
              ) : (
                <span className="font-heading font-semibold text-[2rem] tracking-[-0.02em] text-primary leading-none">
                  {plan.priceMain}
                </span>
              )}
            </div>

            {/* Note */}
            <p className="text-secondary text-[0.875rem] leading-[1.65] -mt-3 border-t border-line pt-4">
              {plan.note}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-secondary">
                  <span className={`mt-0.5 flex-shrink-0 text-[0.6875rem] font-bold ${plan.highlighted ? 'text-accent' : 'text-tertiary'}`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {plan.isAnchor ? (
              <a
                href={plan.href}
                className="gradient-solar mt-auto rounded-full px-4 py-2.5 text-center text-[0.875rem] font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110"
              >
                Demo herunterladen →
              </a>
            ) : plan.highlighted ? (
              <Link
                to={plan.href}
                className="gradient-solar mt-auto rounded-full px-4 py-2.5 text-center text-[0.875rem] font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110"
              >
                Loslegen →
              </Link>
            ) : (
              <Link
                to={plan.href}
                className="mt-auto text-[0.875rem] font-medium text-tertiary hover:text-secondary transition-colors"
              >
                Details ansehen →
              </Link>
            )}
          </article>
        ))}
      </div>

      {/* Custom — elegante Leiste unterhalb der drei Karten */}
      <div className="reveal-up mt-5 relative overflow-hidden rounded-2xl border border-line">
        {/* Subtle gradient wash */}
        <div aria-hidden="true" className="bg-orbit-wash pointer-events-none absolute inset-0" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 px-8 py-7">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-tertiary mb-2">Custom</p>
            <p className="font-heading font-semibold text-[1.25rem] leading-tight text-primary mb-1">
              Braucht ihr mehr als Standard?
            </p>
            <p className="text-[0.875rem] text-secondary leading-relaxed max-w-[52ch]">
              CRM- & ERP-Integrationen, eigene Automatisierungen und dedizierter Support – massgeschneidert für eure Agentur.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-line" />

          {/* Feature pills */}
          <ul className="hidden lg:flex flex-col gap-2 shrink-0">
            {customPlan.features.slice(1).map((f) => (
              <li key={f} className="flex items-center gap-2 text-[0.8125rem] text-tertiary">
                <span className="text-[0.6rem] text-tertiary/60 font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to={customPlan.href}
            className="shrink-0 text-[0.875rem] font-semibold text-primary border border-line bg-raised px-5 py-2.5 rounded-xl hover:border-secondary/50 hover:bg-surface transition-colors whitespace-nowrap"
          >
            Auf Anfrage →
          </Link>
        </div>
      </div>
    </section>
  )
}
