import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Comparison from '../components/Comparison'
import CTABand from '../components/CTABand'
import { breadcrumbLd } from '../lib/jsonld'
import { alternativePath, alternatives } from '../data/alternatives'

const crumbs = [{ label: 'Vergleich', path: '/vergleich' }]

/**
 * Wartung und Überwachung. Nur Angaben, die auf den Seiten der Anbieter
 * stehen (Stand und Quellen: content-plan/cloud-seite.md). Vor jeder
 * Änderung neu prüfen; vergleichende Werbung muss nachprüfbar sein.
 */
const maintenanceTools = ['WPorbit Cloud', 'WP Umbrella', 'ManageWP', 'MainWP', 'InfiniteWP', 'WP Remote'] as const
const maintenanceRows: { label: string; values: string[] }[] = [
  { label: 'Verbindung zur Kundenseite', values: ['Beschränkter SSH-Schlüssel oder nur von aussen', 'Plugin', 'Plugin', 'Plugin', 'Plugin', 'Plugin'] },
  { label: 'Betrieb', values: ['Dienst, Schweiz', 'Dienst, EU', 'Dienst', 'Eigener Server', 'Eigener Server', 'Dienst'] },
  { label: 'Erreichbarkeit', values: ['Alle 5 Min.', 'Ja', 'Zusatz, 60 s', 'Ja', 'Zusatz', 'Ja'] },
  { label: 'Bekannte Sicherheitslücken', values: ['Ja', 'Ja', 'Zusatz', 'Ja', 'Teilweise', 'Ja'] },
  { label: 'Performance (PageSpeed)', values: ['Ja', 'Ja', 'Zusatz', 'Zusatz', 'k. A.', 'k. A.'] },
  { label: 'Barrierefreiheits-Wert', values: ['Ja, Teil-Check', '–', '–', 'Zusatz', 'k. A.', '–'] },
  { label: 'Mailtest und SPF/DKIM/DMARC', values: ['Ja', '–', '–', '–', '–', '–'] },
  { label: 'Updates aus der Ferne', values: ['Geplant', 'Ja', 'Ja', 'Ja', 'Ja', 'Ja'] },
  { label: 'Backups', values: ['Geplant', 'Ja', 'Zusatz', 'Über Plugins', 'Ja', 'Ja'] },
  { label: 'Kundenberichte mit eigenem Logo', values: ['Geplant', 'Ja', 'Zusatz', 'Pro', 'Zusatz', 'Ja'] },
  { label: 'Lokale Entwicklung im selben Werkzeug', values: ['Ja, mit der App', '–', '–', '–', '–', '–'] },
]

const positions = [
  {
    tool: 'Local WP',
    strength: 'Ausgereifte lokale Entwicklungsumgebung mit grosser Verbreitung.',
    limit: 'Stark auf WP Engine ausgerichtet. Kunden- und Projektverwaltung sowie geteilte Zugänge sind nicht vorgesehen.',
    fit: 'Einzelne Entwicklerinnen und Entwickler sowie Teams im WP-Engine-Umfeld.',
  },
  {
    tool: 'WordPress Studio',
    strength: 'Schneller Einstieg, enge Verzahnung mit dem WordPress.com-Ökosystem.',
    limit: 'Auf WordPress.com und Pressable ausgelegt. Für Agenturen mit gemischtem Hosting-Bestand nur eingeschränkt brauchbar.',
    fit: 'Teams, die ohnehin auf WordPress.com arbeiten.',
  },
  {
    tool: 'WPorbit',
    strength: 'Deckt den ganzen Projektverlauf ab: entwickeln, veröffentlichen, warten. Zugänge liegen verschlüsselt pro Projekt.',
    limit: 'Cloud-Funktionen für Teams sind noch in Entwicklung. Heute verfügbar ist der Standalone-Plan.',
    fit: 'Agenturen mit laufenden Kundenprojekten über mehrere Hosting-Anbieter.',
  },
]

