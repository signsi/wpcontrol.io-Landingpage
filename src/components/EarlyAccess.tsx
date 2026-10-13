import { OrbitDivider } from './OrbitMotif'
import { TRIAL_DAYS } from '../data/plans'
import { SITE } from '../config/site'

/**
 * Einstieg zum Testen. Die Anmeldung selbst liegt auf dem Lizenz-Server
 * (`/testen`): Dort kommen Link, Download und klare Fehlermeldungen her.
 */
export default function EarlyAccess() {
  return (
    <section
      className="relative px-6 py-24 overflow-hidden"
      id="demo"
    >
      {/* Signature curved divider — marks the final transition into the CTA */}
      <OrbitDivider className="absolute inset-x-0 top-0 w-full h-6 text-line pointer-events-none" />

      {/* Subtle background glow */}
      <div aria-hidden="true" className="bg-orbit-halo pointer-events-none absolute -right-24 -top-32 size-[31.25rem] rounded-full blur-[80px]" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="reveal-up">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-4">
            10 Tage gratis. Ohne Risiko.
          </h2>
          <p className="text-secondary text-[0.9375rem] leading-[1.78] max-w-[44ch] mb-6">
            Geschäftliche E-Mail eingeben, WPorbit herunterladen und direkt loslegen. Ein Projekt mit allen verfügbaren Funktionen, ohne Kreditkarte.
          </p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {[
              'Ein Projekt mit allen verfügbaren Funktionen',
              'In wenigen Minuten startklar',
              'Keine Kreditkarte, keine Verpflichtung',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.875rem] text-secondary">
                <span className="text-accent flex-shrink-0 text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-up rounded-panel border border-line bg-surface p-6 shadow-card">
          <ol className="flex flex-col gap-3 list-none p-0 m-0 mb-6">
            {[
              'E-Mail-Adresse eingeben',
              'WPorbit für macOS laden',
              'Link aus der E-Mail auf dem Mac öffnen',
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-[0.875rem] text-primary">
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line font-heading text-[0.75rem] font-semibold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <a href={SITE.trialUrl} className="btn btn-primary btn-md w-full">
            Kostenlos testen →
          </a>
          <p className="mt-4 text-[0.75rem] text-tertiary text-center">
            Keine Kreditkarte. {TRIAL_DAYS} Tage gratis. Voller Funktionsumfang.
          </p>
        </div>
      </div>
    </section>
  )
}
