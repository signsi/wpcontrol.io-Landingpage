import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import BrowserFrame from './BrowserFrame'
import { track } from '../../lib/analytics'

export interface AnsweredQuestion {
  question: string
  answer: string
  image: string
  alt: string
  /** Adresszeile über dem Bild; App-Bilder bekommen keinen Browser. */
  url?: string
  width: number
  height: number
}

/**
 * Die Fragen aus dem Agenturalltag, je mit dem Bildschirm, der sie beantwortet.
 * Tabs nach WAI-ARIA: Pfeiltasten wechseln, das Bild blendet über eine Maske
 * ein. Auf schmalen Bildschirmen steht das Bild unter der aktiven Frage.
 */
export default function QuestionExplorer({ items }: { items: AnsweredQuestion[] }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId()

  /** Wechselt die Frage und misst, welche Fragen Agenturen interessieren. */
  const pick = (i: number) => {
    if (i === active) return
    setActive(i)
    track('cloud_question', { question: items[i].question.replace(/[„“]/g, '') })
  }

  const select = (i: number) => {
    const next = (i + items.length) % items.length
    pick(next)
    tabs.current[next]?.focus()
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(i + 1) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(i - 1) }
    if (e.key === 'Home') { e.preventDefault(); select(0) }
    if (e.key === 'End') { e.preventDefault(); select(items.length - 1) }
  }

  const current = items[active]

  /** `labelled`: die eine Fassung, die als Tab-Panel gilt (Desktop). */
  const panel = (item: AnsweredQuestion, i: number, labelled: boolean) => {
    const img = (
      <img
        src={item.image}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    )
    return (
      <div
        key={item.image}
        {...(labelled
          ? { id: `${base}-panel-${i}`, role: 'tabpanel', 'aria-labelledby': `${base}-tab-${i}` }
          : {})}
        className="animate-answer-in"
      >
        {item.url ? (
          <BrowserFrame url={item.url}>{img}</BrowserFrame>
        ) : (
          <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-card">{img}</div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-12">
      <div role="tablist" aria-orientation="vertical" aria-label="Fragen aus dem Agenturalltag" className="flex flex-col">
        {items.map((item, i) => {
          const selected = i === active
          return (
            <div key={item.question}>
              <button
                ref={(el) => { tabs.current[i] = el }}
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${base}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group w-full border-l px-5 py-3.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected ? 'border-accent bg-accent-tint/40' : 'border-line hover:bg-raised'
                }`}
              >
                <span
                  className={`block font-heading text-[1.02rem] font-semibold leading-[1.3] tracking-[-0.01em] transition-colors ${
                    selected ? 'text-primary' : 'text-tertiary group-hover:text-secondary'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out-expo ${
                    selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[0.9rem] leading-[1.65] text-secondary">{item.answer}</span>
                  </span>
                </span>
              </button>
              {selected && <div className="mt-3 mb-5 lg:hidden">{panel(item, i, false)}</div>}
            </div>
          )
        })}
      </div>

      <div className="hidden lg:sticky lg:top-24 lg:block">{panel(current, active, true)}</div>
    </div>
  )
}
