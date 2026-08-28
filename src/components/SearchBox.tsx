import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchIndex } from '../lib/content'
import type { SearchDoc } from '../lib/content/types'

interface SearchBoxProps {
  placeholder?: string
  /** Nur eine Sammlung durchsuchen. Ohne Angabe wird alles durchsucht. */
  only?: SearchDoc['kind']
  label?: string
}

const MAX_RESULTS = 8

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

/**
 * Clientseitige Suche über Titel, Beschreibung und Überschriften.
 * Bewusst ohne Bibliothek — der Index ist klein, und jede Abhängigkeit
 * hier landet im Haupt-Bundle.
 */
export default function SearchBox({
  placeholder = 'Anleitungen und Beiträge durchsuchen …',
  only,
  label = 'Suche',
}: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const docs = useMemo(() => {
    const all = searchIndex()
    return only ? all.filter((d) => d.kind === only) : all
  }, [only])

  const results = useMemo(() => {
    const q = normalise(query.trim())
    if (q.length < 2) return []

    const terms = q.split(/\s+/)
    return docs
      .map((doc) => {
        const haystackTitle = normalise(doc.title)
        const haystackRest = normalise(`${doc.description} ${doc.keywords}`)
        let score = 0
        for (const term of terms) {
          if (haystackTitle.includes(term)) score += 5
          else if (haystackRest.includes(term)) score += 1
          else return null
        }
        return { doc, score }
      })
      .filter((hit): hit is { doc: SearchDoc; score: number } => hit !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((hit) => hit.doc)
  }, [query, docs])

  const showEmpty = query.trim().length >= 2 && results.length === 0

  return (
    <div className="relative">
      <label htmlFor="site-search" className="sr-only">
        {label}
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-control border border-line bg-surface px-4 py-3 text-[0.9375rem] text-primary transition-colors placeholder:text-tertiary focus:border-accent"
      />

      {(results.length > 0 || showEmpty) && (
        <div
          role="listbox"
          aria-label="Suchergebnisse"
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-panel border border-line bg-surface shadow-overlay"
        >
          {showEmpty ? (
            <p className="px-4 py-3.5 text-[0.875rem] text-tertiary">
              Nichts gefunden. Versuche einen anderen Begriff oder schreib uns über{' '}
              <Link to="/kontakt" className="text-accent-strong underline">
                Kontakt
              </Link>
              .
            </p>
          ) : (
            <ul className="list-none p-1.5">
              {results.map((doc) => (
                <li key={doc.path}>
                  <Link
                    to={doc.path}
                    onClick={() => setQuery('')}
                    className="block rounded-control px-3 py-2.5 transition-colors hover:bg-raised"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[0.875rem] font-medium text-primary">{doc.title}</span>
                      <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] font-semibold text-tertiary">
                        {doc.kind === 'guide' ? 'Anleitung' : 'Blog'}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-tertiary">
                      {doc.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
