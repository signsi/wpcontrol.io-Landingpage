/**
 * Einzige Quelle für Preise, Limits und Leistungsumfang.
 *
 * Vorher standen dieselben Angaben in Pricing.tsx, StandalonePage.tsx und
 * KONZEPT.md und widersprachen sich („Max. 3" vs. „Max. 10 Projekte",
 * „ab 40 CHF" vs. „ab 290 CHF"). Alle Seiten lesen jetzt von hier.
 */

export interface Plan {
  id: 'demo' | 'standalone' | 'cloud' | 'custom'
  name: string
  priceMain: string
  priceSub: string
  /** Numerischer Monatspreis für JSON-LD; null, wenn kostenlos oder auf Anfrage. */
  priceValue: number | null
  note: string
  badge: string
  features: string[]
  highlighted: boolean
  href: string
  cta: string
}

export const STANDALONE_PROJECT_LIMIT = 10
export const STANDALONE_PRICE_CHF = 290
export const CLOUD_PRICE_CHF = 1200
export const CLOUD_INCLUDED_SEATS = 3
export const TRIAL_DAYS = 10

export const plans: Plan[] = [
  {
    id: 'demo',
    name: 'Demo',
    priceMain: 'Kostenlos',
    priceSub: '',
    priceValue: 0,
    note: `${TRIAL_DAYS} Tage gratis. Voller Funktionsumfang. Kein Risiko.`,
    badge: `${TRIAL_DAYS} Tage · voller Umfang`,
    features: ['Voller Funktionsumfang', 'Direkter Download', 'Keine Kreditkarte'],
    highlighted: false,
    href: '/testen',
    cta: '10 Tage gratis testen',
  },
  {
    id: 'standalone',
    name: 'Standalone',
    priceMain: `ab ${STANDALONE_PRICE_CHF}`,
    priceSub: 'CHF / Person / Monat',
    priceValue: STANDALONE_PRICE_CHF,
    note: `Für Einzelpersonen, die bis zu ${STANDALONE_PROJECT_LIMIT} Projekte unabhängig verwalten.`,
    badge: `Max. ${STANDALONE_PROJECT_LIMIT} Projekte`,
    features: [
      'Ohne technische Einrichtung starten',
      'Alle Projekte im Blick',
      'Zugänge sicher verwahrt',
      'Änderungen sicher veröffentlichen',
    ],
    highlighted: false,
    href: '/standalone',
    cta: 'Details ansehen',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    priceMain: `ab ${CLOUD_PRICE_CHF}`,
    priceSub: 'CHF / Monat',
    priceValue: CLOUD_PRICE_CHF,
    note: `Die App plus Team-Dashboard für alle Kundenseiten. ${CLOUD_INCLUDED_SEATS} Personen inklusive.`,
    badge: 'Release bis Ende 2026',
    features: [
      'Team-Dashboard für alle Kundenseiten',
      'Ohne Plugin auf der Kundenseite',
      'Projekte und Zugänge im Team teilen',
      'Geplant: Updates aus der Ferne, Backups, Berichte',
      'Entwickelt und gehostet in der Schweiz',
    ],
    highlighted: true,
    href: '/cloud',
    cta: 'Mehr über Cloud',
  },
]

export const customPlan = {
  id: 'custom' as const,
  name: 'Massgeschneidert',
  headline: 'Braucht ihr mehr als Standard?',
  note: 'Anbindungen an CRM und ERP, eigene Automatisierungen und persönlicher Support, abgestimmt auf eure Agentur.',
  features: [
    'Alles aus Cloud',
    'Anbindung an CRM und ERP',
    'Abläufe nach Mass',
    'Eigene Abfragen und Automatisierungen',
    'Persönlicher Support',
  ],
  href: '/massgeschneidert',
  cta: 'Auf Anfrage',
}

