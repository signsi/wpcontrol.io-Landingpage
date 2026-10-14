import type { ReactNode } from 'react'

/**
 * Ein schlichtes Browserfenster um echte Dashboard-Screenshots. Bewusst ohne
 * Marken-Chrome: drei Punkte und die Adresse genügen, damit klar ist, dass es
 * eine Web-Oberfläche ist.
 */
export default function BrowserFrame({
  url = 'dashboard.wporbit.ch',
  children,
  className = '',
}: {
  url?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-panel border border-line bg-surface shadow-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="mx-auto rounded-control bg-base px-3 py-0.5 text-[0.72rem] text-tertiary">{url}</span>
        <span className="w-[2.6rem]" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
