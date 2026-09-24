import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { mdxComponents } from '../components/mdx'
import { getChangelog } from '../lib/content'
import { formatDate } from '../lib/format'
import { breadcrumbLd } from '../lib/jsonld'
import type { ChangelogEntry, MdxBody } from '../lib/content/types'

const crumbs = [{ label: 'Changelog', path: '/changelog' }]

const typeStyles: Record<ChangelogEntry['type'], string> = {
  release: 'border-accent/30 bg-accent-tint text-accent-strong',
  patch: 'border-line bg-raised text-secondary',
  beta: 'border-line bg-raised text-tertiary',
}

const typeLabel: Record<ChangelogEntry['type'], string> = {
  release: 'Release',
  patch: 'Patch',
  beta: 'Beta',
}

interface ChangelogPageProps {
  /**
   * Alle Eintragstexte, nach Version. Sie werden bereits in der Route geladen
   * (siehe `src/routes.tsx`), damit hier im Render keine Komponenten entstehen.
   */
  bodies: Record<string, MdxBody>
}

export default function ChangelogPage({ bodies }: ChangelogPageProps) {
  const entries = getChangelog()

  return (
    <>
      <Seo
        title="Changelog"
        description="Alle Änderungen an WPorbit: neue Funktionen, Verbesserungen und Korrekturen, chronologisch dokumentiert."
        path="/changelog"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Changelog"
        title="Was sich in WPorbit verändert"
        lead="Jede Version mit dem, was neu ist, was besser wurde und was wir korrigiert haben."
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-20">
        {entries.length === 0 ? (
          <p className="rounded-panel border border-line bg-surface px-6 py-10 text-center text-secondary">
            Der erste Eintrag folgt mit der nächsten Version.
          </p>
        ) : (
          <ol className="flex list-none flex-col gap-12 p-0">
            {entries.map((entry) => (
              <li
                key={entry.version}
                id={entry.anchor}
                className="grid scroll-mt-24 gap-x-10 border-b border-line pb-12 last:border-b-0 lg:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <div className="mb-4 lg:mb-0">
                  <p className="font-heading text-[1.25rem] font-semibold text-primary">
                    {entry.version}
                  </p>
                  <time dateTime={entry.date} className="mt-1 block text-[0.8125rem] text-tertiary">
                    {formatDate(entry.date)}
                  </time>
                  <span
                    className={`mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold ${typeStyles[entry.type]}`}
                  >
                    {typeLabel[entry.type]}
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="font-heading text-[1.25rem] font-semibold leading-snug text-primary">
                    {entry.title}
                  </h2>

                  {entry.highlights.length > 0 && (
                    <ul className="mt-4 flex list-none flex-col gap-2 p-0">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5 text-[0.9375rem] text-secondary">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="prose-article mt-5">
                    {(() => {
                      const Body = bodies[entry.version]
                      return Body ? <Body components={mdxComponents} /> : null
                    })()}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  )
}
