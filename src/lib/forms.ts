/**
 * Gemeinsame Absende-Schnittstelle für Demo-Anmeldung, Kontakt und Newsletter.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ ANSCHLUSSPUNKT: Aktuell wird kein Backend angesprochen. Sobald ein   │
 * │ Endpunkt existiert, genügt es, `submitForm` zu ersetzen — alle drei  │
 * │ Formulare hängen daran und brauchen keine Änderung.                  │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type FormKind = 'demo' | 'kontakt' | 'newsletter'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface FormResult {
  ok: boolean
  message: string
}

const SIMULATED_LATENCY_MS = 700

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

const successMessages: Record<FormKind, string> = {
  demo: 'Danke! Der Download-Link ist unterwegs zu dir.',
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

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  // TODO: Hier den echten Endpunkt aufrufen, z. B.
  // const res = await fetch('/api/forms', { method: 'POST', body: JSON.stringify({ kind, ...payload }) })
  // if (!res.ok) return { ok: false, message: 'Das hat leider nicht geklappt. Bitte versuche es erneut.' }

  return { ok: true, message: successMessages[kind] }
}
