import { Link } from 'react-router-dom'
import { OrbitArc } from './OrbitMotif'

export default function CloudTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-dark px-6 py-20 text-on-dark">
      <OrbitArc className="pointer-events-none absolute -right-24 -top-28 size-[28rem] text-on-dark/10" />

      <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div className="reveal-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-on-dark/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-on-dark/70">
            <span className="size-1.5 rounded-full bg-accent" />
            In Entwicklung
          </div>
          <h2 className="max-w-[18ch] font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-on-dark">
            Standalone ist das Werkzeug. Cloud wird der gemeinsame Arbeitsbereich.
          </h2>
        </div>

        <div className="reveal-up lg:pb-1">
          <p className="mb-6 max-w-[38ch] text-[0.95rem] leading-[1.75] text-on-dark/70">
            Cloud hält Projekte, Arbeitsstände und Standards im Team auf demselben Stand. Wissen bleibt verfügbar, auch wenn Aufgaben oder Verantwortlichkeiten wechseln.
          </p>
          <Link
            to="/cloud"
            className="btn btn-on-dark btn-md"
          >
            Mehr über WPorbit Cloud →
          </Link>
        </div>
      </div>
    </section>
  )
}
