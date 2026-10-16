/**
 * Landingpages „<Anbieter> Alternative“ unter /vergleich/<slug>-alternative.
 *
 * Vergleichende Werbung (UWG Art. 3 Abs. 1 lit. e): nur nachprüfbare,
 * datierte Angaben von den Seiten der Anbieter, sachlich und nicht
 * herabsetzend. Recherche und Quellen: content-plan/cloud-seite.md
 * (abgerufen am 14.10.2026; Local WP und Studio am 16.10.2026 direkt auf
 * den Seiten der Anbieter, Quellen je Eintrag). Was dort nicht belegt ist, steht hier als
 * „k. A.“ statt geraten. Keine CVEs, kein „unsicher“, keine Preisvergleiche.
 *
 * Vor jeder Änderung die Quellen neu prüfen und `checkedAt` nachführen.
 * Die Werte müssen zur Tabelle auf /vergleich#wartung passen.
 */

import type { AlternativeSlug } from './alternativeSlugs'

export { alternativePath } from './alternativeSlugs'

/** yes = vorhanden, no = nicht gefunden, partly = teilweise/Zusatz, soon = geplant, unknown = keine Angabe gefunden, plain = sachliche Angabe ohne Wertung. */
export type CellMark = 'yes' | 'no' | 'partly' | 'soon' | 'unknown' | 'plain'

export interface Cell {
  mark: CellMark
  text: string
}

export interface CompareRow {
  label: string
  orbit: Cell
  them: Cell
}

export interface Alternative {
  slug: AlternativeSlug
  /**
   * Womit WPorbit verglichen wird: Cloud (Wartung, Standard) oder
   * Standalone (lokale Entwicklung, heute verfügbar).
   */
  product?: 'cloud' | 'standalone'
  name: string
  /** Wer dahintersteht und wie es betrieben wird, neutral. */
  what: string
  /** Nur Cloud: wie sich der Dienst mit der Kundenseite verbindet. */
  connection?: string
  /** Nur Cloud: Name des Plugins für die Bildlegende. */
  pluginLabel?: string
  strengths: { title: string; detail: string }[]
  differences: { title: string; detail: string }[]
  rows: CompareRow[]
  fitOrbit: string[]
  fitThem: string[]
  faq: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
  lead: string
  sources: string[]
  /** Abrufdatum der Quellen, falls abweichend von SOURCES_CHECKED_AT. */
  checkedAt?: string
}

export const SOURCES_CHECKED_AT = '14.10.2026'
export const SOURCES_STAND = 'Stand Oktober 2026'

/* Gemeinsame Zellen für WPorbit Cloud, damit alle Seiten dasselbe sagen. */
const orbit = {
  connection: { mark: 'plain', text: 'Kein Plugin: beschränkter Lese-Schlüssel oder nur von aussen' },
  hosting: { mark: 'yes', text: 'Dienst, Server und Datenbank in der Schweiz' },
  uptime: { mark: 'yes', text: 'Alle 5 Min., Nachprüfung vor dem Alarm' },
  vulns: { mark: 'yes', text: 'Ja, aus Wordfence Intelligence' },
  mail: { mark: 'yes', text: 'Ja, täglich über den echten Mailweg' },
  updates: { mark: 'soon', text: 'Geplant' },
  backups: { mark: 'soon', text: 'Geplant' },
  reports: { mark: 'soon', text: 'Geplant' },
  security: { mark: 'soon', text: 'Malware-Scanner geplant' },
  local: { mark: 'yes', text: 'Ja, mit der App' },
} satisfies Record<string, Cell>

/* Gemeinsame Zellen für WPorbit Standalone (lokale Entwicklung). */
const local = {
  platform: { mark: 'plain', text: 'macOS 15 oder neuer, Apple Silicon und Intel' },
  engine: { mark: 'plain', text: 'Eigene Container pro Projekt (Colima), Datenbank MariaDB' },
  php: { mark: 'yes', text: 'Pro Projekt, passend zur WordPress-Version' },
  https: { mark: 'yes', text: 'Lokale .wporbit-Domains mit vertrautem Zertifikat' },
  mail: { mark: 'yes', text: 'Ja, MailHog' },
  wpcli: { mark: 'yes', text: 'Ja, dazu Terminal und phpMyAdmin' },
  sync: { mark: 'yes', text: 'Per SSH bei jedem Hoster, mit Vorschau und Sicherung' },
  vault: { mark: 'yes', text: 'Verschlüsselt pro Projekt' },
  preview: { mark: 'no', text: 'Nein' },
  ai: { mark: 'yes', text: 'Claude Code im Projekt-Container, ohne SSH auf Live' },
} satisfies Record<string, Cell>

const faqLocalPrice = (name: string) => ({
  q: `${name} ist kostenlos. Warum kostet WPorbit etwas?`,
  a: 'WPorbit ist auf Agenturen mit laufenden Kundenprojekten ausgerichtet: Übernahme bestehender Websites per SSH bei jedem Hoster, Senden mit Vorschau und Sicherung, Zugangsdaten verschlüsselt pro Projekt und Support aus der Schweiz. Ob sich das lohnt, zeigt der Test mit einem echten Kundenprojekt. Die aktuellen Pläne stehen auf der Preisseite.',
})
const faqLocalMac = {
  q: 'Läuft WPorbit auch unter Windows oder Linux?',
  a: 'Nein. WPorbit ist eine Mac-App und braucht macOS 15 oder neuer. Die WordPress-Projekte laufen darin in Containern, Colima und die Docker-Werkzeuge richtet WPorbit beim ersten Start selbst ein.',
}
const faqLocalMove = (name: string) => ({
  q: `Kann ich meine Sites aus ${name} übernehmen?`,
  a: 'Am einfachsten über die Live-Site: WPorbit holt sie per SSH mit Dateien und Datenbank in ein neues Projekt. Ohne Live-Site importierst du ein Backup als .tar.gz. Beide Werkzeuge können eine Zeit lang nebeneinander laufen.',
})
const diffAnyHost = {
  title: 'Jeder Hoster mit SSH',
  detail: 'WPorbit holt und sendet per SSH, unabhängig vom Anbieter: cyon, Hostpoint, Infomaniak, Metanet, Kinsta und andere. Vor dem Senden siehst du, was übertragen und was gelöscht würde, und WPorbit sichert vorher.',
}
const diffVault = {
  title: 'Zugangsdaten beim Projekt',
  detail: 'SSH, Datenbank und WordPress-Login liegen verschlüsselt im Vault des Projekts statt in einer Tabelle oder im Chat.',
}

