import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import Breadcrumbs from '../../components/Breadcrumbs'
import TableOfContents from '../../components/article/TableOfContents'
import HelpSidebar from '../../components/hilfe/HelpSidebar'
import { mdxComponents } from '../../components/mdx'
import { getGuide, getGuideNeighbours, getRelatedGuides } from '../../lib/content'
import { guideCategory } from '../../content/taxonomy'
import { formatDate } from '../../lib/format'
import { breadcrumbLd, guideLd } from '../../lib/jsonld'
import { SITE } from '../../config/site'
import type { MdxBody } from '../../lib/content/types'

interface HelpArticlePageProps {
  category: string
  slug: string
  Body: MdxBody
}

const typeLabel: Record<string, string> = {
  anleitung: 'Anleitung',
  fehlerbehebung: 'Fehlerbehebung',
  referenz: 'Referenz',
}

export default function HelpArticlePage({ category, slug, Body }: HelpArticlePageProps) {
  const guide = getGuide(category, slug)
  if (!guide) return null

  const categoryMeta = guideCategory(category)
  const { prev, next } = getGuideNeighbours(category, slug)
  const related = getRelatedGuides(guide)

  const crumbs = [
    { label: 'Anleitungen', path: '/anleitungen' },
    ...(categoryMeta ? [{ label: categoryMeta.label, path: `/anleitungen/${categoryMeta.slug}` }] : []),
    { label: guide.title, path: guide.path },
  ]

  return (
    <>
      <Seo
        title={guide.title}
        description={guide.description}
        path={guide.path}
        type="article"
        image={SITE.guideOgImage}
        modifiedTime={guide.updated}
        noindex={guide.draft}
        jsonLd={[guideLd(guide), breadcrumbLd(crumbs)]}
      />

      <div className="px-6 pb-20 pt-12">
        <Breadcrumbs crumbs={crumbs} className="mb-7" />

        <div className="grid gap-x-14 lg:grid-cols-[15rem_minmax(0,1fr)_14rem]">
          <div className="mb-10 lg:mb-0">
            <HelpSidebar currentCategory={category} currentSlug={slug} />
          </div>

          <div className="min-w-0">
            <header className="mb-9 border-b border-line pb-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] font-semibold text-tertiary">
                  {typeLabel[guide.type] ?? guide.type}
                </span>
                {guide.duration && (
                  <span className="text-[0.75rem] text-tertiary">{guide.duration}</span>
                )}
                {guide.appliesTo.length > 0 && (
                  <span className="text-[0.75rem] text-tertiary">
                    Gilt für {guide.appliesTo.join(', ')}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-[clamp(1.8rem,3.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-primary">
                {guide.title}
              </h1>
              <p className="prose-lede mt-3">{guide.description}</p>
              <p className="mt-5 text-[0.8125rem] text-tertiary">
                Zuletzt aktualisiert am {formatDate(guide.updated)}
              </p>
            </header>

            <div className="prose-article">
              <Body components={mdxComponents} />
            </div>

            {related.length > 0 && (
              <section className="mt-14 border-t border-line pt-8">
                <h2 className="mb-4 font-heading text-[1.0625rem] font-semibold text-primary">
                  Passend dazu
                </h2>
                <ul className="flex list-none flex-col gap-2 p-0">
                  {related.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="block rounded-control border border-line bg-surface px-4 py-3 transition-colors hover:border-tertiary/40"
                      >
                        <span className="text-[0.9375rem] font-medium text-primary">{item.title}</span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-[1.55] text-tertiary">
                          {item.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(prev || next) && (
              <nav
                aria-label="Weitere Anleitungen"
                className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
              >
                {prev ? (
                  <Link
                    to={prev.path}
                    className="rounded-control border border-line bg-surface p-4 transition-colors hover:border-tertiary/40"
                  >
                    <span className="block text-[0.75rem] text-tertiary">Vorherige Anleitung</span>
                    <span className="mt-1 block font-heading text-[0.9375rem] font-semibold text-primary">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    to={next.path}
                    className="rounded-control border border-line bg-surface p-4 text-right transition-colors hover:border-tertiary/40 sm:col-start-2"
                  >
                    <span className="block text-[0.75rem] text-tertiary">Nächste Anleitung</span>
                    <span className="mt-1 block font-heading text-[0.9375rem] font-semibold text-primary">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>

          <aside className="order-first lg:order-none">
            <TableOfContents items={guide.toc} />
          </aside>
        </div>
      </div>
    </>
  )
}
