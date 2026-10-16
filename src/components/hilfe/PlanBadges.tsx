/**
 * Zeigt, für welchen Plan eine Anleitung gilt (`appliesTo` im Frontmatter).
 * Gilt sie nur für Cloud, ist das hervorgehoben: Wer Standalone nutzt, sieht
 * sofort, dass die Funktion dort fehlt.
 */
export default function PlanBadges({ plans }: { plans: string[] }) {
  if (plans.length === 0) return null
  const cloudOnly = plans.length === 1 && plans[0] === 'Cloud'
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span className="sr-only">Gilt für:</span>
      {plans.map((plan) => (
        <span
          key={plan}
          className={`rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold ${
            cloudOnly ? 'border-accent/30 bg-accent/10 text-accent-strong' : 'border-line text-tertiary'
          }`}
        >
          {plan}
        </span>
      ))}
      {cloudOnly && <span className="text-[0.72rem] text-tertiary">nur mit Cloud</span>}
    </span>
  )
}
