import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import AISection from '../components/AISection'
import LogoCloud from '../components/LogoCloud'
import { breadcrumbLd, softwareApplicationLd } from '../lib/jsonld'

const crumbs = [{ label: 'Produkt', path: '/produkt' }]

/** Der Projektverlauf, den WPorbit abdeckt — die Klammer um alle Funktionen. */
const lifecycle = [
  {
    phase: 'Aufsetzen',
    title: 'Projekt starten oder übernehmen',
    text: 'Ein neues Projekt anlegen oder eine bestehende WordPress-Website samt Projektdateien übernehmen. Die Arbeitsumgebung richtet sich selbst ein.',
  },
  {
    phase: 'Entwickeln',
    title: 'Lokal arbeiten, ohne Setup-Aufwand',
    text: 'Jedes Projekt bekommt eine eigene, abgestimmte Umgebung. Kein Docker, keine Server-Konfiguration, keine Diskussion über PHP-Versionen.',
  },
  {
    phase: 'Zeigen',
    title: 'Stand abstimmen, ohne live zu gehen',
    text: 'Änderungen prüfen und mit Kundinnen und Kunden abstimmen, bevor irgendetwas veröffentlicht wird.',
  },
  {
    phase: 'Veröffentlichen',
    title: 'Änderungen kontrolliert live bringen',
    text: 'WPorbit prüft die Voraussetzungen und startet den bestehenden Ablauf. Für GitLab stehen Vorlagen bereit, GitHub funktioniert nach demselben Prinzip.',
  },
  {
    phase: 'Betreiben',
    title: 'Warten, aktualisieren, zurückrollen',
    text: 'Updates vorbereiten, Zugänge griffbereit halten und im Zweifel auf den vorherigen Stand zurück. Ohne Suche in Tabellen und Chatverläufen.',
  },
]

export default function ProduktPage() {
  return (
    <>
      <Seo
        title="Produkt"
        description="WPorbit deckt den ganzen Verlauf eines WordPress-Projekts ab: aufsetzen, entwickeln, abstimmen, veröffentlichen und betreiben. In einer Anwendung, ohne Hoster-Bindung."
        path="/produkt"
        jsonLd={[breadcrumbLd(crumbs), softwareApplicationLd()]}
      />

      <PageHero
        kicker="Produkt"
        title={<>Vom Setup bis zur Wartung.<br />Ein Cockpit.</>}
        lead="WPorbit ersetzt den verstreuten Stack aus lokalen Werkzeugen, FTP-Clients, Passwort-Tabellen und manuellen Update-Routinen durch eine einzige Oberfläche."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/demo" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/produkt/funktionen" className="btn btn-secondary btn-md">Alle Funktionen ansehen</Link>
          </>
        }
      />

      <section className="border-b border-line px-6 py-16">
        <div className="reveal-up mb-10 max-w-[46rem]">
          <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">
            Der ganze Verlauf
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Fünf Phasen, eine Anwendung
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">
            Die meisten Werkzeuge decken eine Phase gut ab und lassen dich beim Rest allein. Genau
            dazwischen entsteht der Aufwand, den Agenturen täglich spüren.
          </p>
        </div>

        <ol className="stagger-group grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map((step, i) => (
            <li key={step.phase} className="rounded-panel border border-line bg-surface p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-line font-heading text-[0.75rem] font-semibold text-tertiary">
                  {i + 1}
                </span>
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-accent">
                  {step.phase}
                </span>
              </div>
              <h3 className="mb-2 font-heading text-[1.0625rem] font-semibold leading-snug text-primary">
                {step.title}
              </h3>
              <p className="text-[0.875rem] leading-[1.7] text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <AISection />

      <LogoCloud />

      <CTABand
        title="Am schnellsten überzeugt die Anwendung selbst."
        text="Zehn Tage, ein Projekt, voller Funktionsumfang. Nur eine E-Mail-Adresse, keine Kreditkarte."
        secondary={{ label: 'Alle Funktionen ansehen', to: '/produkt/funktionen' }}
      />
    </>
  )
}
