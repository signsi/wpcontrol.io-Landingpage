export interface FeatureCard {
  dot: 'solar' | 'orbit'
  title: string
  text: string
}

export const featureCards: FeatureCard[] = [
  {
    dot: 'orbit',
    title: 'Startklar ohne Einrichtung',
    text: 'WPorbit starten, Projekt öffnen und direkt loslegen. Die technische Einrichtung übernimmt WPorbit.',
  },
  {
    dot: 'orbit',
    title: 'Änderungen sicher veröffentlichen',
    text: 'Websites online aktualisieren oder den aktuellen Stand zurückholen, ohne manuelle Zwischenschritte.',
  },
  {
    dot: 'solar',
    title: 'Bestehende Websites übernehmen',
    text: 'Die vorhandenen Zugangsdaten genügen. WPorbit übernimmt die Website und die zugehörigen Projektdateien.',
  },
  {
    dot: 'orbit',
    title: 'Zugänge sicher verwahrt',
    text: 'Passwörter, Schlüssel und weitere Zugangsdaten verschlüsselt pro Projekt ablegen. Kein Teilen über Chat oder E-Mail.',
  },
  {
    dot: 'orbit',
    title: 'Alle Projekte im Blick',
    text: 'Projekte, Verbindungen und aktueller Stand sind in einer zentralen Übersicht sofort verfügbar.',
  },
  {
    dot: 'solar',
    title: 'Hilfe statt Fehlersuche',
    text: 'Aus dem Agenturalltag entwickelt: WPorbit erkennt bekannte Stolpersteine früh und erklärt verständlich, was zu tun ist.',
  },
]

export const compareRows = [
  { criterion: 'Sofort startklar', wporbit: 'Technische Einrichtung inklusive', localwp: 'Ja', studio: 'Ja' },
  { criterion: 'Bestehende Websites übernehmen', wporbit: 'Website und Projektdateien', localwp: 'Abhängig vom Hosting', studio: 'Manuelle Übernahme' },
  { criterion: 'Änderungen veröffentlichen', wporbit: 'Direkt aus WPorbit', localwp: 'Abhängig vom Hosting', studio: 'Für WordPress.com ausgelegt' },
  { criterion: 'Zugänge sicher verwahrt', wporbit: 'Verschlüsselt pro Projekt', localwp: 'Nicht integriert', studio: 'Nicht integriert' },
  { criterion: 'Freie Wahl des Hostings', wporbit: 'Ja', localwp: 'Starke Anbindung an WP Engine', studio: 'Starke Anbindung an WordPress.com und Pressable' },
  { criterion: 'Ideal für', wporbit: 'Agenturen mit verschiedenen Hosting-Anbietern', localwp: 'Einzelne und WP-Engine-Teams', studio: 'WordPress.com-Teams' },
]

export const faqItems = [
  {
    q: 'Kann ich WPorbit auch ohne Cloud nutzen?',
    a: 'Ja. WPorbit Standalone funktioniert unabhängig von der Cloud. Du bearbeitest Projekte, verwahrst Zugänge sicher und veröffentlichst Änderungen direkt aus der Anwendung.',
  },
  {
    q: 'Müssen wir unseren Hosting-Anbieter wechseln?',
    a: 'Nein. WPorbit ist für Agenturen gebaut, die mit unterschiedlichen Hosting-Anbietern arbeiten. Du bleibst bei der Lösung, die zu deiner Agentur und deinen Kunden passt.',
  },
  {
    q: 'Was ist heute in Standalone enthalten?',
    a: 'Das Starten und Organisieren von Projekten, die Übernahme bestehender Websites, das sichere Veröffentlichen von Änderungen und die verschlüsselte Ablage von Zugangsdaten. Cloud-Funktionen werden separat entwickelt.',
  },
  {
    q: 'Wie werden Änderungen veröffentlicht?',
    a: 'WPorbit prüft die Voraussetzungen und startet die Veröffentlichung ohne manuelle Zwischenschritte. Bestehende automatisierte Abläufe können weiterverwendet werden. Zum Start stehen dafür Vorlagen für GitLab bereit; GitHub lässt sich nach demselben Prinzip anbinden.',
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
