import { SITE } from '../config/site'

/** Lokal per `VITE_LICENSE_URL` auf einen eigenen Server umstellbar. */
const licenseUrl: string = import.meta.env.VITE_LICENSE_URL || SITE.licenseUrl

/**
 * Anmeldung zum Testen beim Lizenz-Server. Er schickt den Link zum Anmelden
 * per E-Mail; die Antwort ist für neue und bestehende Adressen dieselbe.
 *
 * Gibt den HTTP-Status zurück, 0 ohne Verbindung.
 */
export async function requestTrialLink(email: string): Promise<number> {
  try {
    const res = await fetch(`${licenseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    return res.status
  } catch {
    return 0
  }
}

export const downloadUrl = `${licenseUrl}/download`

/** Was der Mensch tun kann, je nach Antwort des Servers. */
export function trialErrorText(status: number): string {
  if (status === 400) return 'Diese Adresse sieht nicht gültig aus. Prüfe sie bitte.'
  if (status === 429) return 'Für diese Adresse gingen gerade mehrere Links raus. Warte zehn Minuten und versuche es dann erneut.'
  if (status === 0) return 'Keine Verbindung zum Server. Prüfe deine Internetverbindung und versuche es erneut.'
  return 'Der Server hat gerade ein Problem. Versuche es in ein paar Minuten erneut.'
}
