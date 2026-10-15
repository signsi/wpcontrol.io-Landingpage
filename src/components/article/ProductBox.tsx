import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'
import { TRIAL_DAYS } from '../../data/plans'

interface ProductBoxProps {
  /** Wartungs- und Sicherheitsthemen führen zu Cloud, alles andere zur Demo. */
  topic: 'cloud' | 'testen'
  location: 'blog_box' | 'guide_box'
}

const content = {
  cloud: {
    to: '/cloud',
    text: 'Updates, Backups und Überwachung für alle Kundenseiten an einem Ort.',
    link: 'Alle Kundenseiten im Blick, ohne Plugin – WPorbit Cloud',
  },
  testen: {
    to: '/testen',
    text: 'Projekte, Zugänge und Veröffentlichungen in einem Workspace für den Mac.',
    link: `WPorbit ${TRIAL_DAYS} Tage kostenlos testen`,
  },
} as const

/** Kurzer Produkthinweis am Ende von Blogartikeln und Anleitungen. */
export default function ProductBox({ topic, location }: ProductBoxProps) {
  const { to, text, link } = content[topic]
  return (
    <aside className="rounded-panel border border-line bg-surface p-6">
      <p className="text-[0.9375rem] leading-[1.6] text-secondary">{text}</p>
      <Link
        to={to}
        onClick={() => track('cta_click', { location, target: to })}
        className="mt-2 inline-block text-[0.9375rem] font-semibold text-accent transition-colors hover:text-primary"
      >
        {link} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
