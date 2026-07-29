import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

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

export default function StandalonePage() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="features" />
      <main className="pt-[3.25rem]">

        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <p className="font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            Standalone
          </p>
          <h1 className="font-heading font-semibold text-[clamp(2.1rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.035em] mb-4 max-w-2xl">
            Professionell arbeiten.<br />Einfach starten.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[48ch] mb-2">
            Für Agenturen, die WordPress-Projekte zuverlässig organisieren und unabhängig von der Cloud bearbeiten wollen.
          </p>
          <div className="flex items-end gap-2 leading-none mb-8 mt-5">
            <span className="font-heading font-semibold text-[2.8rem] tracking-[-0.03em] text-primary leading-none">ab 290</span>
            <span className="text-secondary text-[0.88rem] leading-tight mb-1.5">CHF / Person / Monat<br /><span className="text-tertiary text-[0.78rem]">Max. 3 Projekte</span></span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#demo" className="gradient-solar rounded-full px-5 py-3 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              10 Tage gratis testen
            </Link>
            <Link to="/#preise" className="border border-line text-secondary text-sm px-5 py-3 rounded-full hover:text-primary hover:border-secondary/60 transition-colors">
              Alle Pläne vergleichen
            </Link>
          </div>
        </section>

        {/* Features */}
        {features.map((f, i) => (
          <section key={f.title} className="px-6 py-14 border-b border-line last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 items-start max-w-4xl">
              <div>
                <p className="font-bold text-[0.62rem] uppercase tracking-[0.13em] text-tertiary mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-heading font-semibold text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.2] tracking-[-0.02em] text-primary">
                  {f.title}
                </h2>
              </div>
              <p className="text-secondary text-[0.95rem] leading-[1.78] lg:pt-8">
                {f.detail}
              </p>
            </div>
          </section>
        ))}

        {/* Timeline */}
        <section className="px-6 py-14 border-b border-line bg-surface">
          <div className="max-w-4xl">
            <p className="font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
              Zeitplan
            </p>
            <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-4 max-w-[30ch]">
              Wechsel auf Standalone bis Ende 2026
            </h2>
            <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[60ch] mb-8">
              Der operative Wechsel auf WPorbit Standalone ist bis Ende 2026 geplant.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article className="border border-line rounded-xl p-5 bg-base">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-tertiary mb-2">Bis August 2026</p>
                <h3 className="font-heading font-semibold text-[1rem] text-primary mb-2">Vorbereitung</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Bestand aufnehmen, Prioritäten definieren und Team auf den Wechsel vorbereiten.
                </p>
              </article>

              <article className="border border-accent/30 rounded-xl p-5 bg-accent/10">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-accent mb-2">Ab September 2026</p>
                <h3 className="font-heading font-semibold text-[1rem] text-primary mb-2">Team-Testphase</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Neue Standalone-Version im Team testen, Feedback aufnehmen und iterativ entwickeln.
                </p>
              </article>

              <article className="border border-line rounded-xl p-5 bg-base">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-tertiary mb-2">Ende 2026</p>
                <h3 className="font-heading font-semibold text-[1rem] text-primary mb-2">Wechsel abgeschlossen</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Umstieg auf die Standalone-Version als neue Basis im laufenden Betrieb.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Transition phase */}
        <section className="px-6 py-14 border-y border-line bg-raised" id="uebergangsphase">
          <div className="max-w-4xl mx-auto">
            <p className="font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
              Übergangsphase
            </p>
            <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-4 max-w-[36ch]">
              Die bisherige Lösung bleibt bis zum Wechsel betreut
            </h2>
            <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[62ch] mb-8">
              In diesem Zeitraum wird die aktuelle Lösung weiter betreut. Updates der Umgebung stehen automatisch bereit
              und können selbstständig installiert werden.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="border border-line rounded-xl p-5 bg-surface">
                <h3 className="font-heading font-semibold text-[1rem] text-primary mb-2">Automatische Umgebungs-Updates</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Neue Updates für die Umgebung werden direkt zur Verfügung gestellt und können vom Team
                  selbstständig installiert werden.
                </p>
              </article>

              <article className="border border-line rounded-xl p-5 bg-surface">
                <h3 className="font-heading font-semibold text-[1rem] text-primary mb-2">Direkter Support</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Ein gemeinsamer Kontaktpunkt sorgt dafür, dass Fragen, Meldungen und Lösungen schnell
                  koordiniert werden können.
                </p>
              </article>

            </div>
          </div>
        </section>

        {/* Compare nudge */}
        <section className="px-6 py-20 bg-surface border-t border-line text-center">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-3 max-w-[26ch] mx-auto">
            Mehr Projekte oder ein Team?
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[42ch] mx-auto mb-7">
            Mit dem Cloud-Plan arbeitet das gesamte Team auf demselben Projektstand. Wissen, Zugänge und nächste Schritte bleiben für Berechtigte verfügbar.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/cloud" className="gradient-solar rounded-full px-5 py-3 text-sm font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              Cloud-Plan ansehen
            </Link>
            <Link to="/" className="border border-line text-secondary text-sm px-5 py-3 rounded-full hover:text-primary hover:border-secondary/60 transition-colors">
              Zur Startseite
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
