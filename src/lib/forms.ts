/**
 * Gemeinsame Absende-Schnittstelle für Kontakt und Newsletter. Die Anmeldung
 * zum Testen läuft über den Lizenz-Server (`lib/trial.ts`).
 *
 * Beide Formulare gehen an `public/api/form.php`, das nach dem Build unter
 * `/api/form.php` auf dem PHP-Webhosting liegt und die Anfrage per Mail
 * weiterleitet. Lokal (`npm run dev`) gibt es kein PHP; dort lässt sich der
 * Endpunkt mit `VITE_FORM_URL` auf einen Testserver umstellen.
 */

export type FormKind = 'kontakt' | 'newsletter'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface FormResult {
  ok: boolean
  message: string
}

const formUrl: string = import.meta.env.VITE_FORM_URL || '/api/form.php'

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

const failureMessage =
  'Das hat leider nicht geklappt. Bitte versuche es erneut oder schreib direkt an hallo@wporbit.ch.'

const successMessages: Record<FormKind, string> = {
  kontakt: 'Danke für deine Nachricht. Wir melden uns innerhalb von zwei Arbeitstagen.',
  newsletter: 'Danke! Du erhältst neue Beiträge künftig per E-Mail.',
}

export async function submitForm(
  kind: FormKind,
  payload: Record<string, string>,
): Promise<FormResult> {
  // Honeypot: von echten Personen nie ausgefüllt. Wir tun so, als wäre alles
  // in Ordnung, damit der Bot keine Rückmeldung zum Filter bekommt.
  if (payload.website) {
    return { ok: true, message: successMessages[kind] }
  }

  try {
    const res = await fetch(formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...payload }),
    })
    if (res.status === 429) {
      return { ok: false, message: 'Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten nochmals.' }
    }
    if (!res.ok) {
      return { ok: false, message: failureMessage }
    }
  } catch {
    return { ok: false, message: failureMessage }
  }

  return { ok: true, message: successMessages[kind] }
}
