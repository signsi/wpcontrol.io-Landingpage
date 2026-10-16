import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import NumberedFeatures from '../components/NumberedFeatures'
import CTABand from '../components/CTABand'
import { plans } from '../data/plans'
import type { Audience } from '../data/audiences'
import { getGuide, getPostBySlug } from '../lib/content'
import { breadcrumbLd } from '../lib/jsonld'

/** Gemeinsamer Aufbau für /fuer-freelancer und /fuer-agenturen. */
export default function AudiencePage({ audience }: { audience: Audience }) {
  const crumbs = [{ label: audience.crumb, path: `/${audience.slug}` }]
  const plan = plans.find((p) => p.id === audience.planId)!
  const guides = audience.guides
    .map((path) => {
      const [category, slug] = path.split('/')
      return getGuide(category, slug)
    })
    .filter((g) => g !== undefined)
  const posts = audience.posts.map((slug) => getPostBySlug(slug)).filter((p) => p !== undefined)

  return (
    <>
      <Seo
        title={audience.seoTitle}
        description={audience.seoDescription}
        path={`/${audience.slug}`}
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker={audience.kicker}
        title={audience.title}
        lead={audience.lead}
        crumbs={crumbs}
        actions={
          <>
            <Link to="/testen" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/preise" className="btn btn-secondary btn-md">Alle Pläne vergleichen</Link>
          </>
        }
      />

      <section className="border-b border-line bg-surface px-6 py-14">
        <div className="reveal-up max-w-4xl">
          <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">Im Alltag</p>
          <h2 className="mb-8 font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            {audience.dayTitle}
          </h2>
          <ol className="grid list-none gap-4 p-0 md:grid-cols-2">
            {audience.day.map((step) => (
              <li key={step.time} className="rounded-xl border border-line bg-base p-5">
                <p className="mb-2 font-mono text-[0.75rem] text-tertiary">{step.time}</p>
                <p className="text-[0.9rem] leading-[1.7] text-secondary">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NumberedFeatures features={audience.features} />

      <section className="border-t border-line px-6 py-14">
        <div className="reveal-up grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-panel border border-line bg-surface p-6">
            <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-accent">Passender Plan</p>
            <h2 className="font-heading text-[1.375rem] font-semibold text-primary">{plan.name}</h2>
            <p className="mt-1 text-[0.95rem] text-primary">
              {plan.priceMain} {plan.priceSub}
            </p>
            <p className="mt-3 text-[0.9rem] leading-[1.7] text-secondary">{audience.planText}</p>
            <Link to={plan.href} className="mt-4 inline-block font-semibold text-accent-strong underline underline-offset-[3px]">
              Mehr über {plan.name}
            </Link>
          </div>
          <div>
            <h2 className="mb-3 font-heading text-[1.125rem] font-semibold text-primary">Weiterlesen</h2>
            <ul className="flex list-none flex-col gap-2 p-0 text-[0.9rem]">
              {guides.map((guide) => (
                <li key={guide.path}>
                  <Link to={guide.path} className="text-accent-strong underline underline-offset-[3px]">{guide.title}</Link>
                  <span className="ml-1.5 text-[0.75rem] text-tertiary">Anleitung</span>
                </li>
              ))}
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="text-accent-strong underline underline-offset-[3px]">{post.title}</Link>
                  <span className="ml-1.5 text-[0.75rem] text-tertiary">Blog</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABand
        title="Am eigenen Projekt ausprobieren."
        text="Zehn Tage, voller Funktionsumfang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
      />
    </>
  )
}