export default function VergleichPage() {
  return (
    <>
      <Seo
        title="WPorbit im Vergleich: Entwicklung und Wartung"
        description="WPorbit im Vergleich mit Local WP und WordPress Studio, WPorbit Cloud mit ManageWP, MainWP und WP Umbrella. Ein ehrlicher Vergleich für Agenturen."
        path="/vergleich"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Vergleich"
        title="WPorbit im Vergleich"
        lead="Local WP und WordPress Studio starten WordPress lokal, WPorbit auch. Der Unterschied zeigt sich, sobald mehrere Kundenprojekte, mehrere Hosting-Anbieter und mehrere Personen im Spiel sind. Für Wartung und Überwachung folgt weiter unten der Vergleich von WPorbit Cloud."
        crumbs={crumbs}
        bordered={false}
      />

      <Comparison showHeading={false} />

      <section className="border-t border-line px-6 py-20">
        <div className="reveal-up mb-10 max-w-[46rem]">
          <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Wofür sich welches Werkzeug eignet
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">
            Local WP und Studio sind gute Werkzeuge. Sie sind nur für eine andere Aufgabe gebaut.
          </p>
        </div>

        <div className="stagger-group grid gap-4 lg:grid-cols-3">
          {positions.map((position) => (
            <article
              key={position.tool}
              className={`rounded-panel border p-6 ${
                position.tool === 'WPorbit' ? 'border-accent/30 bg-accent/5' : 'border-line bg-surface'
              }`}
            >
              <h3 className="mb-4 font-heading text-[1.125rem] font-semibold text-primary">
                {position.tool}
              </h3>
              <dl className="flex flex-col gap-3.5 text-[0.875rem] leading-[1.65]">
                <div>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-tertiary">Stärke</dt>
                  <dd className="mt-1 text-secondary">{position.strength}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-tertiary">Grenze</dt>
                  <dd className="mt-1 text-secondary">{position.limit}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-tertiary">Passt für</dt>
                  <dd className="mt-1 text-secondary">{position.fit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="wartung" className="border-t border-line px-6 py-20">
        <div className="reveal-up mb-10 max-w-[46rem]">
          <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Wartung und Überwachung: WPorbit Cloud im Vergleich
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">
            WP Umbrella, ManageWP, MainWP, InfiniteWP und WP Remote sind bewährte Wartungsdienste. Sie verbinden sich über ein
            Plugin auf jeder Kundenseite. WPorbit Cloud braucht keines und kommt zusammen mit der App für die lokale
            Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[48rem] text-left text-[0.84rem]">
            <thead className="bg-raised text-[0.7rem] uppercase tracking-[0.08em] text-tertiary">
              <tr>
                <th className="px-4 py-3 font-semibold"></th>
                {maintenanceTools.map((tool, i) => (
                  <th key={tool} className={`px-4 py-3 font-semibold ${i === 0 ? 'text-accent' : ''}`}>{tool}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maintenanceRows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <td className="px-4 py-3 text-primary">{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-primary' : 'text-secondary'}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-[60ch] text-[0.82rem] leading-[1.65] text-tertiary">
          Stand Oktober 2026, nach Angaben auf den Websites der Anbieter. „Zusatz“ heisst: als kostenpflichtige
          Erweiterung. „–“: dort nicht gefunden. „k. A.“: keine Angabe gefunden. Preise vergleichen wir bewusst nicht, weil Cloud die App für die lokale Entwicklung einschliesst.
        </p>
      </section>

      <section id="einzelvergleiche" className="border-t border-line px-6 py-20">
        <div className="reveal-up mb-8 max-w-[46rem]">
          <h2 className="font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Einzelvergleiche
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">
            Was der jeweilige Dienst gut macht, was bei WPorbit anders ist und für wen was passt.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {alternatives.map((alt) => (
            <li key={alt.slug}>
              <Link
                to={alternativePath(alt.slug)}
                className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent/40 hover:bg-raised"
              >
                <span>
                  <span className="block font-heading text-[1rem] font-semibold text-primary">{alt.name} Alternative</span>
                  <span className="mt-0.5 block text-[0.8rem] text-tertiary">
                    WPorbit {alt.product === 'standalone' ? 'Standalone' : 'Cloud'} und {alt.name} im Vergleich
                  </span>
                </span>
                <span aria-hidden="true" className="text-tertiary transition-colors group-hover:text-accent">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTABand
        title="Selbst vergleichen ist ehrlicher."
        text="Teste WPorbit zehn Tage lang mit einem echten Kundenprojekt und entscheide danach."
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
