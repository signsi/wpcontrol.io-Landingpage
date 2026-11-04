import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { PinIcon } from '../components/cloud/icons'
import { breadcrumbLd } from '../lib/jsonld'

/*
 * ENTWURF. Alle Aussagen stammen aus /sicherheit, /cloud und der
 * Datenschutzerklärung. Nichts hier darf weiter gehen als diese Seiten.
 * TODO Patrick: Texte prüfen, besonders „Wo was liegt“ und die Grenzen.
 */

const crumbs = [{ label: 'Entwickelt & gehostet in der Schweiz', path: '/entwickelt-und-gehostet-in-der-schweiz' }]

const places = [
  { what: 'Entwickelt', where: 'Rotkreuz ZG', who: 'viwiv GmbH' },
  { what: 'Gehostet', where: 'Zürich', who: 'Rechenzentren von Nine' },
  { what: 'Gespeichert', where: 'Zürich', who: 'Datenbank und Sicherungen' },
]

const reasons = [
  {
    title: 'Schweizer Recht, klare Zuständigkeit',
    text: 'Die viwiv GmbH ist ein Schweizer Unternehmen. WPorbit richtet sich nach dem Schweizer Datenschutzgesetz (revDSG) und, wo anwendbar, nach der DSGVO. Dein Ansprechpartner sitzt in Rotkreuz, nicht hinter einem Ticketsystem im Ausland.',
  },
  {
    title: 'Kundendaten bleiben im Land',
    text: 'Agenturen verwalten Zugänge ihrer Kundschaft. Server und Datenbank des Team-Dashboards stehen in Zürich, damit du Kundinnen und Kunden eine einfache Antwort auf die Frage «Wo liegen die Daten?» geben kannst.',
  },
  {
    title: 'Weniger Daten, die überhaupt liegen',
    text: 'Zugangsdaten deiner Projekte liegen verschlüsselt auf deinem Mac. Im Team geteilte Werte sind Ende-zu-Ende verschlüsselt: Der Server und wir als Betreiber können sie nicht lesen.',
  },
]

const stack = [
  { name: 'Nine Internet Solutions AG', place: 'Zürich', role: 'Lizenzserver, Team-Dashboard, Datenbank' },
  { name: 'Infomaniak Network SA', place: 'Genf', role: 'E-Mail-Postfächer und Versand der E-Mails des Lizenzservers' },
  { name: 'METANET AG', place: 'Zürich', role: 'Diese Website und das Kontaktformular' },
]

const faq = [
  {
    q: 'Wo werden meine Daten gespeichert?',
    a: 'Server und Datenbank des Team-Dashboards stehen in Rechenzentren von Nine in Zürich. Zugangsdaten, lokale Datenbanken, Dateien und Themes bleiben auf deinem Mac.',
  },
  {
    q: 'Ist WPorbit DSGVO-konform?',
    a: 'WPorbit richtet sich nach dem Schweizer revDSG und, wo anwendbar, nach der DSGVO. Einen Auftragsbearbeitungsvertrag (AVV) schicken wir dir auf Anfrage an datenschutz@wporbit.ch.',
  },
  {
    q: 'Gibt es Daten, die die Schweiz verlassen?',
    a: 'Ja, in zwei Fällen. Für Performance-Messungen geht die Adresse einer Website an Google PageSpeed. Und wenn du Slack als Alarmkanal wählst, gehen die Meldungen dorthin. Beides ist unter «Sicherheit & Datenschutz» aufgeführt. Die Website-Analyse läuft nur mit deiner Einwilligung.',
  },
  {
    q: 'Wer entwickelt WPorbit?',
    a: 'Die viwiv GmbH in Rotkreuz. Patrick Williner baut App und Server und nutzt WPorbit täglich für eigene Kundenprojekte.',
  },
]

function SectionHead({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="reveal-up mb-10 max-w-[46rem]">
      <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">{kicker}</p>
      <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
        {title}
      </h2>
      {lead && <p className="mt-3 text-[0.95rem] leading-[1.75] text-secondary">{lead}</p>}
    </div>
  )
}

