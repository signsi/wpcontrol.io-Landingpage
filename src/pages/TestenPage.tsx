import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import EarlyAccess from '../components/EarlyAccess'
import FAQ from '../components/FAQ'
import { TRIAL_DAYS } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Gratis testen', path: '/testen' }]

const steps = [
  {
    title: 'E-Mail-Adresse eingeben',
    text: 'Mehr braucht es nicht. Keine Kreditkarte, kein Vertriebsgespräch, kein Onboarding-Termin.',
  },
  {
    title: 'WPorbit herunterladen',
    text: 'Direkt nach der Anmeldung lädst du die App. Den Link zum Anmelden bekommst du per E-Mail.',
  },
  {
    title: 'Erstes Projekt anlegen',
    text: 'Neu starten oder eine bestehende WordPress-Website übernehmen. Beides dauert wenige Minuten.',
  },
]

const demoFaq = [
  {
    q: 'Was ist im Test enthalten?',
    a: `Der volle Funktionsumfang, ${TRIAL_DAYS} Tage lang. Es gibt keine gesperrten Funktionen.`,
  },
  {
    q: `Was passiert nach den ${TRIAL_DAYS} Tagen?`,
    a: 'Der Test endet automatisch. Es entstehen keine Kosten und du musst nichts kündigen.',
  },
  {
    q: 'Kann ich ein echtes Kundenprojekt testen?',
    a: 'Ja, und genau das empfehlen wir. Der Nutzen zeigt sich erst an einem Projekt mit echten Zugängen und echter Historie.',
  },
  {
    q: 'Auf welchem Betriebssystem läuft WPorbit?',
    a: 'WPorbit ist eine Desktop-Anwendung für macOS. Die Systemvoraussetzungen findest du unter Downloads.',
  },
]

export default function TestenPage() {
  return (
    <>
      <Seo
        title={`WPorbit ${TRIAL_DAYS} Tage gratis testen`}
        description={`WPorbit ${TRIAL_DAYS} Tage kostenlos testen: voller Funktionsumfang, keine Kreditkarte. Nur E-Mail-Adresse eingeben und herunterladen.`}
        path="/testen"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Gratis testen"
        title={<>{TRIAL_DAYS} Tage gratis.<br />Ohne Risiko.</>}
        lead="Der schnellste Weg, WPorbit zu beurteilen, ist ein echtes Kundenprojekt. Genau dafür ist der Test gebaut."
        crumbs={crumbs}
        bordered={false}
      />

      <EarlyAccess />

      <section className="border-t border-line px-6 py-20">
        <div className="reveal-up mb-10 max-w-[46rem]">
          <h2 className="font-heading text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            So läuft es ab
          </h2>
        </div>
        <ol className="stagger-group grid list-none gap-4 p-0 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-panel border border-line bg-surface p-6">
              <span className="mb-3 grid h-8 w-8 place-items-center rounded-full border border-line font-heading text-[0.8125rem] font-semibold text-primary">
                {i + 1}
              </span>
              <h3 className="mb-2 font-heading text-[1.0625rem] font-semibold text-primary">
                {step.title}
              </h3>
              <p className="text-[0.875rem] leading-[1.7] text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <FAQ items={demoFaq} heading="Fragen zum Test" />
    </>
  )
}
