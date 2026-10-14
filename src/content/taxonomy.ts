/**
 * Kategorien für Blog und Hilfe-Center.
 *
 * Die Reihenfolge in diesen Arrays bestimmt die Reihenfolge in der Navigation,
 * auf den Übersichtsseiten und in der Sitemap. Ein `slug` darf nach der
 * Veröffentlichung nicht mehr geändert werden — er ist Teil der URL.
 */

export interface TaxonomyEntry {
  slug: string
  label: string
  /** 120 bis 155 Zeichen: Meta-Beschreibung und Lead der Kategorieseite. */
  description: string
  /** Einleitung auf der Kategorieseite, 2 bis 3 Sätze. */
  intro?: string
}

export const blogCategories: TaxonomyEntry[] = [
  {
    slug: 'agenturbetrieb',
    label: 'Agenturbetrieb',
    description: 'Kalkulation, Prozesse und Teamorganisation für WordPress-Agenturen: wo im Alltag Stunden verloren gehen und wie du sie mit klaren Abläufen zurückholst.',
    intro:
      'Hier geht es um das, was zwischen den Projekten passiert: Einrichten, Suchen, Abstimmen. Die Beiträge rechnen mit konkreten Zahlen aus kleinen Schweizer Agenturen und zeigen, wo sich ein Wechsel lohnt und wo nicht.',
  },
  {
    slug: 'wartung',
    label: 'Wartung & Updates',
    description: 'Updates, Backups und der laufende Betrieb von WordPress-Kundenprojekten: Abläufe, die auch an stressigen Tagen halten und Fehler vor dem Kunden zeigen.',
    intro:
      'Wartung ist selten spannend, aber sie entscheidet, ob ein Update zehn Minuten oder einen halben Tag kostet. Die Beiträge beschreiben wiederholbare Abläufe mit Staging, geprüftem Rückweg und Backups, die schon einmal eingespielt wurden.',
  },
  {
    slug: 'workflow',
    label: 'Workflow & Automatisierung',
    description: 'Workflow und Automatisierung für WordPress-Agenturen: von der lokalen Umgebung über Git bis zur Veröffentlichung auf dem Server, ohne Umwege.',
  },
  {
    slug: 'sicherheit',
    label: 'Sicherheit & Compliance',
    description: 'WordPress-Sicherheit für Agenturen: Zugangsdaten im Team, Überwachung ohne Plugin, Härtung sowie revDSG und DSGVO aus Sicht einer Schweizer Agentur.',
    intro:
      'Viele Sicherheitsrisiken in Agenturen entstehen nicht durch raffinierte Angriffe, sondern durch verstreute Zugänge und zusätzliche Plugins. Die Beiträge zeigen, wo die Risiken liegen, welche Pflichten revDSG und DSGVO mit sich bringen und wo die Grenzen jeder Lösung sind.',
  },
  {
    slug: 'hosting',
    label: 'Hosting & Infrastruktur',
    description: 'Hosting und Infrastruktur für WordPress: Anbieter, PHP-Versionen, SSH-Zugang und Umgebungen im Vergleich, aus Sicht von Agenturen mit mehreren Kunden.',
  },
  {
    slug: 'produkt',
    label: 'Produkt',
    description: 'Was sich in WPorbit verändert und warum: Hintergründe zu neuen Funktionen, Entscheidungen beim Bau der App und was das für deinen Alltag heisst.',
  },
]

