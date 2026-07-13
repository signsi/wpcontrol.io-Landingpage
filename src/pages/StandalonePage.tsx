import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'

const features = [
  {
    title: 'Lokale Entwicklungsumgebung',
    detail: 'WordPress-Projekte lokal starten – kein Docker, kein NGINX, kein Apache. WPorbit übernimmt die gesamte Laufzeitumgebung. PHP-Version, Datenbank und Konfiguration sind pro Projekt definiert und reproduzierbar.',
  },
  {
    title: 'Vault für Zugangsdaten',
    detail: 'SSH-Keys, WP-Admin-Logins, Datenbank-Credentials und API-Tokens liegen verschlüsselt im lokalen Vault. Kein Copy-Paste in Chats, keine Zugangsdaten in Repositories. Alle Daten werden DSGVO-konform verschlüsselt und in der Schweiz gehostet.',
  },
  {
    title: 'Deploy und Pull Prozesse',
    detail: 'Änderungen gezielt auf Live-Umgebungen deployen oder von dort pullen. WPorbit funktioniert mit jedem Anbieter, der Pipelines unterstützt – GitLab ist der erste Anwendungsfall, GitHub funktioniert analog. Für GitLab bieten wir vorgefertigte Vorlagen an.',
  },
  {
    title: 'Import direkt aus Live-Installationen',
    detail: 'SSH-Zugang genügt, um bestehende WordPress-Installationen zu importieren – inklusive Theme-Repo, wo vorhanden. Kein manuelles Backup und Wiederherstellen.',
  },
]

export default function StandalonePage() {
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="features" />
      <main className="pt-[3.25rem]">

        {/* Hero */}
        <section className="px-6 pt-16 pb-14 border-b border-line">
          <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            Standalone
          </p>
          <h1 className="font-heading font-extrabold text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.035em] mb-4 max-w-2xl">
            Lokal entwickeln.<br />Ohne Overhead.
          </h1>
          <p className="text-secondary leading-[1.75] text-[1rem] max-w-[48ch] mb-2">
            Für Agenturen und Entwickler, die WordPress-Projekte lokal verwalten wollen – ohne Cloud-Abhängigkeit.
          </p>
          <div className="flex items-end gap-2 leading-none mb-8 mt-5">
            <span className="font-heading font-extrabold text-[2.8rem] tracking-[-0.03em] text-primary leading-none">ab 40</span>
            <span className="text-secondary text-[0.88rem] leading-tight mb-1.5">CHF / Person / Monat<br /><span className="text-tertiary text-[0.78rem]">Max. 3 Projekte</span></span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/#waitlist" className="bg-accent text-on-accent font-bold text-sm px-5 py-3 rounded-[0.3rem] hover:opacity-90 transition-opacity">
              Early Access sichern
            </Link>
            <Link to="/#preise" className="border border-line text-secondary text-sm px-5 py-3 rounded-[0.3rem] hover:text-primary hover:border-secondary/60 transition-colors">
              Alle Pläne vergleichen
            </Link>
          </div>
        </section>

        {/* Features */}
        {features.map((f, i) => (
          <section key={f.title} className="px-6 py-14 border-b border-line last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 items-start max-w-4xl">
              <div>
                <p className="font-heading font-bold text-[0.62rem] uppercase tracking-[0.13em] text-tertiary mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-heading font-bold text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.2] tracking-[-0.02em] text-primary">
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
            <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
              Zeitplan
            </p>
            <h2 className="font-heading font-extrabold text-[clamp(1.5rem,3vw,2rem)] leading-[1.12] tracking-[-0.025em] mb-4 max-w-[30ch]">
              Wechsel auf Standalone bis Ende 2026
            </h2>
            <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[60ch] mb-8">
              Der operative Wechsel auf WPorbit Standalone ist bis Ende 2026 geplant.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article className="border border-line rounded-xl p-5 bg-base">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-tertiary mb-2">Bis August 2026</p>
                <h3 className="font-heading font-bold text-[1rem] text-primary mb-2">Vorbereitung</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Bestand aufnehmen, Prioritäten definieren und Team auf den Wechsel vorbereiten.
                </p>
              </article>

              <article className="border border-accent/30 rounded-xl p-5 bg-accent/10">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-accent mb-2">Ab September 2026</p>
                <h3 className="font-heading font-bold text-[1rem] text-primary mb-2">Team-Testphase</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Neue Standalone-Version im Team testen, Feedback aufnehmen und iterativ entwickeln.
                </p>
              </article>

              <article className="border border-line rounded-xl p-5 bg-base">
                <p className="text-[0.66rem] uppercase tracking-[0.12em] text-tertiary mb-2">Ende 2026</p>
                <h3 className="font-heading font-bold text-[1rem] text-primary mb-2">Wechsel abgeschlossen</h3>
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
            <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
              Übergangsphase
            </p>
            <h2 className="font-heading font-extrabold text-[clamp(1.5rem,3vw,2rem)] leading-[1.12] tracking-[-0.025em] mb-4 max-w-[36ch]">
              Betreuung der aktuellen CLI-Lösung bis zum Wechsel
            </h2>
            <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[62ch] mb-8">
              In diesem Zeitraum wird die aktuelle Lösung weiter betreut. Updates der Umgebung stehen automatisch bereit
              und können selbstständig installiert werden.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="border border-line rounded-xl p-5 bg-surface">
                <h3 className="font-heading font-bold text-[1rem] text-primary mb-2">Automatische Umgebungs-Updates</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Neue Updates für die Umgebung werden direkt zur Verfügung gestellt und können vom Team
                  selbstständig installiert werden.
                </p>
              </article>

              <article className="border border-line rounded-xl p-5 bg-surface">
                <h3 className="font-heading font-bold text-[1rem] text-primary mb-2">Gemeinsamer Support-Channel</h3>
                <p className="text-secondary text-[0.86rem] leading-[1.65]">
                  Für Support und Bug-Fixing richten wir einen gemeinsamen Channel ein, damit Fragen,
                  Meldungen und Lösungen schnell koordiniert werden können.
                </p>
              </article>

            </div>
          </div>
        </section>

        {/* Compare nudge */}
        <section className="px-6 py-20 bg-surface border-t border-line text-center">
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.12] tracking-[-0.025em] mb-3 max-w-[26ch] mx-auto">
            Mehr Projekte oder ein Team?
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[42ch] mx-auto mb-7">
            Mit dem Cloud-Plan bekommt das gesamte Team Zugang zum Portal – inkl. Monitoring, Update-Planung und Vault-Synchronisation.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/cloud" className="bg-accent text-on-accent font-bold text-sm px-5 py-3 rounded-[0.3rem] hover:opacity-90 transition-opacity">
              Cloud-Plan ansehen
            </Link>
            <Link to="/" className="border border-line text-secondary text-sm px-5 py-3 rounded-[0.3rem] hover:text-primary hover:border-secondary/60 transition-colors">
              Zur Startseite
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
