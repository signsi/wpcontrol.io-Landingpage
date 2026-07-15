import type { JSX } from 'react'

export interface FeatureCard {
  icon: JSX.Element
  title: string
  text: string
}

export const featureCards: FeatureCard[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 10l3 3-3 3" /><line x1="13" y1="16" x2="17" y2="16" />
      </svg>
    ),
    title: 'Lokale Entwicklung',
    text: 'WordPress-Umgebungen lokal starten, ohne Docker, NGINX oder Apache. Bereit in Sekunden.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    title: 'Staging und Preview',
    text: 'Änderungen gegen Staging testen und Vorschau-Links mit Kunden oder Kollegen teilen.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
      </svg>
    ),
    title: 'Deploy via GitLab',
    text: 'WPorbit funktioniert mit jedem Anbieter, der Pipelines unterstützt. GitLab ist der erste Anwendungsfall, GitHub funktioniert analog.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="17 3 21 3 21 7" /><line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    title: 'Import / Migration',
    text: 'Import direkt aus deiner Live-Installation: SSH-Zugang genügt, inklusive Theme-Repo, wo vorhanden.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Monitoring und Alerts',
    text: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert und melden frühzeitig.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'Vault und Zugänge',
    text: 'Alle Zugangsdaten werden in der Schweiz gehostet und DSGVO-konform verschlüsselt. Kein Copy-Paste in Chats.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
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
