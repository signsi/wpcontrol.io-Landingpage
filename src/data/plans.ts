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
    badge: `${TRIAL_DAYS} Tage · 1 Projekt`,
    features: ['Voller Funktionsumfang', 'Direkter Download', 'Keine Kreditkarte'],
    highlighted: false,
    href: '/demo',
    cta: 'Kostenlos testen',
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
    note: `Für Teams, die Projekte und Wissen gemeinsam weiterführen. ${CLOUD_INCLUDED_SEATS} Personen inklusive.`,
    badge: 'In Entwicklung',
    features: [
      'Gemeinsamer Stand aller Projekte',
      'Dort weiterarbeiten, wo das Team aufgehört hat',
      'Gemeinsame Standards und Know-how',
      'Zugänge für Berechtigte verfügbar',
      'Websites überwachen und Wartung planen',
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
    a: `Nein. Die Demo läuft ${TRIAL_DAYS} Tage mit vollem Funktionsumfang und einem Projekt. Es braucht nur eine E-Mail-Adresse, keine Kreditkarte, und sie endet automatisch.`,
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
