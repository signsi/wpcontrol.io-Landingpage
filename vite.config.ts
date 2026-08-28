import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeSlug from 'rehype-slug'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import { contentIndexPlugin } from './build/content-index'
import { writeSeoFiles } from './build/seo'

// vite-react-ssg 0.9.2 erweitert Vites `UserConfig` nicht um `ssgOptions`.
// Über eine typisierte Variable statt eines Objektliterals greift die
// Excess-Property-Prüfung nicht, und die Optionen bleiben trotzdem geprüft.
const config: UserConfig & { ssgOptions: ViteReactSSGOptions } = {
  plugins: [
    contentIndexPlugin(),
    // `enforce: 'pre'` ist zwingend: MDX muss vor @vitejs/plugin-react laufen.
    // remark-frontmatter entfernt den YAML-Block aus dem gerenderten Text;
    // ausgewertet wird er in build/content-index.ts.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],

  define: {
    // Zur Bauzeit eingesetzt, damit Prerender und Hydration denselben Wert sehen.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },

  ssgOptions: {
    entry: 'src/main.tsx',
    // 'flat' erzeugt dist/blog/mein-artikel.html statt .../index.html —
    // damit stellt sich die Trailing-Slash-Frage gar nicht erst.
    dirStyle: 'flat',
    concurrency: 8,
    // 'prettify' formatiert das HTML nach und löst Hydration-Fehler aus.
    formatting: 'none',
    beastiesOptions: false,
    includedRoutes: (paths: string[]) => [
      // '/*' ist die Catch-all-Route im Browser und darf nicht gerendert werden;
      // '/404' liegt bereits als eigene Route vor, deshalb dedupliziert.
      ...new Set([...paths.filter((p) => !p.includes(':') && p !== '/*'), '/404']),
    ],
    onFinished: () => writeSeoFiles('dist'),
  },
}

export default defineConfig(config)