/* Gemeinsame Unterschiede. Die anbieterspezifischen stehen pro Eintrag. */
const diffNoPlugin = (plugin: string) => ({
  title: 'Kein Plugin auf den Kundenseiten',
  detail: `Statt ${plugin} auf jeder Seite liegt beim Kunden ein Lese-Schlüssel, der nur feste Befehle ausführen darf: keine Shell, keine Dateien, kein root. Wer gar nichts installieren will, überwacht nur von aussen.`,
})
const diffMail = {
  title: 'Mailtest über den echten Mailweg',
  detail: 'Einmal am Tag verschickt jede Seite eine Testmail über wp_mail, also über ihr eigenes SMTP-Plugin. Dazu werden SPF, DKIM und DMARC der Domain bewertet. So fällt ein stilles Kontaktformular auf.',
}
const diffTimeline = {
  title: 'Änderungsverlauf und Alarm bei neuem Admin',
  detail: 'Was sich auf einer Seite geändert hat, bleibt 13 Monate sichtbar: Plugins, Themes, Versionen, Administratoren. Ein neuer Administrator löst sofort einen Alarm aus.',
}
const diffLocal = {
  title: 'Mit der App für die lokale Arbeit',
  detail: 'Cloud schliesst die Mac-App ein: lokal entwickeln, veröffentlichen und Zugänge im Team Ende-zu-Ende-verschlüsselt teilen. Wartung und Entwicklung laufen im selben Werkzeug.',
}
const diffSwiss = {
  title: 'Entwickelt und gehostet in der Schweiz',
  detail: 'Server und Datenbank des Dashboards stehen in Zürich. Für Performance-Messungen geht die Adresse der Website an Google PageSpeed, Alarme in Slack sind optional.',
}

const faqData = (name: string, where: string) => ({
  q: 'Wo liegen meine Daten?',
  a: `Server und Datenbank des Team-Dashboards stehen in der Schweiz, in Rechenzentren von Nine in Zürich. Für Performance-Messungen geht die Adresse der Website an Google PageSpeed, Alarme in Slack sind optional. Zu ${name}: ${where}`,
})
const faqPrice = (name: string) => ({
  q: `Ist WPorbit günstiger als ${name}?`,
  a: 'Die Preise lassen sich nicht direkt vergleichen, weil Cloud die Mac-App für lokale Entwicklung, Veröffentlichung und geteilte Zugänge einschliesst. Cloud kostet ab CHF 1200 pro Monat mit 3 Personen. Die aktuellen Pläne stehen auf der Preisseite.',
})

