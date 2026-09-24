import { useCallback, useEffect, useRef, useState } from 'react'
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

/**
 * Bilder in Anleitungen: Klick öffnet sie gross in einer Lightbox.
 * Natives <dialog> — Esc, Fokus und Screenreader-Semantik kommen vom Browser.
 * Schliessen per Klick irgendwo, Esc oder Knopf.
 */
export function MdxImage({ alt = '', title, src, ...rest }: ComponentPropsWithoutRef<'img'>) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const caption = title ?? alt

  const show = useCallback(() => {
    dialogRef.current?.showModal()
    setOpen(true)
  }, [])
  const close = useCallback(() => dialogRef.current?.close(), [])

  // Seite hinter der Lightbox nicht mitscrollen lassen.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [open])

  return (
    <figure className="prose-bleed">
      <button
        type="button"
        onClick={show}
        aria-label={caption ? `Bild vergrössern: ${caption}` : 'Bild vergrössern'}
        className="group relative block w-full cursor-zoom-in rounded-panel border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <img alt={alt} src={src} loading="lazy" decoding="async" {...rest} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-primary/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M12.5 12.5 17 17M8.5 6v5M6 8.5h5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {caption && <figcaption>{caption}</figcaption>}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={close}
        aria-label={caption || 'Bild'}
        className="lightbox m-auto max-h-none max-w-none cursor-zoom-out border-0 bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="flex flex-col items-center gap-3 p-4">
            <img
              alt={alt}
              src={src}
              decoding="async"
              style={{ width: 'auto', maxWidth: 'min(calc(100vw - 32px), 1600px)', maxHeight: '86vh', border: 0, borderRadius: 10 }}
            />
            {caption && <span className="block max-w-[80ch] text-center text-[0.875rem] text-white/80">{caption}</span>}
          </div>
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Schliessen"
          className="fixed top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white/15 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
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