export default function SchweizPage() {
  return (
    <>
      <Seo
        title="WordPress-Tool aus der Schweiz, gehostet in Zürich"
        description="WPorbit wird in Rotkreuz entwickelt und in Zürich gehostet. Wo Server, Datenbank und Zugangsdaten liegen, was die Schweiz nicht verlässt und wo die Grenzen sind."
        path="/entwickelt-und-gehostet-in-der-schweiz"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Schweiz"
        title="Entwickelt und gehostet in der Schweiz"
        lead="WPorbit entsteht in Rotkreuz, das Team-Dashboard läuft in Zürich. Diese Seite zeigt, was das konkret heisst: wer was betreibt, wo welche Daten liegen und was trotzdem ins Ausland geht."
        crumbs={crumbs}
      />

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Auf einen Blick"
          title="Drei Orte, alle in der Schweiz"
        />
        <ul className="stagger-group grid grid-cols-1 gap-4 sm:grid-cols-3">
          {places.map((place) => (
            <li key={place.what} className="flex items-start gap-3 rounded-panel border border-line bg-surface p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-control bg-accent-tint text-accent"><PinIcon /></span>
              <span>
                <span className="block text-[0.72rem] text-tertiary">{place.what}</span>
                <span className="block font-heading text-[1.05rem] font-semibold text-primary">{place.where}</span>
                <span className="block text-[0.8rem] text-secondary">{place.who}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Warum das zählt"
          title="Was dir ein Schweizer Standort bringt"
          lead="Ein Standort allein macht nichts sicher. Er macht aber Zuständigkeit und Rechtslage einfacher, und das merkst du spätestens bei der ersten Frage einer Kundin."
        />
        <div className="stagger-group grid gap-4 md:grid-cols-3">
          {reasons.map((r) => (
            <article key={r.title} className="rounded-panel border border-line bg-surface p-6">
              <h3 className="mb-2 font-heading text-[1.0625rem] font-semibold text-primary">{r.title}</h3>
              <p className="text-[0.9rem] leading-[1.7] text-secondary">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Wer betreibt was"
          title="Die Schweizer Anbieter hinter WPorbit"
          lead="Wir setzen auf Anbieter mit Sitz in der Schweiz. Sie sind zugleich unsere Unterauftragsbearbeiter."
        />
        <ul className="stagger-group mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stack.map((s) => (
            <li key={s.name} className="rounded-panel border border-line bg-surface p-5">
              <p className="font-heading text-[1rem] font-semibold text-primary">{s.name}</p>
              <p className="text-[0.78rem] text-tertiary">{s.place}</p>
              <p className="mt-2 text-[0.86rem] leading-[1.65] text-secondary">{s.role}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-[60ch] text-[0.82rem] leading-[1.65] text-tertiary">
          Die vollständige Liste mit den rechtlichen Grundlagen steht unter{' '}
          <Link to="/sicherheit" className="underline hover:text-accent">Sicherheit &amp; Datenschutz</Link> und in der{' '}
          <Link to="/datenschutz" className="underline hover:text-accent">Datenschutzerklärung</Link>.
        </p>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <div className="reveal-up prose-article">
          <h2>Was nicht in der Schweiz bleibt</h2>
          <p>
            «Gehostet in der Schweiz» ist keine Garantie für jedes einzelne Datenbyte, und wir behaupten das nicht.
            Zwei Dinge verlassen das Land:
          </p>
          <ul>
            <li>
              <strong>Performance-Messungen:</strong> Dafür fragt das Dashboard Google PageSpeed an. Die Adresse der
              überwachten Website geht dabei an Google.
            </li>
            <li>
              <strong>Alarme in Slack:</strong> Optional. Wählst du Slack als Kanal, gehen die Meldungen dorthin.
            </li>
          </ul>
          <p>
            Die Analyse dieser Website mit Google Analytics läuft nur, wenn du einwilligst.
          </p>
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead kicker="Häufige Fragen" title="Daten und Standort" />
        <dl className="stagger-group grid max-w-[52rem] gap-4">
          {faq.map((item) => (
            <div key={item.q} className="rounded-panel border border-line bg-surface p-6">
              <dt className="mb-2 font-heading text-[1.0625rem] font-semibold text-primary">{item.q}</dt>
              <dd className="text-[0.9rem] leading-[1.7] text-secondary">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CTABand
        title="Kundschaft fragt, wo die Daten liegen?"
        text="Probier WPorbit zehn Tage aus oder schreib uns, was deine Kundin wissen will. Wir antworten direkt."
        primary={{ label: '10 Tage gratis testen', to: '/testen' }}
        secondary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
      />
    </>
  )
}
