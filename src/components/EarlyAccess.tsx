export default function EarlyAccess() {
  return (
    <section className="px-6 py-16 border-t border-line bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            Early Access
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.1] tracking-[-0.025em] mb-3">
            Mitgestalten statt warten
          </h2>
          <p className="text-secondary text-[0.93rem] leading-[1.78] max-w-[44ch]">
            Kein Countdown, keine künstliche Verknappung. Early Adopters liefern Input, priorisieren Features mit und erhalten sofort die ROI- und Migrations-Checkliste.
          </p>
        </div>

        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <label className="text-[0.78rem] font-semibold text-secondary" htmlFor="email-secondary">
            Geschäftliche Email
          </label>
          <input
            id="email-secondary"
            type="email"
            placeholder="team@agentur.ch"
            required
            className="bg-base border border-line text-primary text-sm px-3.5 py-2.5 rounded-lg placeholder:text-tertiary outline-none focus:border-accent transition-colors"
          />
          <label className="text-[0.78rem] font-semibold text-secondary" htmlFor="size-secondary">
            Teamgrösse
          </label>
          <select
            id="size-secondary"
            defaultValue="10-15"
            className="bg-base border border-line text-primary text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-accent transition-colors"
          >
            <option value="3-5">3–5 Personen</option>
            <option value="6-9">6–9 Personen</option>
            <option value="10-15">10–15 Personen</option>
            <option value="16+">16+ Personen</option>
          </select>
          <button
            type="submit"
            className="bg-accent text-on-accent font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity border-0 cursor-pointer"
          >
            Checkliste + Early Access
          </button>
        </form>
      </div>
    </section>
  )
}
