import { compareRows } from '../data/landing'

export default function Comparison() {
  return (
    <section className="px-6 py-16 border-t border-line" id="vergleich">
      <div className="mb-10">
        <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
          Marktvergleich
        </p>
        <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em]">
          Warum Agenturen WPorbit statt LocalWP oder WordPress Studio wählen
        </h2>
      </div>

      <div className="overflow-x-auto border border-line rounded-xl">
        <table className="w-full text-[0.85rem] border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-5 py-3.5 text-tertiary font-semibold text-[0.72rem] uppercase tracking-wide w-[22%] bg-surface">Kriterium</th>
              <th className="text-left px-5 py-3.5 text-accent  font-bold    text-[0.72rem] uppercase tracking-wide w-[26%] bg-surface">WPorbit</th>
              <th className="text-left px-5 py-3.5 text-tertiary font-semibold text-[0.72rem] uppercase tracking-wide w-[26%] bg-surface">LocalWP</th>
              <th className="text-left px-5 py-3.5 text-tertiary font-semibold text-[0.72rem] uppercase tracking-wide w-[26%] bg-surface">WordPress Studio</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, i) => (
              <tr key={row.criterion} className={`border-b border-line last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-base'}`}>
                <td className="px-5 py-3.5 text-secondary  text-[0.82rem]">{row.criterion}</td>
                <td className="px-5 py-3.5 text-primary    text-[0.82rem] font-medium">{row.wporbit}</td>
                <td className="px-5 py-3.5 text-tertiary   text-[0.82rem]">{row.localwp}</td>
                <td className="px-5 py-3.5 text-tertiary   text-[0.82rem]">{row.studio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
