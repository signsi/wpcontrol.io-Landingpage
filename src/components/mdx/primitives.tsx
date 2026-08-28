import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Interne Links laufen über den Router, externe öffnen in einem neuen Tab. */
export function MdxLink({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const isInternal = href.startsWith('/') && !href.startsWith('//')
  if (isInternal) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }

  const isExternal = /^https?:\/\//.test(href)
  return (
    <a href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}

/** Tabellen scrollen in ihrem eigenen Container, damit die Seite es nie tut. */
export function MdxTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="prose-bleed my-7 overflow-x-auto rounded-panel border border-line">
      <table {...props} />
    </div>
  )
}

export function MdxImage({ alt = '', title, ...rest }: ComponentPropsWithoutRef<'img'>) {
  return (
    <figure className="prose-bleed">
      <img alt={alt} loading="lazy" decoding="async" {...rest} />
      {(title || alt) && <figcaption>{title ?? alt}</figcaption>}
    </figure>
  )
}

/** „Das Wichtigste in Kürze" — gut für Featured Snippets bei langen Beiträgen. */
export function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <aside className="prose-bleed my-8 rounded-panel border border-line bg-surface px-6 py-5">
      <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-accent">
        Das Wichtigste in Kürze
      </p>
      <div className="text-[0.9375rem] leading-[1.7] text-secondary">{children}</div>
    </aside>
  )
}
