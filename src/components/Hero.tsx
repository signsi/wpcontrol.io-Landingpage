import { OrbitArc } from './OrbitMotif'

const steps = [
  {
    title: 'Übernehmen',
    proof: 'Vorhandene Zugangsdaten genügen',
    icon: 'M12 4v9m0 0l3.5-3.5M12 13l-3.5-3.5M5 17h14',
  },
  {
    title: 'Bearbeiten',
    proof: 'Zugänge verschlüsselt pro Projekt',
    icon: 'M15.5 5.5l3 3L8 19l-4 1 1-4L15.5 5.5z',
  },
  {
    title: 'Veröffentlichen',
    proof: 'Automatisiertes, stressfreies Rollout',
    icon: 'M12 20v-9m0 0l3.5 3.5M12 11l-3.5 3.5M5 7h14',
  },
]

const stepDelays = [0, -4.5, -8.9]

function OrbitFlow() {
  return (
    <div className="hero-image relative mt-16 w-full max-w-[46rem] overflow-hidden rounded-panel border border-line bg-surface p-6 shadow-card sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-28 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-accent-tint/80 blur-[70px]" />
      <OrbitArc className="pointer-events-none absolute -bottom-24 -right-20 size-[22rem] text-accent/10" rotate={-14} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

      <svg viewBox="0 0 600 120" className="relative h-24 w-full overflow-visible sm:h-28" aria-hidden="true">
        <defs>
          <linearGradient id="flow-path-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(52% 0.185 288 / 35%)" />
            <stop offset="50%" stopColor="oklch(52% 0.185 288 / 85%)" />
            <stop offset="100%" stopColor="oklch(52% 0.185 288 / 35%)" />
          </linearGradient>
        </defs>
        <path d="M100,100 Q300,10 500,100" fill="none" stroke="url(#flow-path-gradient)" strokeWidth="2" strokeLinecap="round" />
        {[[100, 100], [300, 55], [500, 100]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" strokeWidth="2.5" className="fill-surface stroke-accent [filter:drop-shadow(0_1px_4px_oklch(52%_0.185_288/25%))]" />
        ))}
        <circle r="6" className="animate-flow-dot fill-accent [filter:drop-shadow(0_0_6px_oklch(52%_0.185_288/70%))]" />
      </svg>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center">
            <span
              className="animate-flow-step mb-2.5 flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accent-tint text-accent-strong"
              style={{ animationDelay: `${stepDelays[i]}s` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <path d={step.icon} />
              </svg>
            </span>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-primary">{step.title}</p>
            <span className="mt-1.5 rounded-full bg-accent-tint px-2.5 py-1 text-center text-[0.64rem] font-semibold leading-tight text-accent-strong">
              {step.proof}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

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
          <a href="#demo" className="gradient-solar rounded-full px-6 py-3.5 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_30px_-8px_oklch(52%_0.185_288/55%)]">
            10 Tage gratis testen
          </a>
          <a href="#vergleich" className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-primary transition duration-200 ease-out-expo hover:border-tertiary hover:bg-raised">Standalone vergleichen</a>
        </div>
        <p className="mt-5 text-[0.78rem] font-medium text-tertiary">Keine Kreditkarte. Voller Funktionsumfang. Ein Projekt.</p>

        <OrbitFlow />
      </div>
    </section>
  )
}
