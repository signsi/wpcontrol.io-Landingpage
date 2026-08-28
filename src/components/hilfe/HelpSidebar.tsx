import { Link } from 'react-router-dom'
import { getGuideTree } from '../../lib/content'

interface HelpSidebarProps {
  currentCategory?: string
  currentSlug?: string
}

export default function HelpSidebar({ currentCategory, currentSlug }: HelpSidebarProps) {
  const tree = getGuideTree()

  return (
    <nav aria-label="Hilfe-Center-Navigation" className="lg:sticky lg:top-[5.5rem]">
      <Link
        to="/anleitungen"
        className="mb-5 block text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary transition-colors hover:text-primary"
      >
        Alle Anleitungen
      </Link>

      <ul className="flex list-none flex-col gap-5 p-0">
        {tree.map((category) => {
          const isOpen = category.slug === currentCategory
          return (
            <li key={category.slug}>
              <Link
                to={category.path}
                className={`block text-[0.8125rem] font-semibold ${
                  isOpen ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {category.label}
              </Link>

              {isOpen && (
                <ul className="mt-2 flex list-none flex-col gap-0.5 border-l border-line p-0">
                  {category.guides.map((guide) => {
                    const isCurrent = guide.slug === currentSlug
                    return (
                      <li key={guide.path}>
                        <Link
                          to={guide.path}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`-ml-px block border-l py-1.5 pl-3 text-[0.8125rem] leading-[1.45] transition-colors ${
                            isCurrent
                              ? 'border-accent font-medium text-primary'
                              : 'border-transparent text-tertiary hover:text-secondary'
                          }`}
                        >
                          {guide.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
