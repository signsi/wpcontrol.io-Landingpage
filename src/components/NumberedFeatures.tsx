interface Feature {
  title: string
  detail: string
}

/**
 * Nummerierte Feature-Sektionen. Stand vorher identisch in StandalonePage,
 * CloudPage und CustomPage.
 */
export default function NumberedFeatures({ features }: { features: Feature[] }) {
  return (
    <>
      {features.map((feature, i) => (
        <section key={feature.title} className="reveal-up border-b border-line px-6 py-14 last:border-b-0">
          <div className="grid max-w-4xl grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-tertiary">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="font-heading text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-primary">
                {feature.title}
              </h2>
            </div>
            <p className="text-[0.95rem] leading-[1.78] text-secondary lg:pt-8">
              {feature.detail}
            </p>
          </div>
        </section>
      ))}
    </>
  )
}
