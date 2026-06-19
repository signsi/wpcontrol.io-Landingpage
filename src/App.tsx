import './App.css'

function App() {
  const scrollItems = [
    'Lokale Entwicklungsumgebung',
    'Staging und Preview',
    'Deploy via GitLab',
    'Vault fuer alle Zugaenge',
    'Monitoring und Alerts',
    'WordPress-Updates mit Rollback',
    'Wartungsplanung im Team',
    'Hoster-unabhaengig',
  ]

  const bentoCards = [
    {
      title: 'Von lokal bis live',
      text: 'Lokale Umgebung, Staging und Deployment laufen als reproduzierbare Prozesse im selben Cockpit.',
      size: 'lg',
    },
    {
      title: 'Updates mit Sicherheitsnetz',
      text: 'Core-, Plugin- und Theme-Updates werden gegen Staging getestet. Rollback jederzeit moeglich.',
      size: 'sm',
    },
    {
      title: 'Vault integriert',
      text: 'Zugaenge liegen verschluesselt pro Projekt und sind sofort im Workflow verfuegbar.',
      size: 'sm',
    },
    {
      title: 'Monitoring und Cron-Checks',
      text: 'Uptime, Security, SEO und Performance werden automatisiert ueberwacht und melden fruehzeitig.',
      size: 'md',
    },
    {
      title: 'Team-Workspace',
      text: 'Websites, Zugaenge und Prozesse bleiben im Team synchron. Standalone oder via Cloud.',
      size: 'md',
    },
  ]

  const compareRows = [
    {
      criterion: 'Lokale Entwicklung und Staging',
      wphub: 'Integrierte lokale Umgebung, Staging-Prozesse und Preview. Kein Vendor-Lock.',
      localwp: 'Staerker auf lokale Entwicklung fokussiert, kein umfassendes Staging-Cockpit',
      studio: 'Entwicklungsumgebung mit Preview, weniger auf Agentur-Staging-Workflows ausgelegt',
    },
    {
      criterion: 'Hoster-Flexibilitaet',
      wphub: 'Fuer alle Hostings ausgelegt, keine Anbieterbindung',
      localwp: 'Stark lokal orientiert, begrenzte Prozessanbindung',
      studio: 'WordPress-oekosystemzentriert, weniger agenturspezifisch',
    },
    {
      criterion: 'Agentur-Prozesse im Alltag',
      wphub: 'Setup, Deploy, Pull, Updates und Wartungsplanung im Dashboard',
      localwp: 'Primaer lokale Entwicklungsumgebung',
      studio: 'Fokus auf Entwicklung statt operatives Agentur-Cockpit',
    },
    {
      criterion: 'Sicherheits- und Zugangsmodell',
      wphub: 'Verschluesselter Vault plus strukturierte Zugriffspfade',
      localwp: 'Kein gleichwertiges integriertes Vault-Betriebsmodell',
      studio: 'Kein gleiches Vault-zentriertes Agenturmodell',
    },
    {
      criterion: 'Team-Betrieb',
      wphub: 'Cloud-basierter Team-Sync und gemeinsame Standards',
      localwp: 'Kein vergleichbares Team-Sync-Cockpit fuer Agenturen',
      studio: 'Zusammenarbeit moeglich, aber weniger auf Multi-Projekt-Agenturfluss optimiert',
    },
  ]

  const faqItems = [
    {
      q: 'Kann ich WPHub fuer lokale Entwicklung nutzen, auch ohne Cloud-Sync?',
      a: 'Ja. WPHub laesst sich als Standalone starten. Du baust lokal, verwaltest Zugaenge im Vault und nutzt Staging-Prozesse. Cloud-Sync aktivierst du spaeter, wenn das Team waechst.',
    },
    {
      q: 'Brauchen wir einen bestimmten Hoster, um WPHub einzusetzen?',
      a: 'Nein. WPHub ist fuer Agenturen gebaut, die mit unterschiedlichen Hostings arbeiten. Es gibt keinen Plattform-Lock-in.',
    },
    {
      q: 'Wie laeuft das WordPress-Update-Management ab?',
      a: 'Updates werden gegen eine Staging-Umgebung getestet. Bei Problemen ist der Rollback direkt aus WPHub moeglich, ohne manuellen Aufwand.',
    },
    {
      q: 'Welche Integrationen sind zum Start verfuegbar?',
      a: 'Zum Start ist GitLab als Kernintegration vorgesehen, inklusive deployrelevanter Workflows und MTTR-orientierter Incident-Reaktion.',
    },
    {
      q: 'Was passiert nach der Early-Access-Anmeldung?',
      a: 'Du erhaeltst sofort die ROI- und Migrations-Checkliste und kannst Feature-Prioritaeten aktiv mitgestalten.',
    },
  ]

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            WP
          </span>
          <div>
            <p className="brand-title">WPHub</p>
            <p className="brand-sub">WordPress-Workspace fuer Agenturen</p>
          </div>
        </div>
        <nav className="topnav" aria-label="Seitenbereiche">
          <a href="#produkt">Produkt</a>
          <a href="#vergleich">Vergleich</a>
          <a href="#preise">Preise</a>
          <a href="#faq">FAQ</a>
          <a href="#waitlist" className="nav-cta">
            Early Access
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="waitlist">
          <div className="hero-copy">
            <p className="eyebrow">Fuer WordPress-Agenturen</p>
            <h1>Vom Setup bis zur Wartung. Ein Cockpit.</h1>
            <p className="hero-lead">
              WPHub verbindet lokale Entwicklung, Staging, Deployment, Monitoring und
              Wartungsplanung in einem Workspace. Hoster-unabhaengig, gebaut fuer Teams mit
              laufenden WordPress-Projekten.
            </p>

            <div className="hero-actions">
              <a href="#waitlist" className="primary-btn">
                Early Access sichern
              </a>
              <a href="#vergleich" className="ghost-btn">
                Direktvergleich ansehen
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="App Vorschau">
            <img
              src="https://developer.wordpress.com/wp-content/uploads/2025/08/studio-hero-image-v1.png"
              alt="App-Screen einer WordPress-Desktop-Oberflaeche"
            />
          </aside>
        </section>

        <section className="scroll-band" aria-label="Kernfaehigkeiten">
          <div className="scroll-track">
            {[...scrollItems, ...scrollItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section" id="produkt">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>Alles fuer WordPress-Agenturen. Ein Ort.</h2>
          </div>
          <div className="bento-grid">
            {bentoCards.map((card) => (
              <article key={card.title} className={`bento-card ${card.size}`}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section early-access-panel">
          <div>
            <p className="eyebrow">Early Access</p>
            <h2>Mitgestalten statt warten</h2>
            <p>
              Kein Countdown, keine kuenstliche Verknappung. Early Adopters liefern Input,
              priorisieren Features mit und erhalten sofort die ROI- und Migrations-Checkliste.
            </p>
          </div>
          <form className="waitlist-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email-secondary">Geschaeftliche Email</label>
            <input id="email-secondary" type="email" placeholder="team@agentur.ch" required />
            <label htmlFor="size-secondary">Teamgroesse</label>
            <select id="size-secondary" defaultValue="10-15">
              <option value="3-5">3-5 Personen</option>
              <option value="6-9">6-9 Personen</option>
              <option value="10-15">10-15 Personen</option>
              <option value="16+">16+ Personen</option>
            </select>
            <button type="submit">Checkliste + Early Access</button>
          </form>
        </section>

        <section className="section comparison" id="vergleich">
          <div className="section-head">
            <p className="eyebrow">Marktvergleich</p>
            <h2>WPHub vs. LocalWP vs. WordPress Studio</h2>
          </div>
          <div className="table-wrap" role="region" aria-label="Vergleichstabelle">
            <table>
              <thead>
                <tr>
                  <th>Kriterium</th>
                  <th>WPHub</th>
                  <th>LocalWP</th>
                  <th>WordPress Studio</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.criterion}>
                    <td>{row.criterion}</td>
                    <td>{row.wphub}</td>
                    <td>{row.localwp}</td>
                    <td>{row.studio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section pricing" id="preise">
          <div className="section-head">
            <p className="eyebrow">Pricing</p>
            <h2>Start ab 500 fuer 3 Personen</h2>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <p className="plan">Standalone</p>
              <p className="price">Individuell</p>
              <p className="price-note">Fuer Agenturen, die lokal starten wollen.</p>
              <ul>
                <li>Lokale Entwicklungsumgebung</li>
                <li>Vault fuer Zugangsdaten</li>
                <li>Deploy und Pull Prozesse</li>
              </ul>
            </article>
            <article className="price-card highlighted">
              <p className="plan">Team</p>
              <p className="price">ab 500</p>
              <p className="price-note">3 Personen, inkl. GitLab-gestuetzter Teamprozesse.</p>
              <ul>
                <li>Staging und Preview</li>
                <li>Monitoring und Benachrichtigungen</li>
                <li>Wartungsplanung im Dashboard</li>
              </ul>
            </article>
            <article className="price-card">
              <p className="plan">Cloud</p>
              <p className="price">Cloud only</p>
              <p className="price-note">Synchronisierte Teamarbeit ueber den WPHub-Cloudmodus.</p>
              <ul>
                <li>Zentraler Sync fuer Websites und Zugaenge</li>
                <li>Cron-basierte Qualitaets-Checks</li>
                <li>Skalierbar fuer mehrere Projektteams</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Was Teams vor dem Start wissen wollen</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section final-cta">
          <h2>Bring Ordnung in deinen WordPress-Alltag.</h2>
          <p>
            Sichere dir Early Access, erhalte sofort die ROI- und Migrations-Checkliste und
            gestalte die naechsten Prioritaeten aktiv mit.
          </p>
          <a href="#waitlist">Zur Early-Access-Anmeldung</a>
        </section>
      </main>

      <footer className="footer">
        <p>WPHub fuer Agenturen. Von lokal bis live. Hoster-unabhaengig.</p>
      </footer>
    </div>
  )
}

export default App
