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
    dot: 'orbit',
    title: 'Deploy und Pull',
    text: 'Änderungen gezielt ausrollen oder bestehende Inhalte zurück in die lokale Umgebung holen.',
  },
  {
    dot: 'solar',
    title: 'Import aus Live',
    text: 'Import direkt aus deiner Live-Installation: SSH-Zugang genügt, inklusive Theme-Repo, wo vorhanden.',
  },
  {
    dot: 'orbit',
    title: 'Lokaler Vault',
    text: 'SSH-Keys, Logins und API-Tokens verschlüsselt pro Projekt verwalten. Kein Copy-Paste in Chats.',
  },
  {
    dot: 'orbit',
    title: 'Zentrale Projektübersicht',
    text: 'Alle lokalen WordPress-Projekte, Umgebungen und Verbindungen in einer übersichtlichen Oberfläche im Blick behalten.',
  },
  {
    dot: 'solar',
    title: 'Aus dem Agenturalltag entwickelt',
    text: 'Bekannte Stolpersteine werden früh abgefangen. Prüfungen, Erklärungen und Hilfestellungen begleiten dich direkt im jeweiligen Arbeitsschritt.',
  },
]

export const compareRows = [
  { criterion: 'Lokale Entwicklung', wporbit: 'Integriert', localwp: 'Ja', studio: 'Ja' },
  { criterion: 'Setup ohne Docker, NGINX oder Apache', wporbit: 'Integriert', localwp: 'Integriert', studio: 'Integriert' },
  { criterion: 'Import aus Live-Installationen', wporbit: 'Per SSH, inklusive Theme-Repo', localwp: 'Hosterabhängig', studio: 'Manueller Import' },
  { criterion: 'Deploy und Pull', wporbit: 'Direkt im lokalen Workflow', localwp: 'Abhängig vom Hosting', studio: 'WordPress.com-Workflow' },
  { criterion: 'Lokaler Vault', wporbit: 'Zugänge verschlüsselt pro Projekt', localwp: 'Nicht integriert', studio: 'Nicht integriert' },
  { criterion: 'Hosting-Flexibilität', wporbit: 'Freie Wahl des Hostings', localwp: 'Starke Anbindung an WP Engine', studio: 'Starke Anbindung an WordPress.com & Pressable' },
  { criterion: 'Ideal für', wporbit: 'Agenturen mit eigenen Hosting-Workflows', localwp: 'Einzelentwickler und WP-Engine-Teams', studio: 'WordPress.com-Ökosystem' },
]

export const faqItems = [
  {
    q: 'Kann ich WPorbit für lokale Entwicklung nutzen, auch ohne Cloud-Sync?',
    a: 'Ja. WPorbit Standalone funktioniert unabhängig von der Cloud. Du entwickelst lokal, verwaltest Zugänge im lokalen Vault und steuerst Deploy- und Pull-Prozesse direkt aus der App.',
  },
  {
    q: 'Brauchen wir einen bestimmten Hoster, um WPorbit einzusetzen?',
    a: 'Nein. WPorbit ist für Agenturen gebaut, die mit unterschiedlichen Hostings arbeiten. Es gibt keinen Plattform-Lock-in.',
  },
  {
    q: 'Was ist heute in Standalone enthalten?',
    a: 'Lokale WordPress-Umgebungen, Import aus bestehenden Live-Installationen, Deploy- und Pull-Prozesse sowie ein verschlüsselter lokaler Vault. Cloud-Funktionen werden separat entwickelt.',
  },
  {
    q: 'Welche Integrationen sind zum Start verfügbar?',
    a: 'WPorbit funktioniert grundsätzlich mit jedem Anbieter, der Pipelines unterstützt. GitLab ist der erste Anwendungsfall, GitHub funktioniert analog. Die Pipelines liegen in der Verantwortung der Agentur; für GitLab bieten wir vorgefertigte Vorlagen an.',
  },
  {
    q: 'Was passiert nach der Demo-Anmeldung?',
    a: 'Du erhältst den Download für die Standalone-Demo und kannst ein Projekt zehn Tage lang mit dem verfügbaren Funktionsumfang testen.',
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