/** Preis-FAQ für /preise — bewusst getrennt von den allgemeinen FAQ auf /faq. */
export const pricingFaq = [
  {
    q: 'Fallen bei der Demo Kosten an?',
    a: `Nein. Die Demo läuft ${TRIAL_DAYS} Tage mit vollem Funktionsumfang. Es braucht nur eine E-Mail-Adresse, keine Kreditkarte, und sie endet automatisch.`,
  },
  {
    q: `Was passiert nach den ${TRIAL_DAYS} Tagen?`,
    a: 'Der Test endet automatisch, es entstehen keine Kosten. WPorbit zeigt dann „Testzeitraum abgelaufen“ und bleibt gesperrt, bis eine Lizenz aktiv ist. Deine Projekte und Dateien auf dem Mac löscht WPorbit nicht.',
  },
  {
    q: 'Wie kaufe ich eine Lizenz?',
    // TODO Patrick: Zahlungsweg festhalten (Rechnung, Karte, jährlich?) und hier nennen.
    a: 'Schreib uns über das Kontaktformular oder an hallo@wporbit.ch. Wir schalten deine Lizenz frei, und du arbeitest mit demselben Konto und denselben Projekten weiter.',
  },
  {
    q: 'Wird pro Person oder pro Projekt abgerechnet?',
    a: `Standalone wird pro Person abgerechnet und deckt bis zu ${STANDALONE_PROJECT_LIMIT} Projekte ab. Cloud wird pro Team abgerechnet und enthält ${CLOUD_INCLUDED_SEATS} Personen; weitere Personen lassen sich dazubuchen.`,
  },
  {
    q: 'Können wir später von Standalone auf Cloud wechseln?',
    a: 'Ja. Standalone ist bewusst so gebaut, dass die Cloud-Funktionen später dazukommen. Bestehende Projekte und Zugänge bleiben erhalten.',
  },
  {
    q: 'Gibt es eine Mindestlaufzeit?',
    a: 'Nein. Die Abos laufen monatlich und sind auf Ende des laufenden Monats kündbar.',
  },
  {
    q: 'Was kostet die Anbindung an unser CRM oder ERP?',
    a: 'Das hängt vom System und vom Umfang ab. Massgeschneiderte Erweiterungen offerieren wir nach einem gemeinsamen Gespräch.',
  },
]

/** Planvergleich auf /preise. `planned` heisst: geplant, noch nicht verfügbar. */
export type PlanCell = 'yes' | 'no' | 'planned' | { text: string }

export interface PlanMatrixRow {
  label: string
  standalone: PlanCell
  cloud: PlanCell
  custom: PlanCell
}

export interface PlanMatrixGroup {
  heading: string
  rows: PlanMatrixRow[]
}

const appRows: PlanMatrixRow[] = [
  'Lokale WordPress-Umgebung in Containern',
  'Bestehende Websites per SSH übernehmen',
  'Holen, Senden und Deployen',
  'Zugänge verschlüsselt im Tresor',
  'Claude Code im Projekt-Container',
].map((label) => ({ label, standalone: 'yes', cloud: 'yes', custom: 'yes' }))

export function planMatrix(
  cloudToday: { title: string }[],
  cloudPlanned: { title: string }[],
): PlanMatrixGroup[] {
  return [
    {
      heading: 'Abrechnung',
      rows: [
        {
          label: 'Preis',
          standalone: { text: `ab ${STANDALONE_PRICE_CHF} CHF pro Person und Monat` },
          cloud: { text: `ab ${CLOUD_PRICE_CHF} CHF pro Monat, ${CLOUD_INCLUDED_SEATS} Personen inklusive` },
          custom: { text: 'Nach Offerte' },
        },
        // TODO Patrick: Was gilt ab dem 11. Projekt in Standalone, und wie viele Projekte umfasst Cloud?
        {
          label: 'Projekte',
          standalone: { text: `Bis ${STANDALONE_PROJECT_LIMIT}` },
          cloud: { text: 'Für das ganze Team' },
          custom: { text: 'Nach Absprache' },
        },
      ],
    },
    { heading: 'App auf deinem Mac', rows: appRows },
    {
      heading: 'Im Team',
      rows: [
        { label: 'Projekte und Zugänge im Team teilen', standalone: 'no', cloud: 'yes', custom: 'yes' },
        { label: 'Team-Dashboard für alle Kundenseiten', standalone: 'no', cloud: 'yes', custom: 'yes' },
      ],
    },
    {
      heading: 'Überwachung ohne Plugin',
      rows: cloudToday.map((f) => ({ label: f.title, standalone: 'no', cloud: 'yes', custom: 'yes' })),
    },
    {
      heading: 'Geplant für Cloud',
      rows: cloudPlanned.map((f) => ({ label: f.title, standalone: 'no', cloud: 'planned', custom: 'planned' })),
    },
    {
      heading: 'Massgeschneidert',
      rows: customPlan.features
        .filter((f) => f !== 'Alles aus Cloud' && f !== 'Persönlicher Support')
        .map((label) => ({ label, standalone: 'no', cloud: 'no', custom: 'yes' })),
    },
  ]
}
