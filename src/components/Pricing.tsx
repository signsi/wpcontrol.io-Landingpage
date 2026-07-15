import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Standalone',
    priceMain: 'ab 40',
    priceSub: 'CHF / Person / Monat',
    note: 'Für Agenturen, die lokal starten wollen.',
    badge: 'Max. 3 Projekte',
    features: ['Lokale Entwicklungsumgebung', 'Vault für Zugangsdaten', 'Deploy und Pull Prozesse'],
    highlighted: false,
    href: '/standalone',
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
  },
  {
    name: 'Custom',
    priceMain: 'Auf Anfrage',
    priceSub: '',
    note: 'Agenturspezifische Erweiterungen und Integrationen nach Mass.',
    badge: null,
    features: ['Alles aus Cloud', 'CRM- und ERP-Integrationen', 'Custom Workflows und Prozesse', 'Eigene Abfragen und Automatisierungen', 'Dedizierter Support'],
    highlighted: false,
    href: '/custom',
  },
]

export default function Pricing() {
  return (
    <section className="px-6 py-28" id="preise">
      <div className="reveal-up mb-12">
        <p className="font-mono font-bold text-[0.75rem] uppercase tracking-[0.13em] text-accent mb-3">
          Pricing
        </p>
        <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em]">
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
            className={`relative flex flex-col gap-6 p-7 rounded-2xl border overflow-hidden ${
              plan.highlighted
                ? 'bg-surface border-line shadow-[0_16px_48px_-12px_color-mix(in_srgb,#FF6A39_18%,transparent)]'
                : 'bg-surface border-line'
            }`}
          >
            {/* Gradient top accent — clipped by overflow-hidden + rounded-2xl */}
            {plan.highlighted && (
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] gradient-solar" />
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <p className={`font-mono font-bold text-[0.75rem] uppercase tracking-[0.13em] ${
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
                  <span className="font-heading font-extrabold text-[2.6rem] tracking-[-0.03em] text-primary leading-none">
                    {plan.priceMain}
                  </span>
                  <span className="text-secondary text-[0.875rem] leading-tight mb-1">
                    {plan.priceSub}
                  </span>
                </>
              ) : (
                <span className="font-heading font-extrabold text-[2rem] tracking-[-0.02em] text-primary leading-none">
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
            {plan.highlighted ? (
              <Link
                to={plan.href}
                className="mt-auto gradient-solar text-on-accent font-bold text-[0.875rem] px-4 py-2.5 rounded-lg text-center hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]"
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
    </section>
  )
}
