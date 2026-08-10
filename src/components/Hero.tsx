export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft px-6 pb-20 pt-16 text-center sm:pb-24 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] w-screen">
        <div className="animate-halo bg-orbit-halo absolute -top-52 left-1/2 size-[26rem] -translate-x-1/2 rounded-full blur-[30px]" />
      </div>

      <div className="relative mx-auto flex max-w-[48rem] flex-col items-center">
        <p className="hero-kicker mb-5 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent-strong before:size-1.5 before:rounded-full before:bg-accent">
          Für professionelle WordPress-Entwicklung
        </p>
        <h1 className="hero-heading font-heading text-[clamp(3.4rem,8vw,6rem)] leading-[1.01] tracking-[-0.04em]">
          <span className="block font-medium text-tertiary">Weniger Chaos.</span>
          <span className="block font-bold text-primary">Mehr Projekte.</span>
        </h1>
        <p className="hero-body mt-7 max-w-[38rem] text-[1.08rem] leading-[1.65] text-secondary sm:text-[1.2rem]">
          Alle WordPress-Projekte, Zugänge und Veröffentlichungen in einer klaren Anwendung. So arbeitet dein Team schneller und sicherer, ganz unabhängig vom Hosting.
        </p>
        <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#demo" className="btn btn-primary btn-lg">
            10 Tage gratis testen
          </a>
          <a href="#vergleich" className="btn btn-secondary btn-lg">Standalone vergleichen</a>
        </div>
        <p className="mt-5 text-[0.78rem] font-medium text-tertiary">Keine Kreditkarte. Voller Funktionsumfang. Ein Projekt.</p>
      </div>
    </section>
  )
}
