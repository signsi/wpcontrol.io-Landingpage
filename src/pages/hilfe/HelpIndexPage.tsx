import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import PageHero from '../../components/PageHero'
import SearchBox from '../../components/SearchBox'
import CTABand from '../../components/CTABand'
import { getGuideTree } from '../../lib/content'
import { breadcrumbLd } from '../../lib/jsonld'

const crumbs = [{ label: 'Anleitungen', path: '/anleitungen' }]

export default function HelpIndexPage() {
  const tree = getGuideTree()

  return (
    <>
      <Seo
        title="Anleitungen"
        description="Das Hilfe-Center für WPorbit: Schritt-für-Schritt-Anleitungen zu Installation, Projekten, lokaler Entwicklung, Deployment, Vault und Fehlerbehebung."
        path="/anleitungen"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Hilfe-Center"
        title="Anleitungen"
        lead="Schritt für Schritt durch WPorbit. Nach Themen sortiert statt nach Datum, damit du findest, was du gerade brauchst."
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-20">
        <div className="mb-10 max-w-xl">
          <SearchBox only="guide" placeholder="Anleitungen durchsuchen …" label="Anleitungen durchsuchen" />
        </div>

        {tree.length === 0 ? (
          <p className="rounded-panel border border-line bg-surface px-6 py-10 text-center text-secondary">
            Hier erscheinen bald die ersten Anleitungen.
          </p>
        ) : (
          <div className="stagger-group grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tree.map((category) => (
              <article key={category.slug} className="relative rounded-panel border border-line bg-surface p-6 transition-colors hover:border-tertiary/40">
                <h2 className="font-heading text-[1.0625rem] font-semibold text-primary">
                  <Link to={category.path} className="after:absolute after:inset-0">
                    {category.label}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.875rem] leading-[1.65] text-secondary">
                  {category.description}
                </p>
                <p className="mt-4 text-[0.75rem] text-tertiary">
                  {category.count} {category.count === 1 ? 'Anleitung' : 'Anleitungen'}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTABand
        title="Nicht gefunden, was du suchst?"
        text="Schreib uns kurz, worum es geht. Häufige Fragen nehmen wir direkt als neue Anleitung auf."
        primary={{ label: 'Support kontaktieren', to: '/support' }}
        secondary={{ label: 'Häufige Fragen', to: '/faq' }}
      />
    </>
  )
}
