/**
 * Was Cloud heute kann und was geplant ist. Einzige Quelle für /cloud und den
 * Planvergleich auf /preise.
 */

export interface CloudFeature {
  title: string
  detail: string
}

/** Was heute im Team-Dashboard gebaut ist. */
export const cloudToday: CloudFeature[] = [
  {
    title: 'Erreichbarkeit',
    detail: 'Messung alle 5 Minuten, Nachprüfung vor dem Alarm, Verfügbarkeit über 30 und 90 Tage mit Ziel, Wartungsfenster und Inhaltsprüfung.',
  },
  {
    title: 'Updates und Inventar',
    detail: 'Alle Plugins, Themes und Versionen jeder Seite, offene Updates, Auto-Updates, inaktive und verwaiste Plugins, team-weit als Liste und CSV.',
  },
  {
    title: 'Sicherheitslücken',
    detail: 'Bekannte Lücken in WordPress, Plugins und Themes aus Wordfence Intelligence, mit Schwere und dem Update, das sie schliesst.',
  },
  {
    title: 'Änderungen',
    detail: 'Was sich auf einer Seite geändert hat, über 13 Monate. Ein neuer Administrator löst sofort einen Alarm aus.',
  },
  {
    title: 'Performance und SEO',
    detail: 'PageSpeed-Werte und Core Web Vitals mit Verlauf, dazu Indexierung, Search Console und Analytics der Seite.',
  },
  {
    title: 'Barrierefreiheit',
    detail: 'Ein automatischer Teil-Check mit Befunden und Verlauf. Er ersetzt keine Prüfung nach WCAG, zeigt aber früh, was kippt.',
  },
  {
    title: 'Mail-Zustellung',
    detail: 'Einmal am Tag eine Testmail über den echten Mailweg der Seite, dazu SPF, DKIM und DMARC der Domain. So fällt ein stilles Kontaktformular auf.',
  },
  {
    title: 'Domain und Hoster',
    detail: 'Ablauf der Domain, Nameserver, Mailserver, IP-Adressen und der Hoster von Website und Server.',
  },
  {
    title: 'Alarme',
    detail: 'In Slack oder an eine Team-Adresse, dazu persönliche Alarme mit Ruhezeiten und jeden Montag eine Übersicht.',
  },
]

/** Geplant für Cloud. */
export const cloudComingSoon: CloudFeature[] = [
  {
    title: 'Updates mit einem Klick aus der Ferne',
    detail: 'Core, Plugins und Themes einzeln oder gebündelt aktualisieren, direkt aus dem Dashboard. Eine gemeldete Lücke ist so mit einem Klick geschlossen, statt nur abgefangen.',
  },
  {
    title: 'Sichere Updates mit Rollback',
    detail: 'Vor jedem Update ein Backup, danach ein visueller Vergleich der wichtigsten Seiten. Weicht etwas ab, geht es zurück auf den Stand davor.',
  },
  {
    title: 'Wartungs- und Update-Planung',
    detail: 'Updates und Wartungsfenster im Voraus planen, für einzelne Seiten oder den ganzen Bestand.',
  },
  {
    title: 'Backups',
    detail: 'Regelmässige Sicherungen der Kundenseiten, zentral im Dashboard.',
  },
  {
    title: 'Kundenberichte mit eigenem Logo',
    detail: 'Monatliche Berichte über Wartung, Updates und Verfügbarkeit, im Auftritt deiner Agentur.',
  },
  {
    title: 'Malware-Scanner',
    detail: 'Prüft die Kundenseiten auf Schadcode und meldet Funde wie jeden anderen Alarm.',
  },
]
