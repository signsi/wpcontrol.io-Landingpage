export interface FeatureCard {
  dot: 'solar' | 'orbit'
  title: string
  text: string
}

export const featureCards: FeatureCard[] = [
  {
    dot: 'orbit',
    title: 'Lokale Entwicklung',
    text: 'WordPress-Umgebungen lokal starten, ohne Docker, NGINX oder Apache. Bereit in Sekunden.',
  },
  {
    dot: 'solar',
    title: 'Staging und Preview',
    text: 'Änderungen gegen Staging testen und Vorschau-Links mit Kunden oder Kollegen teilen.',
  },
  {
    dot: 'orbit',
    title: 'Deploy via GitLab',
    text: 'WPorbit funktioniert mit jedem Anbieter, der Pipelines unterstützt. GitLab ist der erste Anwendungsfall, GitHub funktioniert analog.',
  },
  {
    dot: 'solar',
    title: 'Import / Migration',
    text: 'Import direkt aus deiner Live-Installation: SSH-Zugang genügt, inklusive Theme-Repo, wo vorhanden.',
  },
  {
    dot: 'orbit',
    title: 'Monitoring und Alerts',
    text: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert und melden frühzeitig.',
  },
  {
    dot: 'solar',
    title: 'Vault und Zugänge',
    text: 'Alle Zugangsdaten werden in der Schweiz gehostet und DSGVO-konform verschlüsselt. Kein Copy-Paste in Chats.',
  },
  {
    dot: 'orbit',
    title: 'Updates und Wartung',
    text: 'Core-, Plugin- und Theme-Updates mit Staging-Test und Rollback auf Knopfdruck.',
  },
]

export const compareRows = [
  { criterion: 'Lokale Entwicklung', wporbit: 'Integriert', localwp: 'Ja', studio: 'Ja' },
  { criterion: 'Preview & Synchronisation', wporbit: 'Integriert', localwp: 'Ja', studio: 'Ja' },
  { criterion: 'Hosting-Flexibilität', wporbit: 'Freie Wahl des Hostings', localwp: 'Starke Anbindung an WP Engine', studio: 'Starke Anbindung an WordPress.com & Pressable' },
  { criterion: 'Kunden- & Projektverwaltung', wporbit: 'Zentral an einem Ort', localwp: 'Nicht ausgelegt', studio: 'Nicht ausgelegt' },
  { criterion: 'Team-Vault & Zugänge', wporbit: 'Geteilter Vault für das gesamte Team', localwp: 'Nicht integriert', studio: 'Nicht integriert' },
  { criterion: 'Agentur-Workflows', wporbit: 'Entwicklung, Deployment, Wartung und Betrieb in einer Plattform', localwp: 'Fokus auf Entwicklung', studio: 'Fokus auf Entwicklung' },
  { criterion: 'AI-Unterstützung', wporbit: 'Claude, ChatGPT und Copilot via VS Code nutzbar; native UI in Entwicklung', localwp: 'Nicht integriert', studio: 'Integriert' },
  { criterion: 'Zusammenarbeit im Team', wporbit: 'Gemeinsame Standards, Zugänge und Projekte', localwp: 'Entwickler-Workflows', studio: 'Entwickler-Workflows' },
  { criterion: 'Ideal für', wporbit: 'Agenturen und WordPress-Teams', localwp: 'Einzelentwickler & Entwicklerteams', studio: 'Entwickler im WordPress.com-Ökosystem' },
]

export const faqItems = [
  {
    q: 'Kann ich WPorbit für lokale Entwicklung nutzen, auch ohne Cloud-Sync?',
    a: 'Ja. WPorbit lässt sich als Standalone starten. Du baust lokal, verwaltest Zugänge im Vault und nutzt Staging-Prozesse. Cloud-Sync aktivierst du später, wenn das Team wächst.',
  },
  {
    q: 'Brauchen wir einen bestimmten Hoster, um WPorbit einzusetzen?',
    a: 'Nein. WPorbit ist für Agenturen gebaut, die mit unterschiedlichen Hostings arbeiten. Es gibt keinen Plattform-Lock-in.',
  },
  {
    q: 'Wie läuft das WordPress-Update-Management ab?',
    a: 'Updates werden gegen eine Staging-Umgebung getestet. Bei Problemen ist der Rollback direkt aus WPorbit möglich, ohne manuellen Aufwand.',
  },
  {
    q: 'Welche Integrationen sind zum Start verfügbar?',
    a: 'WPorbit funktioniert grundsätzlich mit jedem Anbieter, der Pipelines unterstützt. GitLab ist der erste Anwendungsfall, GitHub funktioniert analog. Die Pipelines liegen in der Verantwortung der Agentur; für GitLab bieten wir vorgefertigte Vorlagen an.',
  },
  {
    q: 'Was passiert nach der Early-Access-Anmeldung?',
    a: 'Du erhältst sofort die ROI- und Migrations-Checkliste und kannst Feature-Prioritäten aktiv mitgestalten.',
  },
]

export const hosters = [
  { name: 'cyon',       url: 'https://www.cyon.ch',          file: 'logo_cyon.svg' },
  { name: 'Hostinger',  url: 'https://www.hostinger.com',     file: 'logo_hostinger.svg' },
  { name: 'Hostpoint',  url: 'https://www.hostpoint.ch',      file: 'logo_hostpoint.svg' },
  { name: 'Infomaniak', url: 'https://www.infomaniak.com',    file: 'logo_infomaniak.svg' },
  { name: 'Kinsta',     url: 'https://kinsta.com',            file: 'logo_kinsta.svg' },
  { name: 'Metanet',    url: 'https://www.metanet.ch',        file: 'logo_metanet.svg' },
  { name: 'Raidboxes',  url: 'https://raidboxes.io',          file: 'logo_raidboxes.svg' },
]
