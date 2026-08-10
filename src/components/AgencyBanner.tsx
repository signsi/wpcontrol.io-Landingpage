const benefits = [
  {
    label: 'Geführte Abläufe',
    description: 'Schritt für Schritt durch komplexe Aufgaben – ohne Ratespiel.',
  },
  {
    label: 'Klare Projektzustände',
    description: 'Auf einen Blick sehen, was aktiv, lokal oder bereit ist.',
  },
  {
    label: 'Hilfe im richtigen Moment',
    description: 'Kontextbezogene Hinweise genau dann, wenn etwas unklar ist.',
  },
]

export default function AgencyBanner() {
  return (
    <section className="bg-dark px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="reveal-up mb-12 max-w-[52ch]">
          <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent">
            Aus dem Agenturalltag entwickelt
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,3.2vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-on-dark">
            WPorbit erkennt typische Stolpersteine und erklärt direkt, was zu tun ist.
          </h2>
        </div>

        <div className="stagger-group grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.label} className="flex flex-col gap-3 bg-dark p-7 transition-colors hover:bg-white/[0.04]">
              <span className="size-2 rounded-full bg-accent" />
              <p className="font-heading text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em] text-on-dark">
                {b.label}
              </p>
              <p className="text-[0.84rem] leading-[1.65] text-on-dark/50">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
