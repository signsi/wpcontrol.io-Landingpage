/**
 * Messung über den Google Tag Manager (geladen in index.html).
 *
 * Alles geht in die `dataLayer`; welche Tags daraus etwas machen, steht im
 * GTM. Ohne Zustimmung gelten die Standardwerte aus index.html (Consent Mode,
 * alles verweigert): Google erhält dann nur cookielose Pings.
 *
 * Nie Personendaten mitschicken, insbesondere keine E-Mail-Adressen.
 */

export type Consent = 'granted' | 'denied'

const STORAGE_KEY = 'wporbit-consent'
/** Ereignis, auf das der Banner hört, um sich erneut zu öffnen. */
export const OPEN_CONSENT_EVENT = 'wporbit:open-consent'

type DataLayer = unknown[]

function dataLayer(): DataLayer | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { dataLayer?: DataLayer }
  w.dataLayer = w.dataLayer || []
  return w.dataLayer
}

/** Wie `gtag()` aus dem Snippet: schiebt das `arguments`-Objekt in die dataLayer. */
function gtag(..._args: unknown[]): void {
  // GTM erkennt Consent-Befehle nur als echtes `arguments`-Objekt.
  // eslint-disable-next-line prefer-rest-params
  dataLayer()?.push(arguments)
}

export function track(event: string, params: Record<string, string | number | undefined> = {}): void {
  dataLayer()?.push({ event, ...params })
}

export function getConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Ohne Speicher gilt die Wahl nur für diesen Besuch.
  }
  gtag('consent', 'update', { analytics_storage: value })
  track('consent_update', { analytics_storage: value })
  if (value === 'denied') removeAnalyticsCookies()
}

/** Beim Widerruf: die Cookies von Google Analytics (`_ga`, `_ga_<ID>`) löschen. */
function removeAnalyticsCookies(): void {
  const host = window.location.hostname
  const domains = ['', host, `.${host.replace(/^www\./, '')}`]
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0]?.trim()
    if (!name || !/^_ga(_|$)/.test(name)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

/** Öffnet den Banner erneut, z. B. über „Cookie-Einstellungen“ im Footer. */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
