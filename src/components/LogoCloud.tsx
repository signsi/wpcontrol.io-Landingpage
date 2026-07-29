import { hosters } from '../data/landing'

export default function LogoCloud() {
  return (
    <section className="px-6 py-14 bg-surface" aria-label="Hosting-Kompatibilität">
      <p className="text-center text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-tertiary mb-6">
        Funktioniert mit deinem bestehenden Hosting
      </p>
      <div className="stagger-x grid grid-cols-4 lg:grid-cols-7 gap-px bg-line border border-line rounded-xl overflow-hidden max-w-3xl mx-auto">
        {hosters.map((h) => (
          <a
            key={h.name}
            href={h.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface flex items-center justify-center px-5 py-5 hover:bg-raised transition-colors group"
            aria-label={h.name}
          >
            <img
              src={`/logos/${h.file}`}
              alt={h.name}
              className="h-5 max-w-[6rem] brightness-0 opacity-40 group-hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
