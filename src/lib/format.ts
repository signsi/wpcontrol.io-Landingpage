import { SITE } from '../config/site'

/**
 * Die Zeitzone wird explizit gesetzt: der Prerender läuft in Node (oft UTC),
 * die Hydration im Browser des Besuchers. Ohne festen `timeZone` können beide
 * ein unterschiedliches Datum ausgeben und React meldet einen Hydration-Fehler.
 */
const dateFormatter = new Intl.DateTimeFormat('de-CH', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: SITE.timeZone,
})

const shortDateFormatter = new Intl.DateTimeFormat('de-CH', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: SITE.timeZone,
})

export function formatDate(iso: string): string {
  if (!iso) return ''
  return dateFormatter.format(new Date(iso))
}

export function formatShortDate(iso: string): string {
  if (!iso) return ''
  return shortDateFormatter.format(new Date(iso))
}

export function readingTimeLabel(minutes: number): string {
  return `${minutes} Min. Lesezeit`
}