export const alternatives: Alternative[] = [
  {
    slug: 'managewp',
    name: 'ManageWP',
    what: 'ManageWP ist ein etablierter Dienst von GoDaddy, mit dem Agenturen viele WordPress-Seiten aus einem Dashboard verwalten. Die Grundversion ist kostenlos, weitere Funktionen gibt es als Zusatz pro Seite.',
    connection: 'Jede Kundenseite wird über das Worker-Plugin verbunden. Beim Hinzufügen fragt ManageWP wahlweise nach dem WordPress-Login oder nach einem Verbindungsschlüssel aus dem Plugin.',
    pluginLabel: 'Worker-Plugin',
    lead: 'ManageWP verbindet jede Kundenseite über ein Plugin und kann dafür aus der Ferne aktualisieren und sichern. WPorbit Cloud überwacht ohne Plugin, mit einem beschränkten Lese-Schlüssel, und kommt mit der App für die lokale Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.',
    strengths: [
      { title: 'Kostenloser Einstieg', detail: 'Die Grundversion kostet nichts. Zusätze wie Backups, Uptime oder Berichte bucht man pro Seite dazu.' },
      { title: 'Sichere Updates', detail: 'Safe Updates vergleichen Screenshots vor und nach dem Update und setzen bei Abweichungen zurück (mit dem Premium-Backup).' },
      { title: 'Schnelle Uptime-Messung', detail: 'Der Uptime-Monitor misst als Zusatz im 60-Sekunden-Takt und meldet auch per SMS.' },
      { title: 'Grosser Funktionsumfang', detail: 'Neben Updates und Backups gibt es Kundenberichte, Zusammenarbeit im Team, SEO-Ranking und einen Link-Monitor.' },
    ],
    differences: [
      diffNoPlugin('des Worker-Plugins'),
      { title: 'Kein Passwort beim Dienst', detail: 'Eingerichtet wird aus der App auf dem Mac. Die Zugänge dafür verlassen den Mac nicht, der Server von WPorbit bekommt nie ein Passwort.' },
      diffMail,
      diffTimeline,
      diffLocal,
    ],
    rows: [
      { label: 'Verbindung zur Kundenseite', orbit: orbit.connection, them: { mark: 'plain', text: 'Worker-Plugin auf jeder Seite' } },
      { label: 'Betrieb', orbit: orbit.hosting, them: { mark: 'unknown', text: 'Dienst, Standort k. A.' } },
      { label: 'Erreichbarkeit', orbit: orbit.uptime, them: { mark: 'partly', text: 'Zusatz, 60 s' } },
      { label: 'Bekannte Sicherheitslücken', orbit: orbit.vulns, them: { mark: 'partly', text: 'Zusatz' } },
      { label: 'Mailtest und SPF/DKIM/DMARC', orbit: orbit.mail, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Updates aus der Ferne', orbit: orbit.updates, them: { mark: 'yes', text: 'Ja, Safe Updates mit Premium-Backup' } },
      { label: 'Backups', orbit: orbit.backups, them: { mark: 'partly', text: 'Zusatz' } },
      { label: 'Kundenberichte mit eigenem Logo', orbit: orbit.reports, them: { mark: 'partly', text: 'Zusatz' } },
    ],
    fitOrbit: [
      'Du willst auf den Kundenseiten kein zusätzliches Plugin pflegen.',
      'Du willst wissen, ob die Kontaktformulare noch Mails verschicken.',
      'Dein Team arbeitet auf dem Mac und will Entwicklung, Zugänge und Wartung in einem Werkzeug.',
      'Server und Datenbank sollen in der Schweiz stehen.',
    ],
    fitThem: [
      'Du brauchst heute schon Updates und Backups aus der Ferne.',
      'Du willst kostenlos starten und Funktionen pro Seite dazubuchen.',
      'Du brauchst Uptime im Minutentakt mit SMS oder Extras wie SEO-Ranking.',
    ],
    faq: [
      {
        q: 'Brauche ich ein Plugin auf den Kundenseiten?',
        a: 'Nein. WPorbit legt auf dem Kundenserver einen Lese-Schlüssel ab, der nur feste Befehle ausführen darf, und ein kleines Skript ausserhalb des Web-Roots. In WordPress selbst wird nichts installiert. Ohne Zugang geht es auch: Dann misst das Dashboard nur von aussen.',
      },
      {
        q: 'Kann ich von ManageWP zu WPorbit wechseln?',
        a: 'Ja. Weil WPorbit nichts in WordPress installiert, können beide eine Zeit lang parallel laufen. Das Worker-Plugin entfernst du erst, wenn du es nicht mehr brauchst. Cloud erscheint bis Ende 2026. Die App kannst du heute schon testen und deine Projekte später mitnehmen.',
      },
      faqData('ManageWP', 'Auf den Seiten des Anbieters haben wir keine Angabe zum Datenstandort gefunden (Stand Oktober 2026).'),
      faqPrice('ManageWP'),
    ],
    seoTitle: 'ManageWP Alternative ohne Plugin, aus der Schweiz',
    seoDescription: 'ManageWP Alternative für Agenturen: Kundenseiten überwachen ohne Plugin, mit Mailtest, Änderungsverlauf und Hosting in der Schweiz. Ehrlicher Vergleich.',
    sources: [
      'https://managewp.com/pricing',
      'https://managewp.com/features',
      'https://managewp.com/features/uptime-monitor',
      'https://managewp.com/features/safe-updates',
      'https://managewp.com/guide/getting-started/',
      'https://managewp.com/managewp-and-gdpr-compliance/',
      'https://wordpress.org/plugins/worker/',
    ],
  },
  {
    slug: 'wp-umbrella',
    name: 'WP Umbrella',
    what: 'WP Umbrella ist ein Wartungsdienst aus Frankreich für Agenturen und Freelancer. Er bündelt Überwachung, Updates, Backups und Kundenberichte und wird pro Seite abgerechnet.',
    connection: 'Jede Kundenseite wird über das WP-Umbrella-Plugin verbunden, das sich mit einem API-Schlüssel beim Dienst anmeldet.',
    pluginLabel: 'WP-Umbrella-Plugin',
    lead: 'WP Umbrella verbindet jede Kundenseite über ein Plugin und deckt Updates, Backups und Berichte ab. WPorbit Cloud überwacht ohne Plugin, mit einem beschränkten Lese-Schlüssel, und kommt mit der App für die lokale Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.',
    strengths: [
      { title: 'Betrieb in der EU', detail: 'Der Dienst läuft in Frankreich, ein Auftragsverarbeitungsvertrag ist veröffentlicht.' },
      { title: 'Updates mit Rollback', detail: 'Updates lassen sich gebündelt einspielen und zurücksetzen, laut FAQ mit visuellem Vergleich.' },
      { title: 'Kundenberichte', detail: 'Berichte mit eigenem Logo für Wartungskunden sind eingebaut.' },
      { title: 'Teams und Rollen', detail: 'Unbegrenzt viele Mitglieder mit Rollen, dazu Sicherheitslücken aus Patchstack und Backups als Zusatz.' },
    ],
    differences: [
      diffNoPlugin('des WP-Umbrella-Plugins'),
      diffMail,
      diffTimeline,
      diffLocal,
      diffSwiss,
    ],
    rows: [
      { label: 'Verbindung zur Kundenseite', orbit: orbit.connection, them: { mark: 'plain', text: 'Plugin mit API-Schlüssel auf jeder Seite' } },
      { label: 'Betrieb', orbit: orbit.hosting, them: { mark: 'yes', text: 'Dienst, EU (Frankreich)' } },
      { label: 'Erreichbarkeit', orbit: orbit.uptime, them: { mark: 'yes', text: 'Ja, aus mehreren Regionen' } },
      { label: 'Bekannte Sicherheitslücken', orbit: orbit.vulns, them: { mark: 'yes', text: 'Ja, aus Patchstack' } },
      { label: 'Mailtest und SPF/DKIM/DMARC', orbit: orbit.mail, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Updates aus der Ferne', orbit: orbit.updates, them: { mark: 'yes', text: 'Ja, mit Rollback' } },
      { label: 'Backups', orbit: orbit.backups, them: { mark: 'yes', text: 'Ja, stündlich als Zusatz' } },
      { label: 'Kundenberichte mit eigenem Logo', orbit: orbit.reports, them: { mark: 'yes', text: 'Ja' } },
    ],
    fitOrbit: [
      'Du willst auf den Kundenseiten kein zusätzliches Plugin pflegen.',
      'Du willst wissen, ob die Kontaktformulare noch Mails verschicken.',
      'Server und Datenbank sollen in der Schweiz stehen, nicht nur in der EU.',
      'Dein Team arbeitet auf dem Mac und will Entwicklung und Wartung in einem Werkzeug.',
    ],
    fitThem: [
      'Du brauchst heute schon Updates, Backups und Kundenberichte aus einem Dienst.',
      'Du willst pro Seite abrechnen und klein anfangen.',
      'Dein Team arbeitet nicht auf dem Mac oder braucht keine lokale Entwicklungsumgebung.',
    ],
    faq: [
      {
        q: 'Brauche ich ein Plugin auf den Kundenseiten?',
        a: 'Nein. WPorbit legt auf dem Kundenserver einen Lese-Schlüssel ab, der nur feste Befehle ausführen darf, und ein kleines Skript ausserhalb des Web-Roots. In WordPress selbst wird nichts installiert. Ohne Zugang geht es auch: Dann misst das Dashboard nur von aussen.',
      },
      {
        q: 'Kann ich von WP Umbrella zu WPorbit wechseln?',
        a: 'Ja. Weil WPorbit nichts in WordPress installiert, können beide eine Zeit lang parallel laufen. Das WP-Umbrella-Plugin entfernst du erst, wenn du es nicht mehr brauchst. Cloud erscheint bis Ende 2026. Die App kannst du heute schon testen und deine Projekte später mitnehmen.',
      },
      faqData('WP Umbrella', 'Der Anbieter nennt Frankreich als Standort und hat einen Auftragsverarbeitungsvertrag veröffentlicht (Stand Oktober 2026).'),
      faqPrice('WP Umbrella'),
    ],
    seoTitle: 'Schweizer WP Umbrella Alternative ohne Plugin',
    seoDescription: 'WP Umbrella Alternative für Agenturen: Kundenseiten ohne Plugin überwachen, mit Mailtest, Änderungsverlauf und Hosting in der Schweiz. Ehrlich verglichen.',
    sources: [
      'https://wp-umbrella.com/',
      'https://wp-umbrella.com/pricing/',
      'https://wp-umbrella.com/features/wordpress-uptime-performance/',
      'https://wp-umbrella.com/data-processing-agreement/',
      'https://support.wp-umbrella.com/en/articles/8-getting-started-with-wp-umbrella-a-simple-guide',
      'https://wordpress.org/plugins/wp-health/',
    ],
  },
  {
    slug: 'mainwp',
    name: 'MainWP',
    what: 'MainWP ist ein Open-Source-Dashboard, das man selbst betreibt: als Plugin in einer eigenen WordPress-Installation. Die Grundversion ist kostenlos, Pro und Erweiterungen kosten extra.',
    connection: 'Jede Kundenseite wird über das MainWP-Child-Plugin mit dem eigenen Dashboard verbunden.',
    pluginLabel: 'Child-Plugin',
    lead: 'MainWP läuft auf deinem eigenen Server und verbindet jede Kundenseite über ein Child-Plugin. WPorbit Cloud ist ein Dienst aus der Schweiz, überwacht ohne Plugin und kommt mit der App für die lokale Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.',
    strengths: [
      { title: 'Volle Kontrolle', detail: 'Das Dashboard läuft auf dem eigenen Server. Daten verlassen die eigene Infrastruktur nicht.' },
      { title: 'Kostenloser Kern', detail: 'Die Grundversion ist kostenlos und quelloffen, mit vielen Erweiterungen von MainWP und Dritten.' },
      { title: 'Updates aus der Ferne', detail: 'Core, Plugins und Themes lassen sich über alle verbundenen Seiten aktualisieren.' },
      { title: 'Breite Erweiterungen', detail: 'Uptime vom eigenen Server, Lücken aus WPScan und NVD, Lighthouse-Werte, Berichte und Team-Rechte mit Pro.' },
    ],
    differences: [
      diffNoPlugin('des Child-Plugins'),
      { title: 'Kein eigener Server nötig', detail: 'Das Dashboard betreiben wir, in der Schweiz. Du musst keine eigene WordPress-Installation für die Verwaltung aktuell und abgesichert halten.' },
      diffMail,
      diffTimeline,
      diffLocal,
    ],
    rows: [
      { label: 'Verbindung zur Kundenseite', orbit: orbit.connection, them: { mark: 'plain', text: 'Child-Plugin auf jeder Seite' } },
      { label: 'Betrieb', orbit: orbit.hosting, them: { mark: 'yes', text: 'Eigener Server' } },
      { label: 'Erreichbarkeit', orbit: orbit.uptime, them: { mark: 'yes', text: 'Ja, vom eigenen Server' } },
      { label: 'Bekannte Sicherheitslücken', orbit: orbit.vulns, them: { mark: 'yes', text: 'Ja, aus WPScan und NVD' } },
      { label: 'Mailtest und SPF/DKIM/DMARC', orbit: orbit.mail, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Updates aus der Ferne', orbit: orbit.updates, them: { mark: 'yes', text: 'Ja' } },
      { label: 'Backups', orbit: orbit.backups, them: { mark: 'partly', text: 'Über Backup-Plugins' } },
      { label: 'Kundenberichte mit eigenem Logo', orbit: orbit.reports, them: { mark: 'partly', text: 'Mit Pro' } },
    ],
    fitOrbit: [
      'Du willst keinen eigenen Verwaltungsserver betreiben und absichern.',
      'Du willst auf den Kundenseiten kein zusätzliches Plugin pflegen.',
      'Du willst wissen, ob die Kontaktformulare noch Mails verschicken.',
      'Dein Team arbeitet auf dem Mac und will Entwicklung und Wartung in einem Werkzeug.',
    ],
    fitThem: [
      'Du willst alles selbst hosten und kein Abo bei einem Dienst.',
      'Du brauchst heute schon Updates aus der Ferne und baust gern mit Erweiterungen aus.',
      'Du hast im Team jemanden, der den eigenen Server pflegt.',
    ],
    faq: [
      {
        q: 'Brauche ich ein Plugin auf den Kundenseiten?',
        a: 'Nein. WPorbit legt auf dem Kundenserver einen Lese-Schlüssel ab, der nur feste Befehle ausführen darf, und ein kleines Skript ausserhalb des Web-Roots. In WordPress selbst wird nichts installiert. Ohne Zugang geht es auch: Dann misst das Dashboard nur von aussen.',
      },
      {
        q: 'Kann ich von MainWP zu WPorbit wechseln?',
        a: 'Ja. Weil WPorbit nichts in WordPress installiert, können beide eine Zeit lang parallel laufen. Das Child-Plugin entfernst du erst, wenn du es nicht mehr brauchst. Cloud erscheint bis Ende 2026. Die App kannst du heute schon testen und deine Projekte später mitnehmen.',
      },
      faqData('MainWP', 'Dort liegen die Daten auf dem eigenen Server, den du selbst betreibst.'),
      {
        q: 'Kann ich WPorbit selbst hosten wie MainWP?',
        a: 'Nein. Das Team-Dashboard betreiben wir als Dienst in der Schweiz. Die Zugänge zu den Kundenservern bleiben trotzdem bei dir: Sie liegen verschlüsselt auf dem Mac, der Server von WPorbit bekommt nie ein Passwort.',
      },
    ],
    seoTitle: 'MainWP Alternative ohne Plugin und eigenen Server',
    seoDescription: 'MainWP Alternative für Agenturen: Kundenseiten ohne Child-Plugin und ohne eigenen Server überwachen, mit Mailtest und Hosting in der Schweiz.',
    sources: [
      'https://mainwp.com/',
      'https://mainwp.com/pricing/',
      'https://docs.mainwp.com/add-ons/security',
      'https://docs.mainwp.com/sites/management/uptime-monitoring',
    ],
  },
  {
    slug: 'infinitewp',
    name: 'InfiniteWP',
    what: 'InfiniteWP ist ein Verwaltungspanel, das man selbst auf einem eigenen Server installiert. Das Panel ist kostenlos, Erweiterungen gibt es in Jahrespaketen.',
    connection: 'Jede Kundenseite wird über das InfiniteWP-Client-Plugin verbunden. Beim Hinzufügen werden der Admin-Benutzername und ein Aktivierungsschlüssel aus dem Plugin angegeben, kein Passwort.',
    pluginLabel: 'Client-Plugin',
    lead: 'InfiniteWP läuft auf deinem eigenen Server und verbindet jede Kundenseite über ein Client-Plugin. WPorbit Cloud ist ein Dienst aus der Schweiz, überwacht ohne Plugin und kommt mit der App für die lokale Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.',
    strengths: [
      { title: 'Selbst gehostet', detail: 'Das Panel läuft auf dem eigenen Server, die Daten bleiben in der eigenen Infrastruktur.' },
      { title: 'Kostenloses Panel', detail: 'Das Panel selbst kostet nichts. Erweiterungen kauft man als Paket dazu.' },
      { title: 'Updates und Backups', detail: 'Updates über alle Seiten und Backups sind seit Langem Teil des Angebots.' },
      { title: 'Erweiterungen', detail: 'Berichte mit eigenem Logo, Malware-Prüfung und Uptime über UptimeRobot gibt es als Zusatz.' },
    ],
    differences: [
      diffNoPlugin('des Client-Plugins'),
      { title: 'Kein eigener Server nötig', detail: 'Das Dashboard betreiben wir, in der Schweiz. Du musst kein eigenes Panel installieren, aktuell halten und absichern.' },
      diffMail,
      diffTimeline,
      diffLocal,
    ],
    rows: [
      { label: 'Verbindung zur Kundenseite', orbit: orbit.connection, them: { mark: 'plain', text: 'Client-Plugin auf jeder Seite' } },
      { label: 'Betrieb', orbit: orbit.hosting, them: { mark: 'yes', text: 'Eigener Server' } },
      { label: 'Erreichbarkeit', orbit: orbit.uptime, them: { mark: 'partly', text: 'Zusatz, über UptimeRobot' } },
      { label: 'Bekannte Sicherheitslücken', orbit: orbit.vulns, them: { mark: 'partly', text: 'Teilweise' } },
      { label: 'Mailtest und SPF/DKIM/DMARC', orbit: orbit.mail, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Updates aus der Ferne', orbit: orbit.updates, them: { mark: 'yes', text: 'Ja' } },
      { label: 'Backups', orbit: orbit.backups, them: { mark: 'yes', text: 'Ja' } },
      { label: 'Kundenberichte mit eigenem Logo', orbit: orbit.reports, them: { mark: 'partly', text: 'Zusatz' } },
    ],
    fitOrbit: [
      'Du willst kein eigenes Panel betreiben und absichern.',
      'Du willst auf den Kundenseiten kein zusätzliches Plugin pflegen.',
      'Du willst wissen, ob die Kontaktformulare noch Mails verschicken.',
      'Dein Team arbeitet auf dem Mac und will Entwicklung und Wartung in einem Werkzeug.',
    ],
    fitThem: [
      'Du willst das Panel selbst hosten und einmal pro Jahr für Erweiterungen zahlen.',
      'Du brauchst heute schon Updates und Backups aus der Ferne.',
      'Du hast im Team jemanden, der den eigenen Server pflegt.',
    ],
    faq: [
      {
        q: 'Brauche ich ein Plugin auf den Kundenseiten?',
        a: 'Nein. WPorbit legt auf dem Kundenserver einen Lese-Schlüssel ab, der nur feste Befehle ausführen darf, und ein kleines Skript ausserhalb des Web-Roots. In WordPress selbst wird nichts installiert. Ohne Zugang geht es auch: Dann misst das Dashboard nur von aussen.',
      },
      {
        q: 'Kann ich von InfiniteWP zu WPorbit wechseln?',
        a: 'Ja. Weil WPorbit nichts in WordPress installiert, können beide eine Zeit lang parallel laufen. Das Client-Plugin entfernst du erst, wenn du es nicht mehr brauchst. Cloud erscheint bis Ende 2026. Die App kannst du heute schon testen und deine Projekte später mitnehmen.',
      },
      faqData('InfiniteWP', 'Dort liegen die Daten auf dem eigenen Server, auf dem das Panel installiert ist.'),
      faqPrice('InfiniteWP'),
    ],
    seoTitle: 'InfiniteWP Alternative ohne eigenen Server',
    seoDescription: 'InfiniteWP Alternative für Agenturen: Kundenseiten ohne Client-Plugin und ohne eigenes Panel überwachen, mit Mailtest und Hosting in der Schweiz.',
    sources: [
      'https://new.infinitewp.com/pricing/',
      'https://infinitewp.com/docs/adding-your-wordpress-sites-to-the-infinitewp-admin-panel/',
    ],
  },
  {
    slug: 'wp-remote',
    name: 'WP Remote',
    what: 'WP Remote ist ein Wartungsdienst aus der BlogVault-Familie. Er deckt Updates, Backups, Sicherheit und Berichte ab und hat eine kostenlose Stufe.',
    connection: 'Jede Kundenseite wird über das WP-Remote-Plugin mit dem Dienst verbunden.',
    pluginLabel: 'WP-Remote-Plugin',
    lead: 'WP Remote verbindet jede Kundenseite über ein Plugin und deckt Updates, Backups und Sicherheit ab. WPorbit Cloud überwacht ohne Plugin, mit einem beschränkten Lese-Schlüssel, und kommt mit der App für die lokale Arbeit. Cloud ist in Entwicklung, der Release folgt bis Ende 2026.',
    strengths: [
      { title: 'Sichere Updates', detail: 'Updates laufen zuerst in einer Testumgebung, mit visueller Prüfung der wichtigsten Seiten.' },
      { title: 'Backups und Sicherheit', detail: 'Backups, Malware-Scan und Firewall sind Teil des Angebots.' },
      { title: 'Kundenberichte', detail: 'Berichte mit eigenem Logo gibt es ab dem Essential-Plan.' },
      { title: 'Formular-Tests', detail: 'Neben Updates prüft WP Remote auch Formulare und bietet Single Sign-on für das Team.' },
    ],
    differences: [
      diffNoPlugin('des WP-Remote-Plugins'),
      diffMail,
      diffTimeline,
      diffLocal,
      diffSwiss,
    ],
    rows: [
      { label: 'Verbindung zur Kundenseite', orbit: orbit.connection, them: { mark: 'plain', text: 'Plugin auf jeder Seite' } },
      { label: 'Betrieb', orbit: orbit.hosting, them: { mark: 'yes', text: 'Dienst, EU laut DSGVO-Seite' } },
      { label: 'Erreichbarkeit', orbit: orbit.uptime, them: { mark: 'yes', text: 'Ja, Intervall k. A.' } },
      { label: 'Bekannte Sicherheitslücken', orbit: orbit.vulns, them: { mark: 'yes', text: 'Ja' } },
      { label: 'Malware-Scan', orbit: orbit.security, them: { mark: 'yes', text: 'Ja, mit Firewall' } },
      { label: 'Mailtest und SPF/DKIM/DMARC', orbit: orbit.mail, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Updates aus der Ferne', orbit: orbit.updates, them: { mark: 'yes', text: 'Ja, mit Testumgebung' } },
      { label: 'Backups', orbit: orbit.backups, them: { mark: 'yes', text: 'Ja' } },
    ],
    fitOrbit: [
      'Du willst auf den Kundenseiten kein zusätzliches Plugin pflegen.',
      'Du willst wissen, ob die Mails der Kundenseiten ankommen und SPF, DKIM und DMARC stimmen.',
      'Server und Datenbank sollen in der Schweiz stehen.',
      'Dein Team arbeitet auf dem Mac und will Entwicklung und Wartung in einem Werkzeug.',
    ],
    fitThem: [
      'Du brauchst heute schon Updates mit Testumgebung, Backups und Kundenberichte.',
      'Du willst Malware-Scan und Firewall vom selben Dienst.',
      'Du willst kostenlos starten und pro Seite abrechnen.',
    ],
    faq: [
      {
        q: 'Brauche ich ein Plugin auf den Kundenseiten?',
        a: 'Nein. WPorbit legt auf dem Kundenserver einen Lese-Schlüssel ab, der nur feste Befehle ausführen darf, und ein kleines Skript ausserhalb des Web-Roots. In WordPress selbst wird nichts installiert. Ohne Zugang geht es auch: Dann misst das Dashboard nur von aussen.',
      },
      {
        q: 'Kann ich von WP Remote zu WPorbit wechseln?',
        a: 'Ja. Weil WPorbit nichts in WordPress installiert, können beide eine Zeit lang parallel laufen. Das WP-Remote-Plugin entfernst du erst, wenn du es nicht mehr brauchst. Cloud erscheint bis Ende 2026. Die App kannst du heute schon testen und deine Projekte später mitnehmen.',
      },
      faqData('WP Remote', 'Die DSGVO-Seite des Anbieters nennt Rechenzentren in der EU, die ältere Datenschutzerklärung auch die USA (Stand Oktober 2026).'),
      {
        q: 'Schützt WPorbit die Kundenseiten mit einer Firewall?',
        a: 'Nein. WPorbit installiert nichts in WordPress und damit auch keine Firewall. Das Dashboard erkennt bekannte Lücken und zeigt das Update, das sie schliesst. Ein Malware-Scanner ist geplant. Eine Firewall gehört aus unserer Sicht vor die Website, zum Beispiel zum Hoster oder zu Cloudflare.',
      },
    ],
    seoTitle: 'WP Remote Alternative ohne Plugin, aus der Schweiz',
    seoDescription: 'WP Remote Alternative für Agenturen: Kundenseiten ohne Plugin überwachen, mit Mailtest, SPF/DKIM/DMARC, Änderungsverlauf und Hosting in der Schweiz.',
    sources: [
      'https://wpremote.com/',
      'https://wpremote.com/pricing/',
      'https://wpremote.com/gdpr/',
      'https://wpremote.com/privacy/',
      'https://blogvault.net/blogvault-dpa/',
    ],
  },
  {
    slug: 'local-wp',
    product: 'standalone',
    name: 'Local WP',
    what: 'Local ist die verbreitete lokale WordPress-Umgebung von WP Engine. Die App ist kostenlos, seit 2021 auch mit den früheren Pro-Funktionen, und läuft auf macOS, Windows und Linux.',
    lead: 'Local startet WordPress schnell und kostenlos auf jedem Rechner und ist eng mit WP Engine und Flywheel verbunden. WPorbit Standalone ist für Agenturen gebaut, die Kundenprojekte bei verschiedenen Hostern übernehmen, ändern und wieder veröffentlichen.',
    strengths: [
      { title: 'Kostenlos und auf allen Plattformen', detail: 'Local gibt es kostenlos für macOS, Windows und Linux. Die früheren Pro-Funktionen sind seit 2021 für alle frei.' },
      { title: 'Live Links', detail: 'Eine lokale Site lässt sich über einen Link zeigen, etwa für ein Review im Team oder mit der Kundin.' },
      { title: 'Blueprints und Cloud-Backups', detail: 'Eine Site lässt sich als Vorlage speichern und wiederverwenden. Backups gehen auf Wunsch zu Google Drive oder Dropbox.' },
      { title: 'Nah an WP Engine und Flywheel', detail: 'Mit Connect holst und sendest du Sites direkt zu WP Engine und Flywheel, auch auf deren Staging-Umgebungen.' },
    ],
    differences: [
      diffAnyHost,
      { title: 'Ein Container pro Projekt', detail: 'Jedes Projekt läuft in eigenen Containern mit eigener PHP- und WordPress-Version. Ein altes Kundenprojekt und ein neues stören sich nicht.' },
      diffVault,
      { title: 'Bestehende Websites übernehmen', detail: 'Eine Live-Site holst du mit ihren Zugangsdaten in eine lokale Kopie, oder du importierst ein Backup als .tar.gz. Einen abweichenden Tabellen-Präfix gleicht WPorbit an.' },
      { title: 'Claude Code im Projekt', detail: 'Claude Code arbeitet im Container des Projekts, mit getrenntem Chatverlauf pro Kunde und ohne Verbindung zu Live-Servern per ssh.' },
    ],
    rows: [
      { label: 'Plattform', orbit: local.platform, them: { mark: 'plain', text: 'macOS, Windows, Linux' } },
      { label: 'Wie die Sites laufen', orbit: local.engine, them: { mark: 'plain', text: 'Native Dienste: PHP, MySQL, NGINX oder Apache' } },
      { label: 'PHP-Version wechseln', orbit: local.php, them: { mark: 'yes', text: 'Ja, 7.3, 7.4 und 8.0+' } },
      { label: 'Lokale Domains mit HTTPS', orbit: local.https, them: { mark: 'yes', text: 'Selbst signierte Zertifikate, auf Wunsch vertraut' } },
      { label: 'Mails abfangen', orbit: local.mail, them: { mark: 'yes', text: 'Ja, Mailpit' } },
      { label: 'WP-CLI', orbit: local.wpcli, them: { mark: 'yes', text: 'Ja, über die Site-Shell' } },
      { label: 'Live-Site holen und senden', orbit: local.sync, them: { mark: 'partly', text: 'Connect zu WP Engine und Flywheel' } },
      { label: 'Zugangsdaten verschlüsselt pro Projekt', orbit: local.vault, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Link zum Zeigen der lokalen Site', orbit: local.preview, them: { mark: 'yes', text: 'Ja, Live Links' } },
    ],
    fitOrbit: [
      'Deine Kundenprojekte liegen bei verschiedenen Hostern, nicht nur bei WP Engine.',
      'Du übernimmst oft bestehende Websites und bringst Änderungen wieder live.',
      'Zugangsdaten sollen verschlüsselt beim Projekt liegen.',
      'Du arbeitest auf dem Mac.',
    ],
    fitThem: [
      'Du hostest bei WP Engine oder Flywheel und willst direkt dorthin senden.',
      'Du arbeitest unter Windows oder Linux.',
      'Du brauchst eine kostenlose lokale Umgebung oder willst lokale Sites per Link zeigen.',
    ],
    faq: [faqLocalMove('Local'), faqLocalMac, faqLocalPrice('Local')],
    seoTitle: 'Local WP Alternative für Agenturen auf dem Mac',
    seoDescription: 'Local WP Alternative für Agenturen: WordPress lokal in Containern, Live-Sites per SSH bei jedem Hoster holen und senden, Zugänge verschlüsselt pro Projekt.',
    sources: [
      'https://localwp.com/',
      'https://localwp.com/features',
      'https://localwp.com/connect/',
      'https://localwp.com/pro-for-everyone/',
    ],
    checkedAt: '16.10.2026',
  },
  {
    slug: 'wordpress-studio',
    product: 'standalone',
    name: 'WordPress Studio',
    what: 'Studio ist die kostenlose, quelloffene App von Automattic für lokale WordPress-Sites. Es gibt sie als Desktop-App und als Kommandozeile für macOS, Windows und Linux.',
    lead: 'Studio ist kostenlos, quelloffen und eng mit WordPress.com und Pressable verbunden. WPorbit Standalone ist für Agenturen gebaut, deren Kundenprojekte bei verschiedenen Hostern liegen und die Änderungen per SSH wieder live bringen.',
    strengths: [
      { title: 'Kostenlos und quelloffen', detail: 'Studio kostet nichts, der Code liegt öffentlich auf GitHub. Es läuft auf macOS, Windows und Linux, als App und als Kommandozeile.' },
      { title: 'Preview-Sites', detail: 'Eine lokale Site lässt sich als Kopie in der Cloud zeigen, auch wenn der eigene Rechner schläft. Eine Vorschau bleibt sieben Tage nach der letzten Änderung aktiv.' },
      { title: 'Sync mit WordPress.com und Pressable', detail: 'Themes, Plugins, Datenbank oder ganz wp-content lassen sich in beide Richtungen abgleichen. Dafür braucht es einen bezahlten WordPress.com-Plan oder eine Pressable-Site.' },
      { title: 'KI und Blueprints', detail: 'Studio Code (Beta) baut Blöcke, Themes und Plugins aus Beschreibungen. Dazu kommen Blueprints als Vorlagen und eine Anbindung an KI-Agenten über MCP.' },
    ],
    differences: [
      diffAnyHost,
      { title: 'Datenbank wie auf dem Server', detail: 'In WPorbit läuft WordPress mit MariaDB, wie bei den meisten Hostern. Studio nutzt standardmässig SQLite, MySQL lässt sich von Hand anbinden.' },
      { title: 'Auch ältere Kundenprojekte', detail: 'Die PHP-Version wählst du pro Projekt passend zur WordPress-Version. So läuft auch ein älteres Kundenprojekt lokal wie live.' },
      diffVault,
      { title: 'Claude Code im Projekt', detail: 'Claude Code arbeitet im Container des Projekts, mit getrenntem Chatverlauf pro Kunde und ohne Verbindung zu Live-Servern per ssh.' },
    ],
    rows: [
      { label: 'Plattform', orbit: local.platform, them: { mark: 'plain', text: 'macOS, Windows, Linux' } },
      { label: 'Wie die Sites laufen', orbit: local.engine, them: { mark: 'plain', text: 'Natives PHP, Datenbank SQLite (MySQL möglich)' } },
      { label: 'PHP-Version wechseln', orbit: local.php, them: { mark: 'yes', text: 'Ja, 8.2 bis 8.5' } },
      { label: 'Lokale Domains mit HTTPS', orbit: local.https, them: { mark: 'yes', text: 'Ja, eigene lokale Domains mit SSL' } },
      { label: 'Mails abfangen', orbit: local.mail, them: { mark: 'unknown', text: 'k. A.' } },
      { label: 'WP-CLI', orbit: local.wpcli, them: { mark: 'yes', text: 'Ja, über die Studio-Kommandozeile' } },
      { label: 'Live-Site holen und senden', orbit: local.sync, them: { mark: 'partly', text: 'Sync mit WordPress.com und Pressable' } },
      { label: 'Zugangsdaten verschlüsselt pro Projekt', orbit: local.vault, them: { mark: 'no', text: 'Nicht gefunden' } },
      { label: 'Link zum Zeigen der lokalen Site', orbit: local.preview, them: { mark: 'yes', text: 'Ja, Preview-Sites' } },
      { label: 'KI-Agent im Projekt', orbit: local.ai, them: { mark: 'yes', text: 'Studio Code (Beta), MCP und Agent-Skills' } },
    ],
    fitOrbit: [
      'Deine Kundenprojekte liegen bei verschiedenen Hostern, nicht auf WordPress.com.',
      'Lokal soll dieselbe Datenbank laufen wie auf dem Server.',
      'Du pflegst auch ältere Projekte mit älteren PHP-Versionen.',
      'Zugangsdaten sollen verschlüsselt beim Projekt liegen.',
    ],
    fitThem: [
      'Deine Sites liegen auf WordPress.com oder Pressable.',
      'Du arbeitest unter Windows oder Linux oder willst eine kostenlose, quelloffene Lösung.',
      'Du willst lokale Sites als Vorschau in der Cloud zeigen.',
    ],
    faq: [faqLocalMove('Studio'), faqLocalMac, faqLocalPrice('Studio')],
    seoTitle: 'WordPress Studio Alternative für Agenturen',
    seoDescription: 'WordPress Studio Alternative für Agenturen: WordPress lokal mit MariaDB in Containern, Live-Sites per SSH bei jedem Hoster holen und senden.',
    sources: [
      'https://developer.wordpress.com/studio/',
      'https://developer.wordpress.com/docs/developer-tools/studio/',
      'https://developer.wordpress.com/docs/developer-tools/studio/php-runtimes/',
      'https://developer.wordpress.com/docs/developer-tools/studio/frequently-asked-questions/',
    ],
    checkedAt: '16.10.2026',
  },
]

export function getAlternative(slug: string): Alternative {
  const entry = alternatives.find((a) => a.slug === slug)
  if (!entry) throw new Error(`Unbekannte Alternative: ${slug}`)
  return entry
}
