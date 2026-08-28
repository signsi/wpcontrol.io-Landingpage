import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'

interface StepProps {
  title: string
  children: ReactNode
  /** Wird von `<Steps>` gesetzt — im MDX nicht angeben. */
  number?: number
  /** Wird von `<Steps>` gesetzt. */
  isLast?: boolean
}

export function Step({ title, children, number = 1, isLast = false }: StepProps) {
  return (
    <li className={`relative pl-12 ${isLast ? '' : 'pb-8'}`}>
      {!isLast && (
        <span aria-hidden="true" className="absolute bottom-0 left-4 top-9 w-px bg-line" />
      )}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-line bg-surface font-heading text-[0.8125rem] font-semibold text-primary"
      >
        {number}
      </span>
      <h3 className="mt-0.5 mb-2 font-heading text-[1.0625rem] font-semibold leading-snug text-primary">
        {title}
      </h3>
      <div className="text-[0.9375rem] leading-[1.72] text-secondary [&>*+*]:mt-3">
        {children}
      </div>
    </li>
  )
}

/**
 * Nummerierte Schrittfolge für Anleitungen. Die Nummern kommen von hier,
 * damit ein Umsortieren im MDX nicht zu falschen Zahlen führt.
 */
export function Steps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement) as ReactElement<StepProps>[]

  return (
    <ol className="prose-bleed my-8 list-none p-0">
      {steps.map((step, i) =>
        cloneElement(step, { key: i, number: i + 1, isLast: i === steps.length - 1 }),
      )}
    </ol>
  )
}
