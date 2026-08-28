import { useState, type ComponentPropsWithoutRef, type ReactElement } from 'react'

function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as ReactElement<{ children?: unknown }>).props.children)
  }
  return ''
}

/**
 * Ersetzt `pre` in MDX. Das Styling des Blocks selbst kommt aus
 * `@utility prose-article`; hier kommt nur der Kopieren-Knopf dazu.
 */
export default function CodeBlock(props: ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(extractText(props.children).replace(/\n$/, ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Zwischenablage nicht verfügbar (z. B. ohne HTTPS) — Knopf bleibt still.
    }
  }

  return (
    <div className="prose-bleed group relative">
      <pre {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Kopiert' : 'Code kopieren'}
        className="absolute right-3 top-3 rounded-lg border border-on-dark/20 bg-dark/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-on-dark opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? 'Kopiert' : 'Kopieren'}
      </button>
    </div>
  )
}
