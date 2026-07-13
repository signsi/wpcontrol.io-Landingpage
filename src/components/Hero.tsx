export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 pt-28 pb-20 items-center" id="waitlist">
      <div className="flex flex-col gap-6">
        <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent">
          Für WordPress-Agenturen
        </p>
        <h1 className="font-heading font-extrabold text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.035em] text-primary">
          Vom Setup bis zur Wartung. Ein Cockpit.
        </h1>
        <p className="text-secondary leading-[1.78] text-[1rem] max-w-[52ch]">
          WPorbit verbindet lokale Entwicklung, Staging, Deployment, Monitoring und Wartungsplanung in einem Workspace. Hoster-unabhängig, gebaut für Teams mit laufenden WordPress-Projekten.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="#waitlist" className="bg-accent text-on-accent font-bold text-sm px-5 py-3 rounded-[0.3rem] hover:opacity-90 transition-opacity">
            Early Access sichern
          </a>
          <a href="#vergleich" className="border border-line text-secondary text-sm px-5 py-3 rounded-[0.3rem] hover:text-primary hover:border-secondary/60 transition-colors">
            Direktvergleich ansehen
          </a>
        </div>
      </div>

      <aside className="hidden lg:flex items-center justify-center">
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
