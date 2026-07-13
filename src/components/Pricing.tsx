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
    <section className="px-6 py-16 border-t border-line" id="preise">
      <div className="mb-10">
        <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
          Pricing
        </p>
        <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em]">
          Standalone, Cloud oder Custom – du wählst, wie du startest.
        </h2>
        <p className="text-secondary text-[0.9rem] leading-[1.75] mt-3 max-w-[62ch]">
          Spart Zeit beim Setup, Unterhalt und Wartung. Typische Fehler und Stolperfallen fangen wir direkt ab und leisten Hilfestellung – das spart Zeit, Ärger und am Ende Geld.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col gap-6 p-7 rounded-2xl border ${
              plan.highlighted
                ? 'bg-surface border-accent/40 shadow-[0_0_0_1px_oklch(72%_0.15_65/0.15),0_8px_32px_-8px_oklch(72%_0.15_65/0.12)]'
                : 'bg-surface border-line'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <p className={`font-heading font-bold text-[0.68rem] uppercase tracking-[0.13em] ${
                plan.highlighted ? 'text-accent' : 'text-tertiary'
              }`}>
                {plan.name}
              </p>
              {plan.badge && (
                <span className="text-[0.65rem] font-semibold tracking-wide text-tertiary border border-line rounded-full px-2.5 py-0.5 whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              {plan.highlighted && (
                <span className="text-[0.65rem] font-bold tracking-wide text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-0.5 whitespace-nowrap">
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
                  <span className="text-secondary text-[0.8rem] leading-tight mb-1">
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
            <p className="text-secondary text-[0.83rem] leading-[1.65] -mt-3 border-t border-line pt-4">
              {plan.note}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.83rem] text-secondary">
                  <span className={`mt-0.5 flex-shrink-0 text-[0.7rem] font-bold ${plan.highlighted ? 'text-accent' : 'text-tertiary'}`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Detail link */}
            <Link
              to={plan.href}
              className={`mt-auto text-[0.8rem] font-medium transition-colors ${
                plan.highlighted ? 'text-accent hover:opacity-70' : 'text-tertiary hover:text-secondary'
              }`}
            >
              Details ansehen →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
