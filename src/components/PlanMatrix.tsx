import { planMatrix, type PlanCell } from '../data/plans'
import { cloudComingSoon, cloudToday } from '../data/cloud'

function Cell({ value }: { value: PlanCell }) {
  if (value === 'yes')
    return (
      <span className="font-semibold text-primary">
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Ja</span>
      </span>
    )
  if (value === 'no')
    return (
      <span className="text-tertiary">
        <span aria-hidden="true">–</span>
        <span className="sr-only">Nein</span>
      </span>
    )
  if (value === 'planned') return <span className="text-[0.8rem] font-semibold text-accent-strong">Geplant</span>
  return <span className="text-secondary">{value.text}</span>
}

/** Standalone, Cloud und Massgeschneidert im Vergleich, aus denselben Daten wie /cloud. */
export default function PlanMatrix() {
  const groups = planMatrix(cloudToday, cloudComingSoon)
  return (
    <section className="border-t border-line px-6 py-16" id="planvergleich">
      <div className="reveal-up mb-8 max-w-[46rem]">
        <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-accent">Planvergleich</p>
        <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Was in welchem Plan steckt
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.75] text-secondary">
          Die App ist in allen Plänen dieselbe. Cloud ergänzt die Arbeit im Team und die Überwachung der
          Kundenseiten. Cloud ist in Entwicklung, der Release folgt bis Ende 2026. „Geplant“ heisst: noch nicht
          verfügbar.
        </p>
      </div>

      <div className="reveal-up overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[40rem] border-collapse text-[0.85rem]">
          <thead>
            <tr className="border-b border-line bg-surface">
              <th scope="col" className="w-[40%] px-5 py-3.5 text-left text-[0.75rem] font-semibold uppercase tracking-wide text-tertiary">
                Funktion
              </th>
              <th scope="col" className="px-5 py-3.5 text-left text-[0.75rem] font-bold uppercase tracking-wide text-primary">Standalone</th>
              <th scope="col" className="px-5 py-3.5 text-left text-[0.75rem] font-bold uppercase tracking-wide text-accent">Cloud</th>
              <th scope="col" className="px-5 py-3.5 text-left text-[0.75rem] font-bold uppercase tracking-wide text-primary">Massgeschneidert</th>
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.heading}>
              <tr className="border-b border-line bg-raised">
                <th scope="colgroup" colSpan={4} className="px-5 py-2.5 text-left text-[0.72rem] font-bold uppercase tracking-[0.1em] text-secondary">
                  {group.heading}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-b border-line bg-base">
                  <th scope="row" className="px-5 py-3 text-left font-normal text-primary">{row.label}</th>
                  <td className="px-5 py-3"><Cell value={row.standalone} /></td>
                  <td className="px-5 py-3"><Cell value={row.cloud} /></td>
                  <td className="px-5 py-3"><Cell value={row.custom} /></td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  )
}
