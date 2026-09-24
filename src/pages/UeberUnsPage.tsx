import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { breadcrumbLd, organizationLd } from '../lib/jsonld'

const crumbs = [{ label: 'Über uns', path: '/ueber-uns' }]

const principles = [
  {
    title: 'Kein Hoster-Lock-in',
    text: 'Agenturen arbeiten mit cyon, Infomaniak, Hostpoint, Metanet, Raidboxes, Kinsta und vielen weiteren. Ein Werkzeug, das dich zu einem Anbieter zwingt, löst dein Problem nicht, es verschiebt es.',
  },
  {
    title: 'Nutzen vor Funktion',
    text: 'Uns interessiert nicht, wie viele Funktionen wir aufzählen können, sondern wie viele Handgriffe im Alltag wegfallen. Die meisten guten Entscheidungen im Produkt haben etwas entfernt, nicht hinzugefügt.',
  },
  {
    title: 'Daten in der Schweiz',
    text: 'Zugangsdaten sind das Sensibelste, was eine Agentur verwaltet. Sie liegen verschlüsselt und werden in der Schweiz gehostet, DSGVO-konform.',
  },
  {
    title: 'Ehrlich über den Stand',
    text: 'Standalone ist heute verfügbar. Cloud ist in Entwicklung, und wir schreiben das überall dazu, wo davon die Rede ist. Ein Versprechen, das erst in einem Jahr trägt, ist heute kein Argument.',
  },
]

export default function UeberUnsPage() {
  return (
    <>
      <Seo
        title="Über uns"
        description="WPorbit entsteht aus dem Agenturalltag: warum wir es bauen, wofür wir stehen und weshalb die Daten in der Schweiz liegen."
        path="/ueber-uns"
        jsonLd={[breadcrumbLd(crumbs), organizationLd()]}
      />

      <PageHero
        kicker="Über uns"
        title="Aus dem Agenturalltag entstanden"
        lead="WPorbit ist kein Werkzeug, das am Reissbrett entworfen wurde. Es ist die Antwort auf Probleme, die wir jahrelang selbst umgangen haben."
        crumbs={crumbs}
      />

      <section className="border-b border-line px-6 py-16">
        <div className="reveal-up prose-article">
          <h2>Warum es WPorbit gibt</h2>
          <p>
            In einer WordPress-Agentur verteilt sich ein einzelnes Projekt über erstaunlich viele
            Werkzeuge: eine lokale Entwicklungsumgebung, ein FTP-Client, eine Tabelle mit Zugängen,
            ein Monitoring-Dashboard und irgendwo dazwischen ein Chatverlauf, in dem jemand einmal
            das richtige Passwort geschickt hat.
          </p>
          <p>
            Jedes dieser Werkzeuge funktioniert für sich genommen gut. Der Aufwand entsteht in den
            Lücken dazwischen: beim Einrichten, beim Übergeben, beim Suchen und beim Aufräumen,
            nachdem etwas schiefgegangen ist. Dieser Aufwand taucht in keiner Offerte auf, aber er
            ist da, jeden Tag, bei jedem Projekt.
          </p>
          <p>
            WPorbit schliesst diese Lücken. Nicht, indem es ein weiteres Werkzeug daneben stellt,
            sondern indem es den ganzen Verlauf eines Projekts in eine Oberfläche holt: aufsetzen,
            entwickeln, abstimmen, veröffentlichen, betreiben.
          </p>
        </div>
      </section>

      <section id="sicherheit" className="border-b border-line px-6 py-16">
        <div className="reveal-up mb-10 max-w-[46rem]">
          <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">
            Wofür wir stehen
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Vier Entscheidungen, die alles andere bestimmen
          </h2>
        </div>

        <div className="stagger-group grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-panel border border-line bg-surface p-6">
              <h3 className="mb-2 font-heading text-[1.0625rem] font-semibold text-primary">
                {principle.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.7] text-secondary">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTABand
        title="Reden wir über deine Agentur."
        text="Erzähl uns, wo bei euch der Aufwand entsteht. Oft ist die Antwort schon im Produkt, manchmal wird sie zur nächsten Funktion."
        primary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
        secondary={{ label: '10 Tage gratis testen', to: '/demo' }}
      />
    </>
  )
}
