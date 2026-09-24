import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import NumberedFeatures from '../components/NumberedFeatures'
import CTABand from '../components/CTABand'
import { plans, STANDALONE_PROJECT_LIMIT } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'

const standalone = plans.find((p) => p.id === 'standalone')!

const features = [
  {
    title: 'Startklar ohne Einrichtung',
    detail: 'WPorbit starten, Projekt öffnen und direkt loslegen. Die technische Einrichtung läuft automatisch im Hintergrund. Jedes Projekt erhält eine eigene, zuverlässig abgestimmte Arbeitsumgebung.',
  },
  {
    title: 'Alle Projekte im Blick',
    detail: 'Alle WordPress-Projekte werden in einer gemeinsamen Oberfläche zusammengeführt. Verbindungen, aktueller Stand und nächste Schritte sind auf einen Blick sichtbar. So wechselt das Team ohne lange Suche direkt zum nächsten Projekt.',
  },
  {
    title: 'Zugänge sicher verwahrt',
    detail: 'Passwörter, Schlüssel und weitere Zugangsdaten liegen verschlüsselt im passenden Projekt. Kein Teilen über Chats oder E-Mails und keine sensiblen Daten in ungeschützten Notizen.',
  },
  {
    title: 'Änderungen sicher veröffentlichen',
    detail: 'Websites online aktualisieren oder den aktuellen Stand zurückholen, ohne einzelne technische Schritte von Hand auszuführen. WPorbit prüft die Voraussetzungen und startet den bestehenden Ablauf. Zum Start stehen Vorlagen für GitLab bereit; GitHub lässt sich nach demselben Prinzip anbinden.',
  },
  {
    title: 'Bestehende Websites übernehmen',
    detail: 'Die vorhandenen Zugangsdaten genügen, um eine bestehende WordPress-Website samt Projektdateien zu übernehmen. Manuelle Sicherungen und aufwendiges Wiederherstellen entfallen.',
  },
  {
    title: 'Aus dem Agenturalltag entwickelt',
    detail: 'WPorbit kennt die typischen Stolpersteine in WordPress-Projekten. Voraussetzungen werden vor kritischen Aktionen geprüft, bekannte Fehlerquellen früh abgefangen und verständlich erklärt. Kontextbezogene Hilfestellungen zeigen direkt im jeweiligen Arbeitsschritt, was zu tun ist.',
  },
]

const crumbs = [{ label: 'Standalone', path: '/standalone' }]

export default function StandalonePage() {
  return (
    <>
      <Seo
        title="Standalone"
        description={`WPorbit Standalone: WordPress-Projekte unabhängig organisieren, Zugänge sicher verwahren und Änderungen veröffentlichen. Ab ${standalone.priceMain.replace('ab ', '')} CHF pro Person und Monat.`}
        path="/standalone"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Standalone"
        title={<>Professionell arbeiten.<br />Einfach starten.</>}
        lead="Für Agenturen, die WordPress-Projekte zuverlässig organisieren und unabhängig von der Cloud bearbeiten wollen."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/demo" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/preise" className="btn btn-secondary btn-md">Alle Pläne vergleichen</Link>
          </>
        }
      >
        <div className="mt-5 flex items-end gap-2 leading-none">
          <span className="font-heading text-[2.8rem] font-semibold leading-none tracking-[-0.03em] text-primary">
            {standalone.priceMain}
          </span>
          <span className="mb-1.5 text-[0.88rem] leading-tight text-secondary">
            {standalone.priceSub}
            <br />
            <span className="text-[0.78rem] text-tertiary">Max. {STANDALONE_PROJECT_LIMIT} Projekte</span>
          </span>
        </div>
      </PageHero>

      <NumberedFeatures features={features} />

      {/* Zeitplan */}
      <section className="reveal-up border-b border-line bg-surface px-6 py-14">
        <div className="max-w-4xl">
          <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">Zeitplan</p>
          <h2 className="mb-4 max-w-[30ch] font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Wechsel auf Standalone bis Ende 2026
          </h2>
          <p className="mb-8 max-w-[60ch] text-[0.95rem] leading-[1.75] text-secondary">
            Der operative Wechsel auf WPorbit Standalone ist bis Ende 2026 geplant.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-line bg-base p-5">
              <p className="mb-2 text-[0.66rem] uppercase tracking-[0.12em] text-tertiary">Bis August 2026</p>
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Vorbereitung</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">
                Bestand aufnehmen, Prioritäten definieren und Team auf den Wechsel vorbereiten.
              </p>
            </article>

            <article className="rounded-xl border border-accent/30 bg-accent/10 p-5">
              <p className="mb-2 text-[0.66rem] uppercase tracking-[0.12em] text-accent">Ab September 2026</p>
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Team-Testphase</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">
                Neue Standalone-Version im Team testen, Feedback aufnehmen und iterativ entwickeln.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-base p-5">
              <p className="mb-2 text-[0.66rem] uppercase tracking-[0.12em] text-tertiary">Ende 2026</p>
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Wechsel abgeschlossen</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">
                Umstieg auf die Standalone-Version als neue Basis im laufenden Betrieb.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Übergangsphase */}
      <section id="uebergangsphase" className="reveal-up border-y border-line bg-raised px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">Übergangsphase</p>
          <h2 className="mb-4 max-w-[36ch] font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Die bisherige Lösung bleibt bis zum Wechsel betreut
          </h2>
          <p className="mb-8 max-w-[62ch] text-[0.95rem] leading-[1.75] text-secondary">
            In diesem Zeitraum wird die aktuelle Lösung weiter betreut. Updates der Umgebung stehen automatisch bereit
            und können selbstständig installiert werden.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-line bg-surface p-5">
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Automatische Umgebungs-Updates</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">
                Neue Updates für die Umgebung werden direkt zur Verfügung gestellt und können vom Team
                selbstständig installiert werden.
              </p>
            </article>

            <article className="rounded-xl border border-line bg-surface p-5">
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Direkter Support</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">
                Ein gemeinsamer Kontaktpunkt sorgt dafür, dass Fragen, Meldungen und Lösungen schnell
                koordiniert werden können.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title="Mehr Projekte oder ein Team?"
        text="Mit dem Cloud-Plan arbeitet das gesamte Team auf demselben Projektstand. Wissen, Zugänge und nächste Schritte bleiben für Berechtigte verfügbar."
        primary={{ label: 'Cloud-Plan ansehen', to: '/cloud' }}
        secondary={{ label: 'Alle Pläne vergleichen', to: '/preise' }}
      />
    </>
  )
}
