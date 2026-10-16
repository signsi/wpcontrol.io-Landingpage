/**
 * Zielgruppenseiten /fuer-freelancer und /fuer-agenturen. Nur Funktionen, die
 * ausgeliefert sind; Cloud-Funktionen sind als solche gekennzeichnet.
 */

export interface AudienceStep {
  time: string
  text: string
}

export interface AudienceFeature {
  title: string
  detail: string
}

export interface Audience {
  slug: 'fuer-freelancer' | 'fuer-agenturen'
  crumb: string
  seoTitle: string
  seoDescription: string
  kicker: string
  title: string
  lead: string
  dayTitle: string
  day: AudienceStep[]
  features: AudienceFeature[]
  planId: 'standalone' | 'cloud'
  planText: string
  /** Pfade unter /anleitungen, als `kategorie/slug`. */
  guides: string[]
  /** Blog-Slugs. */
  posts: string[]
}

export const freelancer: Audience = {
  slug: 'fuer-freelancer',
  crumb: 'Für Freelancer',
  seoTitle: 'WordPress-App für Freelancer',
  seoDescription:
    'WPorbit für WordPress-Freelancer: Kundenprojekte lokal entwickeln, sicher veröffentlichen und Zugänge verschlüsselt verwahren, in einer Mac-App.',
  kicker: 'Für Freelancer',
  title: 'Allein für viele Kundenseiten zuständig',
  lead: 'Du bist Entwicklerin, Projektleiter und Support in einer Person. WPorbit nimmt dir die Handgriffe zwischen den Projekten ab, damit deine Zeit in die Arbeit geht, die Kund:innen bezahlen.',
  dayTitle: 'Ein Dienstag mit fünf Kundenprojekten',
  day: [
    {
      time: '09:00',
      text: 'Eine Kundin wünscht eine Änderung am Theme. Du holst den aktuellen Live-Stand in eine lokale Kopie und arbeitest dort, nicht auf der Live-Seite.',
    },
    {
      time: '11:00',
      text: 'Updates für ein anderes Projekt: lokal einspielen, die wichtigen Seiten prüfen, dann mit einer Sicherung vorher auf den Server senden.',
    },
    {
      time: '14:00',
      text: 'Ein neuer Auftrag: Die Website kommt von einer anderen Agentur. Du übernimmst sie mit den SSH-Zugängen samt Datenbank und Dateien.',
    },
    {
      time: '16:00',
      text: 'Der Zugang zum Hosting eines Altprojekts liegt nicht in einem Mailverlauf, sondern verschlüsselt beim Projekt.',
    },
  ],
  features: [
    {
      title: 'Eine eigene Umgebung pro Projekt',
      detail: 'Jedes Projekt läuft in eigenen Containern auf deinem Mac, mit lokaler Domain, HTTPS und der PHP-Version des Servers. Ein Projekt stört das andere nicht.',
    },
    {
      title: 'Bestehende Websites übernehmen',
      detail: 'Mit den SSH-Zugängen holt WPorbit Dateien und Datenbank in ein lokales Projekt. Ein Backup als .tar.gz geht auch.',
    },
    {
      title: 'Veröffentlichen mit Vorschau und Sicherung',
      detail: 'Senden überträgt per rsync nur Neues und Geändertes. Wer den Server genau angleichen will, sieht vorher, was gelöscht würde, und WPorbit sichert zuerst.',
    },
    {
      title: 'Staging und Live pro Projekt',
      detail: 'Hinterlege mehrere Server pro Projekt, etwa Staging und Live, und sende Änderungen zuerst auf Staging.',
    },
    {
      title: 'Zugänge verschlüsselt beim Projekt',
      detail: 'SSH, WordPress-Admin und Datenbank liegen verschlüsselt im Tresor, beim Projekt, zu dem sie gehören.',
    },
    {
      title: 'Claude Code im Projekt',
      detail: 'Claude Code arbeitet direkt im Container des Projekts, mit getrenntem Chatverlauf pro Kunde und ohne Verbindung zu Live-Servern per ssh.',
    },
  ],
  planId: 'standalone',
  planText: 'Standalone deckt alles auf dieser Seite ab. Arbeitest du später mit anderen zusammen, kommt Cloud dazu, deine Projekte nimmst du mit.',
  guides: [
    'erste-schritte/erstes-projekt-anlegen',
    'projekte/bestehende-website-uebernehmen',
    'veroeffentlichen/live-seite-sicher-aktualisieren',
    'zugaenge/zugangsdaten-im-vault',
  ],
  posts: ['staging-statt-live', 'updates-reichen-nicht'],
}

