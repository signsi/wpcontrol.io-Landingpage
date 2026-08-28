import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import Breadcrumbs from '../../components/Breadcrumbs'
import HelpSidebar from '../../components/hilfe/HelpSidebar'
import { getGuidesByCategory } from '../../lib/content'
import { guideCategory } from '../../content/taxonomy'
import { formatDate } from '../../lib/format'
import { breadcrumbLd } from '../../lib/jsonld'

interface HelpCategoryPageProps {
  category: string
}

export default function HelpCategoryPage({ category }: HelpCategoryPageProps) {
  const meta = guideCategory(category)
  const guides = getGuidesByCategory(category)
  const path = `/anleitungen/${category}`

  const crumbs = [
    { label: 'Anleitungen', path: '/anleitungen' },
    { label: meta?.label ?? category, path },
  ]

  return (
    <>
      <Seo
        title={`${meta?.label ?? category} – Anleitungen`}
        description={meta?.description ?? `Anleitungen zum Thema ${category}.`}
        path={path}
        jsonLd={breadcrumbLd(crumbs)}
      />

      <div className="px-6 pb-20 pt-12">
        <Breadcrumbs crumbs={crumbs} className="mb-7" />

        <div className="grid gap-x-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div className="mb-10 lg:mb-0">
            <HelpSidebar currentCategory={category} />
          </div>

          <div className="min-w-0">
            <header className="mb-8 border-b border-line pb-7">
              <h1 className="font-heading text-[clamp(1.8rem,3.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-primary">
                {meta?.label ?? category}
              </h1>
              {meta?.description && <p className="prose-lede mt-3">{meta.description}</p>}
            </header>

            <ul className="flex list-none flex-col gap-3 p-0">
              {guides.map((guide) => (
                <li key={guide.path}>
                  <Link
                    to={guide.path}
                    className="block rounded-panel border border-line bg-surface p-5 transition-colors hover:border-tertiary/40"
                  >
                    <span className="font-heading text-[1rem] font-semibold text-primary">
                      {guide.title}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] leading-[1.65] text-secondary">
                      {guide.description}
                    </span>
                    <span className="mt-3 block text-[0.75rem] text-tertiary">
                      {guide.duration ? `${guide.duration} · ` : ''}
                      Aktualisiert am {formatDate(guide.updated)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
