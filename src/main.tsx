import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes'

/**
 * Einstiegspunkt für Prerendering und Hydration.
 *
 * ViteReactSSG übernimmt beide Seiten: beim Build rendert es jede Route in
 * statisches HTML, im Browser löst es die passenden `lazy`-Routen auf und
 * hydratisiert erst danach — deshalb blitzt kein leerer Zustand auf.
 * Kein manueller `createRoot`-Aufruf, die Bibliothek besitzt die Wurzel.
 */
export const createRoot = ViteReactSSG({ routes })