export const agentur: Audience = {
  slug: 'fuer-agenturen',
  crumb: 'Für Agenturen',
  seoTitle: 'WordPress-App für Agenturen und Teams',
  seoDescription:
    'WPorbit für WordPress-Agenturen: Projekte und Zugänge im Team teilen, alle Kundenseiten ohne Plugin überwachen und sicher veröffentlichen.',
  kicker: 'Für Agenturen',
  title: 'Mehrere Leute, viele Kundenseiten, ein Stand',
  lead: 'In einer Agentur arbeitet selten nur eine Person an einem Projekt. WPorbit sorgt dafür, dass alle mit denselben Zugängen und demselben Wissen arbeiten, auch wenn jemand in den Ferien ist.',
  dayTitle: 'Ein Montag in einer Agentur mit 30 Kundenseiten',
  day: [
    {
      time: '08:30',
      text: 'Die Montags-Übersicht im Team-Kanal zeigt, welche Seiten letzte Woche aufgefallen sind, darunter ein Plugin, das neu verwaist ist.',
    },
    {
      time: '10:00',
      text: 'Eine Kollegin ist in den Ferien. Ihr Projekt übernimmst du mit denselben Zugängen, weil sie im Team geteilt sind.',
    },
    {
      time: '13:00',
      text: 'Eine Lücke in einem verbreiteten Plugin wird gemeldet. Die Flotten-Ansicht zeigt in Sekunden, auf welchen Sites es in welcher Version läuft.',
    },
    {
      time: '16:00',
      text: 'Ein Mitarbeiter verlässt die Agentur. Statt Passwörter zu suchen, siehst du, welche geteilten Zugänge erneuert werden müssen.',
    },
  ],
  features: [
    {
      title: 'Projekte und Zugänge im Team teilen (Cloud)',
      detail: 'Projekte samt Server-Zugang teilen, Ende-zu-Ende-verschlüsselt. Einen neuen Mac gibt ein Kollege mit einem Code frei, bevor er etwas lesen kann.',
    },
    {
      title: 'Alle Kundenseiten im Blick, ohne Plugin (Cloud)',
      detail: 'Das Team-Dashboard zeigt Erreichbarkeit, SSL, Versionen, offene Updates und bekannte Lücken. Auf der Kundenseite läuft kein Überwachungs-Plugin.',
    },
    {
      title: 'Alarme an das Team (Cloud)',
      detail: 'Alarme gehen in Slack oder an eine Team-Adresse, nicht an eine Einzelperson. Jeden Montag kommt eine Übersicht.',
    },
    {
      title: 'Plugins über alle Sites (Cloud)',
      detail: 'Die Flotten-Ansicht listet alle Plugins und Themes über alle überwachten Sites, mit Version, offenen Updates und verwaisten Plugins.',
    },
    {
      title: 'Dieselbe App für alle',
      detail: 'Jede Person arbeitet lokal mit derselben App: eigene Umgebung pro Projekt, Veröffentlichen mit Vorschau und Sicherung, Zugänge verschlüsselt.',
    },
    {
      title: 'Sauber, wenn jemand geht',
      detail: 'Beim Austritt zeigt WPorbit die Projekte, deren geteilte Zugänge erneuert werden sollten.',
    },
  ],
  planId: 'cloud',
  planText: 'Cloud ist in Entwicklung, der Release folgt bis Ende 2026. Das Team-Dashboard und das Teilen im Team laufen bereits. Bis dahin arbeitet jede Person mit Standalone.',
  guides: [
    'zugaenge/projekte-im-team-teilen',
    'wartung/team-dashboard-nutzen',
    'wartung/ueberwachung-einschalten',
    'zugaenge/teammitglied-verlaesst-das-team',
  ],
  posts: ['zugangsdaten-im-team', 'ueberwachung-ohne-plugin', 'tool-chaos-kostenrechnung'],
}
