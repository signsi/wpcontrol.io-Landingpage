const workflows = [
  { label: 'Projekt starten', meta: 'Alles automatisch eingerichtet', status: 'Bereit' },
  { label: 'Bestehende Website übernehmen', meta: 'Verbindung sicher hergestellt', status: 'Verbunden' },
  { label: 'Änderungen veröffentlichen', meta: 'Alle Prüfungen abgeschlossen', status: 'Sicher' },
]

export default function BigPlus() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft px-6 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 font-heading text-[clamp(18rem,38vw,34rem)] font-medium leading-none tracking-[-0.12em] text-accent-tint"
      >
        +
      </div>

      <div className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal-up">
          <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent-strong">
            Das grosse Plus
          </p>
          <h2 className="max-w-[13ch] font-heading text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-primary">
            Keine Insellösungen. Eine klare Oberfläche.
          </h2>
          <p className="mt-6 max-w-[36rem] text-[1rem] leading-[1.75] text-secondary sm:text-[1.08rem]">
            Schluss mit verstreuten Skripten und schwer verständlichen Befehlen. WPorbit führt wiederkehrende Aufgaben in einer massgeschneiderten Oberfläche zusammen, die das ganze Team versteht.
          </p>

          <p className="mt-6 max-w-[36rem] text-[0.9rem] leading-[1.65] text-secondary">
            <strong className="font-semibold text-primary">Aus dem Agenturalltag entwickelt:</strong>{' '}
            WPorbit erkennt typische Stolpersteine und erklärt direkt, was zu tun ist.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.82rem] font-semibold text-secondary">
            {['Geführte Abläufe', 'Klare Projektzustände', 'Hilfe im richtigen Moment'].map((benefit) => (
              <span key={benefit} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal-up relative">
          <div className="rounded-panel border border-line bg-surface p-3 shadow-card sm:p-5">
            <div className="flex items-center justify-between border-b border-border-soft px-2 pb-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-tertiary">Projektübersicht</p>
                <p className="mt-1 text-sm font-semibold text-primary">agentur-website.ch</p>
              </div>
              <span className="rounded-full bg-accent-tint px-3 py-1 text-[0.7rem] font-semibold text-accent-strong">
                Lokal aktiv
              </span>
            </div>

            <div className="divide-y divide-border-soft">
              {workflows.map((workflow, index) => (
                <div key={workflow.label} className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-2 py-4">
                  <span className="flex size-8 items-center justify-center rounded-full border border-line bg-raised text-[0.7rem] font-semibold tabular-nums text-tertiary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.88rem] font-semibold text-primary">{workflow.label}</span>
                    <span className="mt-0.5 block truncate text-[0.74rem] text-tertiary">{workflow.meta}</span>
                  </span>
                  <span className="hidden text-[0.72rem] font-semibold text-accent-strong sm:block">{workflow.status}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 flex items-start gap-3 rounded-control bg-accent-tint px-4 py-3.5 text-left">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[0.72rem] font-bold text-on-accent">
                ?
              </span>
              <span>
                <span className="block text-[0.78rem] font-semibold text-primary">WPorbit prüft vor der Veröffentlichung</span>
                <span className="mt-0.5 block text-[0.72rem] leading-[1.55] text-secondary">
                  Verbindung, Ziel und Voraussetzungen werden automatisch geprüft. Bei Problemen zeigt WPorbit verständlich den nächsten Schritt.
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border-soft pt-4">
              <button type="button" className="rounded-control border border-line bg-raised px-4 py-2.5 text-sm font-semibold text-primary">
                Projekt öffnen
              </button>
              <button type="button" className="gradient-solar rounded-control px-4 py-2.5 text-sm font-semibold text-on-accent shadow-action">
                Veröffentlichen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
