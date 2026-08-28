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
  description: string
}

export const blogCategories: TaxonomyEntry[] = [
  {
    slug: 'agenturbetrieb',
    label: 'Agenturbetrieb',
    description: 'Kalkulation, Prozesse und Teamorganisation im WordPress-Alltag.',
  },
  {
    slug: 'wartung',
    label: 'Wartung & Updates',
    description: 'Updates, Backups und der laufende Betrieb von Kundenprojekten.',
  },
  {
    slug: 'workflow',
    label: 'Workflow & Automatisierung',
    description: 'Von der lokalen Umgebung bis zur Veröffentlichung ohne Umwege.',
  },
  {
    slug: 'sicherheit',
    label: 'Sicherheit & Compliance',
    description: 'Zugänge, Härtung sowie revDSG und DSGVO für Schweizer Agenturen.',
  },
  {
    slug: 'hosting',
    label: 'Hosting & Infrastruktur',
    description: 'Anbieter, PHP-Versionen und Umgebungen im Vergleich.',
  },
  {
    slug: 'produkt',
    label: 'Produkt',
    description: 'Was sich in WPorbit verändert und warum.',
  },
]

export const guideCategories: TaxonomyEntry[] = [
  {
    slug: 'erste-schritte',
    label: 'Erste Schritte',
    description: 'Installation, Lizenz und das erste Projekt in WPorbit.',
  },
  {
    slug: 'projekte',
    label: 'Projekte & Kunden',
    description: 'Projekte anlegen, bestehende Websites übernehmen und organisieren.',
  },
  {
    slug: 'entwicklung',
    label: 'Lokale Entwicklung',
    description: 'Umgebungen starten, PHP-Versionen wählen und Datenbanken verwalten.',
  },
  {
    slug: 'veroeffentlichen',
    label: 'Veröffentlichen & Deployment',
    description: 'Änderungen live bringen, synchronisieren und zurückrollen.',
  },
  {
    slug: 'zugaenge',
    label: 'Zugänge & Vault',
    description: 'Zugangsdaten sicher hinterlegen und im Team freigeben.',
  },
  {
    slug: 'wartung',
    label: 'Wartung & Updates',
    description: 'Updates gegen Staging testen und Wartung planen.',
  },
  {
    slug: 'fehlerbehebung',
    label: 'Fehlerbehebung',
    description: 'Häufige Fehlerbilder erkennen und selbst beheben.',
  },
  {
    slug: 'konto',
    label: 'Konto & Lizenz',
    description: 'Lizenz, Abo und Abrechnung verwalten.',
  },
]

export function blogCategory(slug: string): TaxonomyEntry | undefined {
  return blogCategories.find((c) => c.slug === slug)
}

export function guideCategory(slug: string): TaxonomyEntry | undefined {
  return guideCategories.find((c) => c.slug === slug)
}
