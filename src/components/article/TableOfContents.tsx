import { useEffect, useState } from 'react'
import type { TocItem } from '../../lib/content/types'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // Oberer Rand hinter der Topbar, unterer bei 30 % — so wird immer die
      // Überschrift markiert, die gerade im oberen Drittel steht.
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  const list = (
    <ul className="flex list-none flex-col gap-1 p-0">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block border-l py-1.5 text-[0.8125rem] leading-[1.45] transition-colors ${
              item.depth === 3 ? 'pl-6' : 'pl-3'
            } ${
              activeId === item.id
                ? 'border-accent font-medium text-primary'
                : 'border-line text-tertiary hover:text-secondary'
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Desktop: mitlaufend in der rechten Spalte */}
      <nav aria-label="Inhaltsverzeichnis" className="sticky top-[5.5rem] hidden lg:block">
        <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">
          Inhalt
        </p>
        {list}
      </nav>

      {/* Mobil: eingeklappt über dem Artikel */}
      <details className="mb-8 rounded-panel border border-line bg-surface px-5 py-3 lg:hidden">
        <summary className="cursor-pointer py-1 text-[0.875rem] font-semibold text-primary">
          Inhalt
        </summary>
        <div className="pt-3">{list}</div>
      </details>
    </>
  )
}
