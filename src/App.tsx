import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const scrollItems = [
    'Lokale Entwicklungsumgebung',
    'Staging und Preview',
    'Deploy via GitLab',
    'Vault für alle Zugänge',
    'Monitoring und Alerts',
    'WordPress-Updates mit Rollback',
    'Wartungsplanung im Team',
    'Hoster-unabhängig',
  ]

  const featureCards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M8 10l3 3-3 3" />
          <line x1="13" y1="16" x2="17" y2="16" />
        </svg>
      ),
      title: 'Lokale Entwicklung',
      text: 'WordPress-Umgebungen lokal starten, ohne Docker, NGINX oder Apache. Bereit in Sekunden.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      ),
      title: 'Staging und Preview',
      text: 'Änderungen gegen Staging testen und Vorschau-Links mit Kunden oder Kollegen teilen.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        </svg>
      ),
      title: 'Deploy via GitLab',
      text: 'Reproduzierbare Deployments direkt aus GitLab-Workflows. Weniger manuelle Schritte, weniger Fehler.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: 'Monitoring und Alerts',
      text: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert und melden frühzeitig.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: 'Vault und Zugänge',
      text: 'Alle Zugangsdaten verschlüsselt pro Projekt, direkt im Workflow verfügbar. Kein Copy-Paste in Chats.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      ),
      title: 'Updates und Wartung',
      text: 'Core-, Plugin- und Theme-Updates mit Staging-Test und Rollback auf Knopfdruck.',
    },
  ]

  const compareRows = [
    {
      criterion: 'Lokale Entwicklung und Staging',
      wphub: 'Integrierte lokale Umgebung, Staging-Prozesse und Preview. Kein Vendor-Lock.',
      localwp: 'Stärker auf lokale Entwicklung fokussiert, kein umfassendes Staging-Cockpit',
      studio: 'Entwicklungsumgebung mit Preview, weniger auf Agentur-Staging-Workflows ausgelegt',
    },
    {
      criterion: 'Hoster-Flexibilität',
      wphub: 'Fuer alle Hostings ausgelegt, keine Anbieterbindung',
      localwp: 'Stark lokal orientiert, begrenzte Prozessanbindung',
      studio: 'WordPress-ökosystemzentriert, weniger agenturspezifisch',
    },
    {
      criterion: 'Agentur-Prozesse im Alltag',
      wphub: 'Setup, Deploy, Pull, Updates und Wartungsplanung im Dashboard',
      localwp: 'Primär lokale Entwicklungsumgebung',
      studio: 'Fokus auf Entwicklung statt operatives Agentur-Cockpit',
    },
    {
      criterion: 'Sicherheits- und Zugangsmodell',
      wphub: 'Verschlüsselter Vault plus strukturierte Zugriffspfade',
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
      q: 'Kann ich WPHub für lokale Entwicklung nutzen, auch ohne Cloud-Sync?',
      a: 'Ja. WPHub lässt sich als Standalone starten. Du baust lokal, verwaltest Zugänge im Vault und nutzt Staging-Prozesse. Cloud-Sync aktivierst du später, wenn das Team wächst.',
    },
    {
      q: 'Brauchen wir einen bestimmten Hoster, um WPHub einzusetzen?',
      a: 'Nein. WPHub ist fuer Agenturen gebaut, die mit unterschiedlichen Hostings arbeiten. Es gibt keinen Plattform-Lock-in.',
    },
    {
      q: 'Wie läuft das WordPress-Update-Management ab?',
      a: 'Updates werden gegen eine Staging-Umgebung getestet. Bei Problemen ist der Rollback direkt aus WPHub moeglich, ohne manuellen Aufwand.',
    },
    {
      q: 'Welche Integrationen sind zum Start verfuegbar?',
      a: 'Zum Start ist GitLab als Kernintegration vorgesehen, inklusive deployrelevanter Workflows und MTTR-orientierter Incident-Reaktion.',
    },
    {
      q: 'Was passiert nach der Early-Access-Anmeldung?',
      a: 'Du erhältst sofort die ROI- und Migrations-Checkliste und kannst Feature-Prioritäten aktiv mitgestalten.',
    },
  ]

  const [activeShowcase, setActiveShowcase] = useState(0)
  const showcaseItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = showcaseItemRefs.current[activeShowcase]
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!el || !thumb || !track) return
    const trackRect = track.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    thumb.style.top = `${elRect.top - trackRect.top}px`
    thumb.style.height = `${elRect.height}px`
  }, [activeShowcase])

  const showcaseFeatures = [
    {
      title: 'Lokale Entwicklung ohne Abhängigkeiten',
      text: 'Starte WordPress-Projekte in Sekunden lokal. Kein Docker, kein NGINX, kein Apache. WPHub übernimmt die Umgebung, du startest sofort.',
      visual: (
        <div className="sv-panel sv-terminal">
          <div className="sv-winbar">
            <span className="sv-dot" /><span className="sv-dot" /><span className="sv-dot" />
            <span className="sv-wintitle">wphub — zsh</span>
          </div>
          <div className="sv-term-body">
            <p><span className="sv-prompt">$</span> wphub env:start mein-projekt</p>
            <p className="sv-out">→ PHP 8.2 konfiguriert</p>
            <p className="sv-out">→ WordPress 6.5 installiert</p>
            <p className="sv-ok">✓ http://mein-projekt.local</p>
            <p><span className="sv-prompt">$</span><span className="sv-cursor" /></p>
          </div>
        </div>
      ),
    },
    {
      title: 'Staging und Preview-Links',
      text: 'Teste Änderungen vor dem Live-Gang in einer isolierten Staging-Umgebung. Teile Vorschau-Links direkt mit Kunden, ohne etwas zu veröffentlichen.',
      visual: (
        <div className="sv-panel sv-browser">
          <div className="sv-winbar">
            <span className="sv-dot" /><span className="sv-dot" /><span className="sv-dot" />
            <div className="sv-urlbar">preview.wphub.io/redesign-2024</div>
          </div>
          <div className="sv-browser-body">
            <div className="sv-page-hero" />
            <div className="sv-page-content">
              <div className="sv-pline lg" />
              <div className="sv-pline md" />
              <div className="sv-pline sm" />
            </div>
          </div>
          <div className="sv-share-pill">🔗 Link kopiert</div>
        </div>
      ),
    },
    {
      title: 'Automatischer Deploy via GitLab',
      text: 'Verbinde dein Repository mit WPHub und deploye direkt aus GitLab-Workflows. Reproduzierbar, ohne manuelle FTP-Uploads oder SSH-Befehle.',
      visual: (
        <div className="sv-panel sv-deploy">
          <div className="sv-pipeline">
            <div className="sv-pipe-stage done"><div className="sv-pipe-dot" /><span>Commit</span></div>
            <div className="sv-pipe-conn done" />
            <div className="sv-pipe-stage done"><div className="sv-pipe-dot" /><span>Build</span></div>
            <div className="sv-pipe-conn done" />
            <div className="sv-pipe-stage active"><div className="sv-pipe-dot" /><span>Deploy</span></div>
            <div className="sv-pipe-conn pending" />
            <div className="sv-pipe-stage pending"><div className="sv-pipe-dot" /><span>Live</span></div>
          </div>
          <div className="sv-deploy-log">
            <p className="sv-log-line">✓ Tests bestanden (42/42)</p>
            <p className="sv-log-run">↻ Deploying to production...</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Monitoring und automatische Alerts',
      text: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert für alle deine Sites. Probleme werden gemeldet, bevor Kunden sie bemerken.',
      visual: (
        <div className="sv-panel sv-monitor">
          <p className="sv-panel-title">Site-Status</p>
          <div className="sv-chart">
            <svg viewBox="0 0 260 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,50 L40,44 L80,46 L100,32 L130,35 L160,20 L190,22 L220,12 L260,14" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M0,50 L40,44 L80,46 L100,32 L130,35 L160,20 L190,22 L220,12 L260,14 L260,60 L0,60Z" fill="var(--accent)" fillOpacity="0.08"/>
            </svg>
          </div>
          <div className="sv-status-list">
            <div className="sv-status-row"><span className="sv-dot-green" />Uptime<strong>99.98 %</strong></div>
            <div className="sv-status-row"><span className="sv-dot-green" />Security<strong>Keine Issues</strong></div>
            <div className="sv-status-row"><span className="sv-dot-amber" />Performance<strong>82 / 100</strong></div>
          </div>
        </div>
      ),
    },
    {
      title: 'Updates mit Staging und Rollback',
      text: 'Core-, Plugin- und Theme-Updates werden zuerst gegen Staging getestet. Bei Freigabe rollst du sie auf alle Sites aus. Rollback jederzeit möglich.',
      visual: (
        <div className="sv-panel sv-updates">
          <p className="sv-panel-title">Ausstehende Updates</p>
          {[
            { name: 'WP Core', ver: '6.4 → 6.5', status: 'ok' },
            { name: 'Yoast SEO', ver: '21.5 → 22.0', status: 'ok' },
            { name: 'ACF Pro', ver: '6.1 → 6.2', status: 'testing' },
          ].map((u) => (
            <div key={u.name} className="sv-update-row">
              <span className="sv-update-name">{u.name}</span>
              <span className="sv-update-ver">{u.ver}</span>
              <span className={`sv-update-badge sv-badge-${u.status}`}>
                {u.status === 'ok' ? 'Staging ✓' : 'Testing…'}
              </span>
            </div>
          ))}
          <button className="sv-deploy-btn">Alle deployen →</button>
        </div>
      ),
    },
  ]

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            WP
          </span>
          <p className="brand-title">WPHub</p>
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
            <p className="eyebrow">Für WordPress-Agenturen</p>
            <h1>Vom Setup bis zur Wartung. Ein Cockpit.</h1>
            <p className="hero-lead">
              WPHub verbindet lokale Entwicklung, Staging, Deployment, Monitoring und
              Wartungsplanung in einem Workspace. Hoster-unabhängig, gebaut für Teams mit
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
              alt="App-Screen einer WordPress-Desktop-Oberfläche"
            />
          </aside>
        </section>

        <section className="scroll-band" aria-label="Kernfähigkeiten">
          <div className="scroll-track">
            {[...scrollItems, ...scrollItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section" id="produkt">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>Du entwickelst. WPHub erledigt den Rest.</h2>
            <p className="section-lead">
              Vom lokalen Setup bis zur automatisierten Wartung: alle Prozesse, die
              WordPress-Agenturen täglich brauchen.
            </p>
          </div>
          <div className="feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card">
                <div className="feature-card-icon">{card.icon}</div>
                <p className="feature-card-title">{card.title}</p>
                <p className="feature-card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section sc-section" id="detail">
          <div className="sc-inner">
            <div className="sc-left">
              <div className="sc-tabs" ref={trackRef}>
                <div className="sc-track-line">
                  <div className="sc-track-thumb" ref={thumbRef} />
                </div>
                <div className="sc-items">
                  {showcaseFeatures.map((f, i) => (
                    <div
                      key={f.title}
                      ref={(el) => { showcaseItemRefs.current[i] = el }}
                      className={`sc-item${i === activeShowcase ? ' active' : ''}`}
                      onClick={() => setActiveShowcase(i)}
                    >
                      <p className="sc-item-title">{f.title}</p>
                      {i === activeShowcase && <p className="sc-item-text">{f.text}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sc-right">
              <div className="sc-visual">
                {showcaseFeatures[activeShowcase].visual}
              </div>
            </div>
          </div>
        </section>

        <section className="section early-access-panel">
          <div>
            <p className="eyebrow">Early Access</p>
            <h2>Mitgestalten statt warten</h2>
            <p>
              Kein Countdown, keine künstliche Verknappung. Early Adopters liefern Input,
              priorisieren Features mit und erhalten sofort die ROI- und Migrations-Checkliste.
            </p>
          </div>
          <form className="waitlist-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email-secondary">Geschäftliche Email</label>
            <input id="email-secondary" type="email" placeholder="team@agentur.ch" required />
            <label htmlFor="size-secondary">Teamgröße</label>
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
            <h2>Start ab 500 für 3 Personen</h2>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <p className="plan">Standalone</p>
              <p className="price">Individuell</p>
              <p className="price-note">Für Agenturen, die lokal starten wollen.</p>
              <ul>
                <li>Lokale Entwicklungsumgebung</li>
                <li>Vault für Zugangsdaten</li>
                <li>Deploy und Pull Prozesse</li>
              </ul>
            </article>
            <article className="price-card highlighted">
              <p className="plan">Team</p>
              <p className="price">ab 500</p>
              <p className="price-note">3 Personen, inkl. GitLab-gestützter Teamprozesse.</p>
              <ul>
                <li>Staging und Preview</li>
                <li>Monitoring und Benachrichtigungen</li>
                <li>Wartungsplanung im Dashboard</li>
              </ul>
            </article>
            <article className="price-card">
              <p className="plan">Cloud</p>
              <p className="price">Cloud only</p>
              <p className="price-note">Synchronisierte Teamarbeit über den WPHub-Cloudmodus.</p>
              <ul>
                <li>Zentraler Sync für Websites und Zugänge</li>
                <li>Cron-basierte Qualitäts-Checks</li>
                <li>Skalierbar für mehrere Projektteams</li>
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
            gestalte die nächsten Prioritäten aktiv mit.
          </p>
          <a href="#waitlist">Zur Early-Access-Anmeldung</a>
        </section>
      </main>

      <footer className="footer">
        <p>WPHub für Agenturen. Von lokal bis live. Hoster-unabhängig.</p>
      </footer>
    </div>
  )
}

export default App
