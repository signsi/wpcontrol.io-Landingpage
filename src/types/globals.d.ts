/**
 * Beim Build eingesetzt (siehe `define` in vite.config.ts).
 *
 * Wichtig für das Prerendering: `new Date().getFullYear()` im Render würde
 * zwischen Serverlauf und Hydration auseinanderlaufen können. Ein zur Bauzeit
 * eingesetzter Wert ist auf beiden Seiten identisch.
 */
declare const __BUILD_YEAR__: number