export const guideCategories: TaxonomyEntry[] = [
  {
    slug: 'erste-schritte',
    label: 'Erste Schritte',
    description: 'Erste Schritte mit WPorbit: App installieren, anmelden und Lizenz aktivieren, das Demo-Projekt ausprobieren und das erste WordPress-Projekt anlegen.',
    intro:
      'Starte mit der Installation: Sie richtet Colima, Docker, Vault und lokale Domains auf deinem Mac ein. Danach führen dich die Anleitungen über die Anmeldung und das Demo-Projekt zu deinem ersten eigenen Projekt. Begriffe, die unterwegs auftauchen, erklärt das Glossar.',
  },
  {
    slug: 'projekte',
    label: 'Projekte & Kunden',
    description: 'WordPress-Projekte in WPorbit übernehmen und verwalten: bestehende Live-Seiten per SSH holen, Backups importieren und Projekte organisieren oder löschen.',
    intro:
      'Die meisten Agenturen starten nicht bei null. Diese Anleitungen zeigen, wie du eine bestehende Website mit ihren Zugangsdaten übernimmst oder ein Backup als .tar.gz einspielst. Danach geht es um Ordnung in der Seitenleiste und das saubere Entfernen alter Projekte.',
  },
  {
    slug: 'entwicklung',
    label: 'Lokale Entwicklung',
    description: 'WordPress lokal entwickeln mit WPorbit: PHP- und WordPress-Version wechseln, Datenbank und WP-CLI nutzen, Logs lesen und in VS Code im Container arbeiten.',
    intro:
      'Jedes Projekt läuft in eigenen Containern auf deinem Mac, mit lokaler Domain und HTTPS. Die Anleitungen zeigen, wie du Versionen wechselst, mit Datenbank und WP-CLI arbeitest, Mails mit MailHog abfängst und Fehler in den Logs findest.',
  },
  {
    slug: 'veroeffentlichen',
    label: 'Veröffentlichen & Deployment',
    description: 'WordPress-Änderungen veröffentlichen: Server-Zugang einrichten, Holen, Senden und Deployen verstehen, Themes per rsync oder GitLab auf den Server bringen.',
    intro:
      'Bevor etwas live geht, braucht WPorbit einen funktionierenden SSH-Zugang zum Server. Danach erklären die Anleitungen, was Holen, Senden und Deployen jeweils übertragen, wie du eine Live-Seite mit Sicherung vorher aktualisierst und wie GitLab das Theme bei jedem Push selbst deployt.',
  },
  {
    slug: 'zugaenge',
    label: 'Zugänge & Vault',
    description: 'Zugangsdaten in WPorbit sicher verwalten: im Vault hinterlegen, Projekte im Team teilen, neue Macs anmelden und Zugriffe entziehen, wenn jemand geht.',
    intro:
      'Zugangsdaten liegen in WPorbit verschlüsselt im Vault, beim jeweiligen Projekt. Mit Cloud teilst du Projekte samt Server-Zugang im Team. Die Anleitungen decken den ganzen Ablauf ab, vom ersten Eintrag bis zum Austritt eines Teammitglieds.',
  },
  {
    slug: 'wartung',
    label: 'Wartung & Updates',
    description: 'WordPress-Wartung mit WPorbit: Überwachung einschalten, Team-Dashboard und Sicherheits-Tab nutzen, Backups erstellen und die App selbst aktualisieren.',
    intro:
      'Mit WPorbit Cloud überwacht der Server deine Live-Seiten ohne Plugin: Erreichbarkeit, SSL, Versionen und bekannte Sicherheitslücken. Die Anleitungen zeigen, wie du die Überwachung einschaltest und das Team-Dashboard liest. Backups und App-Updates funktionieren auch in Standalone.',
  },
  {
    slug: 'fehlerbehebung',
    label: 'Fehlerbehebung',
    description: 'Fehlerbehebung in WPorbit: wenn Einrichtung, Senden, Deployen oder der Lesezugang fehlschlagen. Ursachen erkennen, selbst beheben oder Support anfragen.',
    intro:
      'Jede Anleitung beginnt mit der Meldung, die du siehst, und führt zur häufigsten Ursache. Viele Fehler lassen sich mit den Reparaturen der App selbst beheben. Hilft das nicht, erstellst du einen Debug-Bericht und sendest ein Ticket direkt aus der App.',
  },
  {
    slug: 'konto',
    label: 'Konto & Lizenz',
    description: 'Konto und Lizenz in WPorbit: Lizenz aktivieren, Abo verwalten und Fragen zur Abrechnung klären. Anleitungen für Standalone und Cloud, Schritt für Schritt.',
  },
]

export function blogCategory(slug: string): TaxonomyEntry | undefined {
  return blogCategories.find((c) => c.slug === slug)
}

export function guideCategory(slug: string): TaxonomyEntry | undefined {
  return guideCategories.find((c) => c.slug === slug)
}
