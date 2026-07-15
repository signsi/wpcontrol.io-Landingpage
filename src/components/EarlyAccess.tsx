export default function EarlyAccess() {
  return (
    <section
      className="relative px-6 py-24 overflow-hidden"
      id="waitlist"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, #FF6A39 0%, #FF3D77 40%, transparent 70%)', filter: 'blur(100px)', opacity: 0.07 }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="reveal-up">
          <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.1] tracking-[-0.025em] mb-4">
            Mitgestalten statt warten
          </h2>
          <p className="text-secondary text-[0.9375rem] leading-[1.78] max-w-[44ch] mb-6">
            Kein Countdown, keine künstliche Verknappung. Early Adopters liefern Input, priorisieren Features mit und erhalten sofort die ROI- und Migrations-Checkliste.
          </p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {[
              'Sofortzugang zur ROI- und Migrations-Checkliste',
              'Feature-Prioritäten aktiv mitgestalten',
              'Kein Lock-in, jederzeit kündbar',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.875rem] text-secondary">
                <span className="text-accent flex-shrink-0 text-xs font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-up bg-surface border border-line rounded-2xl p-6 shadow-lg">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.75rem] font-semibold text-secondary" htmlFor="email-main">
                Geschäftliche E-Mail
              </label>
              <input
                id="email-main"
                type="email"
                placeholder="team@agentur.ch"
                required
                className="bg-base border border-line text-primary text-sm px-3.5 py-2.5 rounded-lg placeholder:text-tertiary outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.75rem] font-semibold text-secondary" htmlFor="size-main">
                Teamgrösse
              </label>
              <select
                id="size-main"
                defaultValue="10-15"
                className="bg-base border border-line text-primary text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-accent transition-colors"
              >
                <option value="3-5">3–5 Personen</option>
                <option value="6-9">6–9 Personen</option>
                <option value="10-15">10–15 Personen</option>
                <option value="16+">16+ Personen</option>
              </select>
            </div>
            <button
              type="submit"
              className="gradient-solar text-on-accent font-bold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_16px_-4px_#FF6A3966] border-0 mt-1"
            >
              Checkliste + Early Access sichern
            </button>
            <p className="text-[0.75rem] text-tertiary text-center">
              Keine Kreditkarte. Jederzeit kündbar.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
