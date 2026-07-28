import heroVisual from '../assets/hero.png'

function OrbitMark() {
  return (
    <svg viewBox="0 0 361.01 390.66" fill="none" className="h-[4.875rem] w-[4.5rem] overflow-visible text-primary" aria-hidden="true">
      <circle cx="180.88" cy="129.7" r="36" fill="currentColor" />
      <path d="M72.03,221.85c65.68,29.51,167.13,8,226.61-48.04,59.48-56.04,54.45-125.39-11.23-154.89-12.22-5.49-26.08-9.34-41.09-11.42" stroke="currentColor" strokeWidth="15" strokeLinecap="round" />
      <circle cx="0" cy="0" r="16" className="animate-logo-orbit fill-accent [filter:drop-shadow(0_0_3px_oklch(52%_0.185_288/60%))]" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft px-6 pb-20 pt-24 text-center sm:pb-24 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] w-screen">
        <div className="animate-halo bg-orbit-halo absolute -top-52 left-1/2 size-[26rem] -translate-x-1/2 rounded-full blur-[30px]" />
      </div>

      <div className="relative mx-auto flex max-w-[48rem] flex-col items-center">
        <div className="hero-mark mb-5 flex h-[8rem] items-center justify-center">
          <OrbitMark />
        </div>
        <p className="hero-kicker mb-5 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent-strong before:size-1.5 before:rounded-full before:bg-accent">
          Standalone für WordPress-Agenturen
        </p>
        <h1 className="hero-heading font-heading text-[clamp(3.4rem,8vw,6rem)] leading-[1.01] tracking-[-0.04em]">
          <span className="block font-medium text-tertiary">Weniger Chaos.</span>
          <span className="block font-bold text-primary">Mehr Projekte.</span>
        </h1>
        <p className="hero-body mt-7 max-w-[38rem] text-[1.08rem] leading-[1.65] text-secondary sm:text-[1.2rem]">
          Lokale WordPress-Projekte, Zugänge, Imports und Deployments in einer App. Ohne Infrastruktur-Overhead und ohne Bindung an einen Hoster.
        </p>
        <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#demo" className="gradient-solar rounded-full px-6 py-3.5 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_30px_-8px_oklch(52%_0.185_288/55%)]">
            10 Tage gratis testen
          </a>
          <a href="#vergleich" className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-primary transition duration-200 ease-out-expo hover:border-tertiary hover:bg-raised">Standalone vergleichen</a>
        </div>
        <p className="mt-5 text-[0.78rem] font-medium text-tertiary">Keine Kreditkarte. Voller Funktionsumfang. Ein Projekt.</p>

        <div className="hero-image relative mt-16 w-full max-w-[46rem] overflow-hidden rounded-panel border border-line bg-surface p-6 shadow-card sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <img
            src={heroVisual}
            alt="WPorbit verbindet den Import bestehender Sites mit lokaler Entwicklung und kontrolliertem Deployment"
            className="mx-auto h-auto w-full max-w-[22rem]"
          />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-tertiary">
            <span>Import</span><span className="size-1 rounded-full bg-accent" /><span>Local</span><span className="size-1 rounded-full bg-accent" /><span>Deploy</span>
          </div>
        </div>
      </div>
    </section>
  )
}
