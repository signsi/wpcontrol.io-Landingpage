import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SearchBox from '../components/SearchBox'
import { SITE } from '../config/site'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Support', path: '/support' }]

const channels = [
  {
    title: 'Anleitungen',
    text: 'Die schnellste Antwort auf konkrete Fragen zur Anwendung. Nach Themen sortiert, mit Schritt-für-Schritt-Ablauf.',
    to: '/anleitungen',
    cta: 'Zum Hilfe-Center',
  },
  {
    title: 'Fehlerbehebung',
    text: 'Projekt startet nicht, Deploy schlägt fehl, Verbindung wird abgewiesen: die häufigsten Fehlerbilder mit Ursache und Lösung.',
    to: '/anleitungen/fehlerbehebung',
    cta: 'Fehler nachschlagen',
  },
  {
    title: 'Häufige Fragen',
    text: 'Grundsätzliches zu Plänen, Hosting-Unabhängigkeit, Zugängen und Abrechnung.',
    to: '/faq',
    cta: 'Zu den FAQ',
  },
]

const slaRows = [
  { plan: 'Demo', response: 'Innerhalb von zwei Arbeitstagen', channel: 'E-Mail' },
  { plan: 'Standalone', response: 'Innerhalb von einem Arbeitstag', channel: 'E-Mail' },
  { plan: 'Cloud', response: 'Innerhalb von einem Arbeitstag', channel: 'E-Mail, priorisiert' },
  { plan: 'Massgeschneidert', response: 'Vertraglich vereinbart', channel: 'Fester Ansprechpartner' },
]

export default function SupportPage() {
  return (
    <>
      <Seo
        title="Support"
        description="Hilfe für WPorbit-Kunden: Anleitungen, Fehlerbehebung, häufige Fragen und der direkte Draht zum Team."
        path="/support"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Support"
        title="Wir helfen weiter"
        lead="Die meisten Fragen sind in den Anleitungen bereits beantwortet. Wenn nicht, melde dich direkt."
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-16">
        <div className="mb-10 max-w-xl">
          <SearchBox placeholder="Problem oder Stichwort eingeben …" label="Hilfe durchsuchen" />
        </div>

        <div className="stagger-group grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <article key={channel.title} className="relative flex flex-col rounded-panel border border-line bg-surface p-6">
              <h2 className="font-heading text-[1.0625rem] font-semibold text-primary">
                <Link to={channel.to} className="after:absolute after:inset-0">{channel.title}</Link>
              </h2>
              <p className="mt-2 text-[0.875rem] leading-[1.65] text-secondary">{channel.text}</p>
              <span className="mt-4 text-[0.8125rem] font-medium text-accent-strong">{channel.cta} →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-6 py-16">
        <h2 className="mb-6 font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Reaktionszeiten
        </h2>

        <div className="overflow-x-auto rounded-panel border border-line">
          <table className="w-full border-collapse text-[0.875rem]">
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="px-5 py-3.5 text-left text-[0.75rem] font-semibold uppercase tracking-wide text-tertiary">Plan</th>
                <th className="px-5 py-3.5 text-left text-[0.75rem] font-semibold uppercase tracking-wide text-tertiary">Erste Rückmeldung</th>
                <th className="px-5 py-3.5 text-left text-[0.75rem] font-semibold uppercase tracking-wide text-tertiary">Kanal</th>
              </tr>
            </thead>
            <tbody>
              {slaRows.map((row, i) => (
                <tr key={row.plan} className={`border-b border-line last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-base'}`}>
                  <td className="px-5 py-3.5 font-medium text-primary">{row.plan}</td>
                  <td className="px-5 py-3.5 text-secondary">{row.response}</td>
                  <td className="px-5 py-3.5 text-tertiary">{row.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 rounded-panel border border-line bg-surface p-7">
          <h3 className="font-heading text-[1.125rem] font-semibold text-primary">Direkt melden</h3>
          <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-[1.7] text-secondary">
            Beschreib möglichst genau, was du gemacht hast, was passiert ist und was du erwartet
            hättest. Ein Screenshot und der Projektname helfen uns, schneller zu antworten.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/kontakt" className="btn btn-primary btn-md">Support kontaktieren</Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary btn-md">{SITE.email}</a>
          </div>
        </div>
      </section>
    </>
  )
}
