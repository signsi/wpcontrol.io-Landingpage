export default function Hero() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 pt-28 pb-20 items-center">

      {/* Full-viewport background — breaks out of the 1280px #root container */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0"
        style={{ left: 'calc(50% - 50vw)', width: '100vw' }}
      >
        <div
          className="animate-nebula absolute -top-32 -left-24 w-[680px] h-[680px] rounded-full"
          style={{ background: 'radial-gradient(circle, #7B5CFA 0%, #2FD9EE 40%, transparent 70%)', filter: 'blur(100px)', opacity: 0.2 }}
        />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[
            [4,  14, 1.4], [10, 68, 0.9], [18, 32, 1.1], [25, 84, 0.7],
            [33, 18, 1.3], [40, 56, 0.8], [48, 8,  1.0], [55, 74, 1.2],
            [62, 42, 0.9], [70, 28, 1.4], [78, 90, 0.8], [85, 48, 1.1],
            [91, 88, 0.6], [96, 62, 1.3], [13, 22, 0.7], [28, 6,  1.2],
            [44, 52, 1.0], [58, 16, 0.9], [72, 76, 1.1], [88, 36, 0.8],
            [2,  38, 0.8], [97, 15, 1.0], [50, 92, 0.7], [36, 44, 1.2],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r as number} fill="#F4F5F9" opacity={0.25 + (i % 3) * 0.06} />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-6">
        <p className="hero-kicker font-mono font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent">
          Für WordPress-Agenturen
        </p>
        <h1 className="hero-heading font-heading font-extrabold text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.035em] text-primary">
          Vom Setup bis zur Wartung. Ein Cockpit.
        </h1>
        <p className="hero-body text-secondary leading-[1.78] text-[1rem] max-w-[52ch]">
          WPorbit verbindet lokale Entwicklung, Staging, Deployment, Monitoring und Wartungsplanung in einem Workspace. Hoster-unabhängig, gebaut für Teams mit laufenden WordPress-Projekten.
        </p>
        <div className="hero-ctas flex gap-3 flex-wrap">
          <a href="#waitlist" className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966]">
            Early Access sichern
          </a>
          <a href="#vergleich" className="border border-line text-secondary text-sm px-5 py-3 rounded-lg hover:text-primary hover:border-secondary/60 transition-colors">
            Direktvergleich ansehen
          </a>
        </div>
      </div>

      <aside className="hero-image relative hidden lg:flex items-center justify-center">
        <div className="bg-surface border border-line rounded-2xl overflow-hidden w-full shadow-2xl">
          <img
            src="https://developer.wordpress.com/wp-content/uploads/2025/08/studio-hero-image-v1.png"
            alt="App-Screen einer WordPress-Desktop-Oberfläche"
            className="w-full h-auto"
          />
        </div>
      </aside>
    </section>
  )
}
