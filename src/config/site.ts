/**
 * Zentrale Stammdaten der Website.
 *
 * ACHTUNG: `url` bestimmt Canonical-Links, Open-Graph-URLs und die Sitemap.
 * Vor dem ersten Deploy prüfen — das Repository heisst "wpcontrol.io",
 * die Marke im Code ist durchgehend "WPorbit".
 */
export const SITE = {
  url: 'https://wporbit.io',
  name: 'WPorbit',
  titleTemplate: '%s | WPorbit',
  defaultTitle: 'WPorbit — Vom Setup bis zur Wartung. Ein Cockpit.',
  defaultDescription:
    'Der Desktop-Workspace für WordPress-Agenturen: Projekte, Zugänge und Veröffentlichungen an einem Ort. Ohne Hoster-Bindung, entwickelt und gehostet in der Schweiz.',
  locale: 'de_CH',
  lang: 'de-CH',
  timeZone: 'Europe/Zurich',
  defaultOgImage: '/og/default.jpg',
  blogOgImage: '/og/blog.jpg',
  guideOgImage: '/og/anleitungen.jpg',
  email: 'hallo@wporbit.io',
  country: 'CH',
} as const
