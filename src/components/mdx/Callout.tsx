import type { ReactNode } from 'react'

type Variant = 'hinweis' | 'tipp' | 'achtung' | 'wichtig'

interface CalloutProps {
  variant?: Variant
  title?: string
  children: ReactNode
}

const styles: Record<Variant, { label: string; wrapper: string; accent: string; icon: string }> = {
  hinweis: {
    label: 'Hinweis',
    wrapper: 'border-line bg-raised',
    accent: 'text-tertiary',
    icon: 'i',
  },
  tipp: {
    label: 'Tipp',
    wrapper: 'border-accent/25 bg-accent-tint',
    accent: 'text-accent-strong',
    icon: '★',
  },
  achtung: {
    label: 'Achtung',
    wrapper: 'border-danger/25 bg-danger/5',
    accent: 'text-danger',
    icon: '!',
  },
  wichtig: {
    label: 'Wichtig',
    wrapper: 'border-success/25 bg-success/5',
    accent: 'text-success',
    icon: '✓',
  },
}

export default function Callout({ variant = 'hinweis', title, children }: CalloutProps) {
  const style = styles[variant]

  return (
    <aside className={`prose-bleed my-7 rounded-panel border px-5 py-4 ${style.wrapper}`}>
      <p className={`mb-1.5 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.12em] ${style.accent}`}>
        <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full border border-current text-[0.5625rem]">
          {style.icon}
        </span>
        {title ?? style.label}
      </p>
      <div className="text-[0.9375rem] leading-[1.7] text-secondary [&>*+*]:mt-2">
        {children}
      </div>
    </aside>
  )
}
