/**
 * Einzige Quelle für Topbar und Footer.
 *
 * Der frühere `variant`-Prop der Topbar ('landing' | 'features') entfällt:
 * er existierte nur, weil Unterseiten keine echten Routen für Preise und
 * Vergleich hatten und deshalb auf Landing-Anker verweisen mussten.
 */

export interface NavLinkItem {
  label: string
  to: string
  description?: string
  badge?: string
}

export interface NavColumn {
  heading: string
  items: NavLinkItem[]
}

export interface NavGroup {
  label: string
  /** Direkter Link ohne Ausklappmenü. */
  to?: string
  /** Zweispaltiges Mega-Menü. */
  columns?: NavColumn[]
  /** Einspaltiges Dropdown. */
  items?: NavLinkItem[]
  /** Aktiv-Zustand: Pfade, die diese Gruppe markieren. */
  matches?: string[]
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Produkt',
    matches: ['/produkt', '/standalone', '/cloud', '/massgeschneidert', '/vergleich'],
    columns: [
      {
        heading: 'Plattform',
        items: [
          { label: 'Überblick', to: '/produkt', description: 'Was WPorbit über den ganzen Projektverlauf abdeckt' },
          { label: 'Funktionen', to: '/produkt/funktionen', description: 'Alle Funktionen im Detail' },
          { label: 'Vergleich', to: '/vergleich', description: 'WPorbit, Local WP und WordPress Studio' },
        ],
      },
      {
        heading: 'Pläne',
        items: [
          { label: 'Standalone', to: '/standalone', description: 'Für Einzelne, die unabhängig arbeiten' },
          { label: 'Cloud', to: '/cloud', description: 'Gemeinsamer Arbeitsbereich fürs Team', badge: 'In Entwicklung' },
          { label: 'Massgeschneidert', to: '/massgeschneidert', description: 'CRM, ERP und eigene Abläufe' },
        ],
      },
    ],
  },
  { label: 'Preise', to: '/preise', matches: ['/preise'] },
  {
    label: 'Ressourcen',
    matches: ['/blog', '/anleitungen', '/changelog', '/downloads'],
    items: [
      { label: 'Blog', to: '/blog', description: 'Tipps, Tricks und Praxiswissen' },
      { label: 'Anleitungen', to: '/anleitungen', description: 'Schritt für Schritt durch WPorbit' },
      { label: 'Changelog', to: '/changelog', description: 'Was sich in WPorbit verändert' },
      { label: 'Downloads', to: '/downloads', description: 'Aktuelle Version und Voraussetzungen' },
    ],
  },
  {
    label: 'Unternehmen',
    matches: ['/ueber-uns', '/kontakt', '/support'],
    items: [
      { label: 'Über uns', to: '/ueber-uns', description: 'Aus dem Agenturalltag entstanden' },
      { label: 'Kontakt', to: '/kontakt', description: 'Fragen, Demo-Termin oder Offerte' },
      { label: 'Support', to: '/support', description: 'Hilfe für bestehende Kunden' },
    ],
  },
]

/** Sekundäres Ziel für Bestandskunden, primäres für Interessenten. */
export const secondaryCta = { label: 'Anleitungen', to: '/anleitungen' }
export const primaryCta = { label: 'Gratis testen', to: '/demo' }

export interface FooterColumn {
  heading: string
  items: NavLinkItem[]
}

export const footerNav: FooterColumn[] = [
  {
    heading: 'Produkt',
    items: [
      { label: 'Überblick', to: '/produkt' },
      { label: 'Funktionen', to: '/produkt/funktionen' },
      { label: 'Standalone', to: '/standalone' },
      { label: 'Cloud', to: '/cloud' },
      { label: 'Massgeschneidert', to: '/massgeschneidert' },
      { label: 'Vergleich', to: '/vergleich' },
      { label: 'Preise', to: '/preise' },
    ],
  },
  {
    heading: 'Ressourcen',
    items: [
      { label: 'Blog', to: '/blog' },
      { label: 'Anleitungen', to: '/anleitungen' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Downloads', to: '/downloads' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    heading: 'Unternehmen',
    items: [
      { label: 'Über uns', to: '/ueber-uns' },
      { label: 'Kontakt', to: '/kontakt' },
      { label: 'Support', to: '/support' },
      { label: 'Gratis testen', to: '/demo' },
    ],
  },
  {
    heading: 'Rechtliches',
    items: [
      { label: 'Impressum', to: '/impressum' },
      { label: 'Datenschutz', to: '/datenschutz' },
      { label: 'AGB', to: '/agb' },
    ],
  },
]
