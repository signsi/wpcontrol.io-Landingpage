import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Comparison from '../components/Comparison'
import CTABand from '../components/CTABand'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Vergleich', path: '/vergleich' }]

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
        title="WPorbit im Vergleich zu Local WP und WordPress Studio"
        description="Wie unterscheidet sich WPorbit von Local WP und WordPress Studio? Ein ehrlicher Vergleich für Agenturen, die mit mehreren Hosting-Anbietern arbeiten."
        path="/vergleich"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Vergleich"
        title="WPorbit, Local WP und WordPress Studio"
        lead="Alle drei starten WordPress lokal. Der Unterschied zeigt sich, sobald mehrere Kundenprojekte, mehrere Hosting-Anbieter und mehrere Personen im Spiel sind."
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

      <CTABand
        title="Selbst vergleichen ist ehrlicher."
        text="Teste WPorbit zehn Tage lang mit einem echten Kundenprojekt und entscheide danach."
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
