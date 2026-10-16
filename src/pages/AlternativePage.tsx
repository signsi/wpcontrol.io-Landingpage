import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import BrowserFrame from '../components/cloud/BrowserFrame'
import { KeyBadge, MarkIcon, PluginBadge, SiteTile } from '../components/cloud/CompareCards'
import {
  alternativePath,
  alternatives,
  getAlternative,
  SOURCES_CHECKED_AT,
  SOURCES_STAND,
} from '../data/alternatives'
import type { Cell } from '../data/alternatives'
import { breadcrumbLd, faqPageLd } from '../lib/jsonld'

function SectionHead({ kicker, title, lead }: { kicker: string; title: string; lead?: ReactNode }) {
  return (
    <div className="reveal-up mb-10 max-w-[46rem]">
      <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">{kicker}</p>
      <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
        {title}
      </h2>
      {lead && <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">{lead}</p>}
    </div>
  )
}

/** Zelle der Vergleichstabelle: Zeichen plus kurzer Text. „k. A.“ ohne Zeichen. */
function CellView({ cell, strong = false }: { cell: Cell; strong?: boolean }) {
  return (
    <span className="flex items-start gap-2">
      {cell.mark === 'plain' ? null : cell.mark === 'unknown' ? (
        <span className="grid size-5 shrink-0 place-items-center rounded-full border border-line text-[0.6rem] font-semibold text-tertiary" aria-hidden="true">?</span>
      ) : (
        <MarkIcon mark={cell.mark} />
      )}
      <span className={strong ? 'font-medium text-primary' : 'text-secondary'}>{cell.text}</span>
    </span>
  )
}

/** Aufbau als Bild: drei Kundenseiten mit Plugin bzw. mit Lese-Schlüssel. */
function SetupPanel({ title, caption, badge, accent = false }: { title: string; caption: string; badge: ReactNode; accent?: boolean }) {
  return (
    <figure
      className={`rounded-panel border p-5 ${accent ? 'border-accent/30 bg-accent/[0.06]' : 'border-line bg-surface'}`}
    >
      <p className={`mb-4 font-heading text-[1rem] font-semibold ${accent ? 'text-accent' : 'text-primary'}`}>{title}</p>
      <div className={`rounded-control p-4 ${accent ? 'bg-surface' : 'bg-raised'}`} aria-hidden="true">
        <div className="flex gap-3">
          <SiteTile badge={badge} />
          <SiteTile badge={badge} />
          <SiteTile badge={badge} />
        </div>
      </div>
      <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-tertiary">{caption}</figcaption>
    </figure>
  )
}

export default function AlternativePage({ slug }: { slug: string }) {
  const alt = getAlternative(slug)
  const path = alternativePath(alt.slug)
  const crumbs = [
    { label: 'Vergleich', path: '/vergleich' },
    { label: `${alt.name} Alternative`, path },
  ]
  const standalone = alt.product === 'standalone'
  const productName = standalone ? 'WPorbit Standalone' : 'WPorbit Cloud'
  // Erst die Vergleiche mit demselben Produkt, dann die anderen.
  const others = alternatives
    .filter((a) => a.slug !== alt.slug)
    .sort((a, b) => Number(b.product === alt.product) - Number(a.product === alt.product))

  return (
    <>
      <Seo
        title={alt.seoTitle}
        description={alt.seoDescription}
        path={path}
        image={standalone ? undefined : '/og/cloud.jpg'}
        jsonLd={[breadcrumbLd(crumbs), faqPageLd(alt.faq)]}
      />

      <PageHero
        kicker={`Vergleich · ${alt.name}`}
        title={standalone ? `${alt.name} Alternative für Agenturen auf dem Mac` : `${alt.name} Alternative für Agenturen in der Schweiz`}
        lead={alt.lead}
        crumbs={crumbs}
        actions={
          standalone ? (
            <>
              <Link to="/testen" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
              <Link to="/standalone" className="btn btn-secondary btn-md">WPorbit Standalone ansehen</Link>
            </>
          ) : (
            <>
              <Link to="/cloud" className="btn btn-primary btn-md">WPorbit Cloud ansehen</Link>
              <Link to="/testen" className="btn btn-secondary btn-md">10 Tage gratis testen</Link>
            </>
          )
        }
      />

      <section className="border-b border-line px-6 py-16">
        <div className="hero-image">
          {standalone ? (
            <>
              <img
                src="/home/app.webp"
                srcSet="/home/app-800.webp 800w, /home/app-1280.webp 1280w, /home/app-1920.webp 1920w, /home/app.webp 2560w"
                sizes="(min-width: 1088px) 64rem, calc(100vw - 3rem)"
                alt="WPorbit-App: links die Projekte, rechts die Übersicht eines laufenden Projekts mit Verbindungen, Projektdetails, Zugangsdaten und Wartung"
                width={2560}
                height={1560}
                fetchPriority="high"
                className="block h-auto w-full rounded-[14px] shadow-overlay ring-1 ring-line"
              />
              <p className="mt-3 text-[0.78rem] text-tertiary">Die Mac-App WPorbit mit einem laufenden Projekt.</p>
            </>
          ) : (
            <>
              <BrowserFrame>
                <img
                  src="/cloud/hero.webp"
                  alt="WPorbit Team-Dashboard: alle Kundenseiten mit Zustand, offenen Updates, SSL, Antwortzeit, Verfügbarkeit und Performance"
                  width={2400}
                  height={933}
                  fetchPriority="high"
                  className="block h-auto w-full"
                />
              </BrowserFrame>
              <p className="mt-3 text-[0.78rem] text-tertiary">Team-Dashboard von WPorbit Cloud, mit Demo-Daten.</p>
            </>
          )}
        </div>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead kicker={alt.name} title={`Was ${alt.name} gut macht`} lead={alt.what} />
        <dl className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
          {alt.strengths.map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <dt className="font-heading text-[1rem] font-semibold text-primary">{item.title}</dt>
              <dd className="mt-1.5 text-[0.88rem] leading-[1.65] text-secondary">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Der Unterschied"
          title="Was bei WPorbit anders ist"
          lead={
            standalone
              ? 'Lokal WordPress starten können beide. WPorbit ist auf das gebaut, was danach kommt: bestehende Kundenprojekte übernehmen, ändern und sicher wieder veröffentlichen, bei jedem Hoster.'
              : `${alt.connection} Jedes Plugin, das eine Website nach aussen öffnet, ist zusätzliche Angriffsfläche, auch ein Überwachungs-Plugin. WPorbit braucht keines.`
          }
        />
        {!standalone && (
          <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <SetupPanel title={alt.name} caption={`Auf jeder Kundenseite das ${alt.pluginLabel}.`} badge={<PluginBadge />} />
            <SetupPanel
              title="WPorbit Cloud"
              caption="Ein Lese-Schlüssel mit festen Befehlen, kein Plugin in WordPress. Oder nur Messung von aussen."
              badge={<KeyBadge />}
              accent
            />
          </div>
        )}
        <ol className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {alt.differences.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-tint font-heading text-[0.85rem] font-semibold text-accent" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading text-[1rem] font-semibold text-primary">{item.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-[1.65] text-secondary">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="tabelle" className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Im Überblick"
          title={`${productName} und ${alt.name} im Vergleich`}
          lead={
            standalone
              ? 'Was die beiden Werkzeuge für die lokale Arbeit an Kundenprojekten mitbringen. Preise vergleichen wir bewusst nicht.'
              : 'Was die beiden Dienste für die Wartung von Kundenseiten mitbringen. Preise vergleichen wir bewusst nicht, weil Cloud die App für die lokale Entwicklung einschliesst.'
          }
        />
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <table className="w-full table-fixed text-left text-[0.84rem] leading-[1.45]">
            <caption className="sr-only">
              {`${productName} und ${alt.name} im Vergleich, ${SOURCES_STAND}, laut Angaben der Anbieter`}
            </caption>
            <thead className="bg-raised text-[0.7rem] uppercase tracking-[0.08em] text-tertiary">
              <tr>
                <th scope="col" className="hidden w-[30%] px-5 py-3 font-semibold sm:table-cell">Kriterium</th>
                <th scope="col" className="px-4 py-3 font-semibold text-accent sm:px-5">{productName}</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">{alt.name}</th>
              </tr>
            </thead>
            <tbody>
              {alt.rows.map((row) => (
                <Fragment key={row.label}>
                  {/* Schmal steht das Kriterium als eigene Zeile über den beiden Werten. */}
                  <tr className="border-t border-line sm:hidden">
                    <th scope="colgroup" colSpan={2} className="px-4 pt-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-tertiary">
                      {row.label}
                    </th>
                  </tr>
                  <tr className="align-top sm:border-t sm:border-line">
                    <th scope="row" className="hidden px-5 py-3.5 font-normal text-primary sm:table-cell">{row.label}</th>
                    <td className="px-4 pb-3.5 pt-2 sm:px-5 sm:py-3.5"><CellView cell={row.orbit} strong /></td>
                    <td className="px-4 pb-3.5 pt-2 sm:px-5 sm:py-3.5"><CellView cell={row.them} /></td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 max-w-[68ch] text-[0.8rem] leading-[1.65] text-tertiary">
          <p>
            {SOURCES_STAND}, laut Angaben der Anbieter auf ihren Websites. „Zusatz“ heisst: als kostenpflichtige
            Erweiterung. „Nicht gefunden“: auf den Seiten des Anbieters nicht gefunden. „k. A.“: keine Angabe gefunden. „Geplant“: für Cloud vorgesehen,
            noch nicht verfügbar. Genannte Marken gehören ihren Inhabern; WPorbit steht in keiner Verbindung zu ihnen.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer font-semibold text-secondary hover:text-primary">
              Quellen (abgerufen am {alt.checkedAt ?? SOURCES_CHECKED_AT})
            </summary>
            <ul className="mt-2 flex flex-col gap-1">
              {alt.sources.map((url) => (
                <li key={url} className="break-all">
                  <a href={url} rel="nofollow noopener noreferrer" target="_blank" className="underline hover:text-accent">
                    {url.replace(/^https:\/\//, '')}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Ehrlich gesagt"
          title="Für wen passt was"
          lead={
            standalone
              ? 'Beide Werkzeuge sind gut. Welches besser passt, hängt von deinem Hosting und deinem Alltag ab.'
              : 'Beide Werkzeuge sind für Agenturen gebaut. Welches besser passt, hängt davon ab, was du heute brauchst.'
          }
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-panel border border-accent/30 bg-accent/[0.06] p-6">
            <h3 className="mb-4 font-heading text-[1.1rem] font-semibold text-accent">WPorbit passt besser, wenn …</h3>
            <ul className="flex flex-col gap-3">
              {alt.fitOrbit.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55] text-secondary">
                  <MarkIcon mark="yes" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-panel border border-line bg-surface p-6">
            <h3 className="mb-4 font-heading text-[1.1rem] font-semibold text-primary">{alt.name} passt besser, wenn …</h3>
            <ul className="flex flex-col gap-3">
              {alt.fitThem.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55] text-secondary">
                  <MarkIcon mark="yes" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="faq" className="border-b border-line px-6 py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">FAQ</p>
            <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              Häufige Fragen zum Wechsel
            </h2>
            <p className="mt-3 max-w-[32ch] text-[0.9rem] leading-[1.7] text-secondary">
              Weitere Fragen? Schreib uns über{' '}
              <Link to="/kontakt" className="text-accent-strong underline">Kontakt</Link>.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {alt.faq.map((item) => (
              <details key={item.q} className="group rounded-xl border border-line bg-surface open:bg-surface">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-[0.95rem] font-medium leading-snug text-primary [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-line text-[0.75rem] text-tertiary transition-transform group-open:rotate-45 group-open:border-accent group-open:text-accent"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[0.88rem] leading-[1.75] text-secondary">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <h2 className="mb-5 font-heading text-[1.15rem] font-semibold text-primary">Weitere Vergleiche</h2>
        <ul className="flex flex-wrap gap-2.5">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={alternativePath(o.slug)} className="btn btn-secondary btn-md">
                {o.name} Alternative
              </Link>
            </li>
          ))}
          <li>
            <Link to={standalone ? '/vergleich' : '/vergleich#wartung'} className="btn btn-secondary btn-md">Alle im Überblick</Link>
          </li>
        </ul>
      </section>

      {standalone ? (
        <CTABand
          title="Mit einem echten Kundenprojekt testen."
          text="Übernimm eine bestehende Website, ändere etwas und bring es wieder live. Zehn Tage, voller Funktionsumfang, ohne Kreditkarte."
          primary={{ label: '10 Tage gratis testen', to: '/testen' }}
          secondary={{ label: 'Preise ansehen', to: '/preise' }}
        />
      ) : (
        <CTABand
          title="Kundenseiten überwachen, ohne Plugin."
          text="Cloud mit Team-Dashboard erscheint bis Ende 2026. Die App läuft schon heute, deine Projekte nimmst du mit."
          primary={{ label: 'WPorbit Cloud ansehen', to: '/cloud' }}
          secondary={{ label: '10 Tage gratis testen', to: '/testen' }}
        />
      )}
    </>
  )
}
