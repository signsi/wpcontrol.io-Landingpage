import type { RouteRecord } from 'vite-react-ssg'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import BlogPostPage from './pages/blog/BlogPostPage'
import BlogCategoryPage from './pages/blog/BlogCategoryPage'
import HelpArticlePage from './pages/hilfe/HelpArticlePage'
import HelpCategoryPage from './pages/hilfe/HelpCategoryPage'
import LegalPage from './pages/legal/LegalPage'
import {
  getAllGuides,
  getAllPosts,
  getBlogCategories,
  getChangelog,
  getGuideTree,
  getLegalDocs,
} from './lib/content'

/**
 * Bewusst werden pro Inhalt konkrete Routen erzeugt statt `:slug` +
 * `getStaticPaths`. Vorteile:
 *   - alle Routen sind statisch, vite-react-ssg rendert sie ohne Zusatzkonfiguration vor
 *   - jeder Beitrag bekommt einen eigenen Chunk
 *   - ein unbekannter Slug landet auf einer echten 404 statt auf einer leeren Hülle
 */

const blogRoutes: RouteRecord[] = getAllPosts().map((post) => ({
  path: `blog/${post.slug}`,
  lazy: async () => {
    const { default: Body } = await post.load()
    return {
      Component: function BlogPostRoute() {
        return <BlogPostPage slug={post.slug} Body={Body} />
      },
    }
  },
}))

const blogCategoryRoutes: RouteRecord[] = getBlogCategories().map((category) => ({
  path: `blog/kategorie/${category.slug}`,
  element: <BlogCategoryPage category={category.slug} />,
}))

const guideRoutes: RouteRecord[] = getAllGuides().map((guide) => ({
  path: `anleitungen/${guide.category}/${guide.slug}`,
  lazy: async () => {
    const { default: Body } = await guide.load()
    return {
      Component: function GuideRoute() {
        return <HelpArticlePage category={guide.category} slug={guide.slug} Body={Body} />
      },
    }
  },
}))

const guideCategoryRoutes: RouteRecord[] = getGuideTree().map((category) => ({
  path: `anleitungen/${category.slug}`,
  element: <HelpCategoryPage category={category.slug} />,
}))

const legalRoutes: RouteRecord[] = getLegalDocs().map((doc) => ({
  path: doc.slug,
  lazy: async () => {
    const { default: Body } = await doc.load()
    return {
      Component: function LegalRoute() {
        return <LegalPage slug={doc.slug} Body={Body} />
      },
    }
  },
}))

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <SiteLayout />,
    entry: 'src/layouts/SiteLayout.tsx',
    children: [
      { index: true, element: <HomePage />, entry: 'src/pages/HomePage.tsx' },

      // Produkt
      { path: 'produkt', lazy: () => import('./pages/ProduktPage').then((m) => ({ Component: m.default })) },
      { path: 'produkt/funktionen', lazy: () => import('./pages/FeaturesPage').then((m) => ({ Component: m.default })) },
      { path: 'standalone', lazy: () => import('./pages/StandalonePage').then((m) => ({ Component: m.default })) },
      { path: 'cloud', lazy: () => import('./pages/CloudPage').then((m) => ({ Component: m.default })) },
      { path: 'massgeschneidert', lazy: () => import('./pages/CustomPage').then((m) => ({ Component: m.default })) },
      { path: 'vergleich', lazy: () => import('./pages/VergleichPage').then((m) => ({ Component: m.default })) },
      { path: 'preise', lazy: () => import('./pages/PreisePage').then((m) => ({ Component: m.default })) },
      { path: 'demo', lazy: () => import('./pages/DemoPage').then((m) => ({ Component: m.default })) },
      { path: 'faq', lazy: () => import('./pages/FaqPage').then((m) => ({ Component: m.default })) },

      // Ressourcen
      { path: 'blog', lazy: () => import('./pages/blog/BlogIndexPage').then((m) => ({ Component: m.default })) },
      ...blogCategoryRoutes,
      ...blogRoutes,
      { path: 'anleitungen', lazy: () => import('./pages/hilfe/HelpIndexPage').then((m) => ({ Component: m.default })) },
      ...guideCategoryRoutes,
      ...guideRoutes,
      {
        path: 'changelog',
        // Der Changelog zeigt alle Einträge auf einer Seite, deshalb werden
        // ihre Texte vorab geladen und als Props übergeben.
        lazy: async () => {
          const entries = getChangelog()
          const [{ default: ChangelogPage }, ...loaded] = await Promise.all([
            import('./pages/ChangelogPage'),
            ...entries.map((entry) => entry.load()),
          ])
          const bodies = Object.fromEntries(
            entries.map((entry, i) => [entry.version, loaded[i].default]),
          )
          return {
            Component: function ChangelogRoute() {
              return <ChangelogPage bodies={bodies} />
            },
          }
        },
      },
      { path: 'downloads', lazy: () => import('./pages/DownloadsPage').then((m) => ({ Component: m.default })) },

      // Unternehmen
      { path: 'ueber-uns', lazy: () => import('./pages/UeberUnsPage').then((m) => ({ Component: m.default })) },
      { path: 'kontakt', lazy: () => import('./pages/KontaktPage').then((m) => ({ Component: m.default })) },
      { path: 'support', lazy: () => import('./pages/SupportPage').then((m) => ({ Component: m.default })) },

      // Recht
      ...legalRoutes,

      // 404: '/404' wird als eigene Datei gebaut (Fallback des Hostings),
      // '*' fängt Fehleingaben im laufenden Betrieb ab.
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
