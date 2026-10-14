/**
 * Vorschau eines Kundenberichts im Auftritt der Agentur. Statisch, klar als
 * Vorschau beschriftet; die Zahlen sind Beispielwerte.
 */
export default function ReportMock() {
  const rows = [
    { label: 'Verfügbarkeit', value: '99,92 %' },
    { label: 'Updates eingespielt', value: '7' },
    { label: 'Sicherheitslücken geschlossen', value: '1' },
    { label: 'Backups', value: 'täglich' },
  ]
  return (
    <figure className="relative">
      <div className="mx-auto max-w-[19rem] sm:rotate-[1.5deg] rounded-[10px] border border-line bg-surface p-5 shadow-overlay transition-transform duration-500 ease-out-expo sm:hover:rotate-0">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-[0.62rem] font-bold text-surface" aria-hidden="true">
              DA
            </span>
            <span className="text-[0.78rem] font-semibold text-primary">Deine Agentur</span>
          </span>
          <span className="text-[0.62rem] text-tertiary">Oktober 2026</span>
        </div>
        <p className="font-heading text-[1rem] font-semibold leading-tight text-primary">Wartungsbericht</p>
        <p className="mb-4 text-[0.72rem] text-tertiary">Muster AG · muster-ag.ch</p>
        <dl className="flex flex-col">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between border-t border-line py-2">
              <dt className="text-[0.74rem] text-secondary">{r.label}</dt>
              <dd className="text-[0.82rem] font-semibold tabular-nums text-primary">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-4 text-center text-[0.72rem] text-tertiary">
        Vorschau · Bericht mit Logo und Farben deiner Agentur
      </figcaption>
    </figure>
  )
}
