/**
 * Nur die Slugs der Seiten /vergleich/<slug>-alternative. Bewusst getrennt von
 * `alternatives.ts`, damit die Routen-Definition (Haupt-Bundle) die Texte
 * nicht mitlädt. Jeder Slug braucht einen Eintrag in `alternatives.ts`.
 */
export const ALTERNATIVE_SLUGS = ['managewp', 'wp-umbrella', 'mainwp', 'infinitewp', 'wp-remote'] as const

export type AlternativeSlug = (typeof ALTERNATIVE_SLUGS)[number]

export const alternativePath = (slug: string) => `/vergleich/${slug}-alternative`
