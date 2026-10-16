import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Sicherheit & Datenschutz', path: '/sicherheit' }]

const principles = [
  {
    title: 'Kein Plugin auf Kundenseiten',
    detail:
      'WPorbit installiert nichts in WordPress. Es gibt keinen zusätzlichen Endpunkt, der von aussen erreichbar ist, und damit keine Lücke in einem Überwachungs-Plugin, die alle Kundenseiten gleichzeitig öffnet.',
  },
  {
    title: 'Keine Passwörter beim Server',
    detail:
      'Der WPorbit-Server speichert keinen Zugang zu deinen Kundenservern. Für die Überwachung bekommt er einen eigenen, stark eingeschränkten Lese-Schlüssel. Was du im Team teilst, kann er nicht lesen.',
  },
  {
    title: 'Daten in der Schweiz',
    detail:
      'Server und Datenbank des Team-Dashboards stehen in Rechenzentren von Nine in Zürich. Entwickelt wird WPorbit von der viwiv GmbH in Rotkreuz.',
  },
  {
    title: 'Grenzen offen benennen',
    detail:
      'Jede Lösung hat Grenzen. Wir schreiben sie dazu, weiter unten auf dieser Seite und in der Dokumentation, statt sie zu verschweigen.',
  },
]

const dataRows = [
  {
    what: 'Zugangsdaten deiner Projekte (SSH, WordPress, Datenbank)',
    where: 'Vault auf deinem Mac, verschlüsselt',
    who: 'Du',
  },
  {
    what: 'Im Team geteilte Projektwerte und Zugänge',
    where: 'WPorbit-Server, Ende-zu-Ende verschlüsselt',
    who: 'Die freigegebenen Macs deines Teams. Der Server und wir als Betreiber nicht.',
  },
  {
    what: 'Lokale Datenbanken, Dateien und Themes',
    where: 'Nur auf deinem Mac',
    who: 'Du',
  },
  {
    what: 'Überwachte Projekte: Adresse, Projektname, Kunde',
    where: 'WPorbit-Server, im Klartext',
    who: 'Dein Team. Der Server braucht die Adresse, um die Seite aufzurufen.',
  },
  {
    what: 'Inventar überwachter Sites: Versionen, Plugins, Admin-Logins ohne E-Mail',
    where: 'WPorbit-Server',
    who: 'Dein Team',
  },
  {
    what: 'Konto und Lizenz: E-Mail-Adresse, Gerät',
    where: 'Lizenzserver bei Nine in Zürich',
    who: 'WPorbit, für Anmeldung und Lizenz',
  },
]

const processors = [
  { name: 'Nine Internet Solutions AG', place: 'Zürich', role: 'Lizenzserver, Team-Dashboard, Datenbank' },
  { name: 'Infomaniak Network SA', place: 'Genf', role: 'E-Mail-Postfächer und Versand der E-Mails des Lizenzservers' },
  { name: 'METANET AG', place: 'Zürich', role: 'Website und Kontaktformular' },
  { name: 'Google Ireland Limited', place: 'Dublin', role: 'Analyse der Website, nur mit Einwilligung; Performance-Messungen über PageSpeed' },
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

export default function SicherheitPage() {
  return (
    <>
      <Seo
        title="Sicherheit und Datenschutz bei WPorbit"
        description="Wo deine Daten liegen, wer sie lesen kann und wie WPorbit ohne Plugin und ohne gespeicherte Passwörter überwacht. Mit Unterauftragsbearbeitern und Grenzen."
        path="/sicherheit"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Sicherheit & Datenschutz"
        title="Was wir mit deinen Daten tun, und was nicht"
        lead="Agenturen verwalten mit WPorbit die Zugänge ihrer Kundinnen und Kunden. Diese Seite erklärt, wo welche Daten liegen, wer sie lesen kann und wo die Grenzen sind."
        crumbs={crumbs}
      />

      <section className="border-b border-line px-6 py-16">
        <SectionHead kicker="Grundsätze" title="Vier Entscheidungen, auf denen alles aufbaut" />
        <dl className="stagger-group grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
          {principles.map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <dt className="font-heading text-[1rem] font-semibold text-primary">{item.title}</dt>
              <dd className="mt-1.5 text-[0.9rem] leading-[1.7] text-secondary">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Datenfluss"
          title="Was wo liegt und wer es lesen kann"
          lead="Standalone arbeitet auf deinem Mac. Erst mit Cloud kommen Daten auf den WPorbit-Server, und nur die in dieser Tabelle."
        />
        <div className="reveal-up overflow-x-auto rounded-panel border border-line bg-surface">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[0.86rem]">
            <thead>
              <tr className="border-b border-line text-[0.75rem] uppercase tracking-[0.08em] text-tertiary">
                <th scope="col" className="px-5 py-3 font-semibold">Daten</th>
                <th scope="col" className="px-5 py-3 font-semibold">Wo</th>
                <th scope="col" className="px-5 py-3 font-semibold">Wer kann sie lesen</th>
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row) => (
                <tr key={row.what} className="border-b border-line last:border-b-0 align-top">
                  <th scope="row" className="px-5 py-4 font-medium text-primary">{row.what}</th>
                  <td className="px-5 py-4 text-secondary">{row.where}</td>
                  <td className="px-5 py-4 text-secondary">{row.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <div className="reveal-up prose-article">
          <h2>Überwachung ohne Plugin</h2>
          <p>
            Beim Einschalten der Überwachung richtet die App auf deinem Mac einen Lesezugang ein. Der WPorbit-Server
            bekommt dafür einen eigenen SSH-Schlüssel, der in <code>authorized_keys</code> mit{' '}
            <code>restrict</code> und <code>command=</code> eingeschränkt ist:
          </p>
          <ul>
            <li>Der Schlüssel startet immer dasselbe kleine Skript. Eine Shell, <code>scp</code> oder <code>sftp</code> gibt es nicht.</li>
            <li>Das Skript kennt zwei feste Lesebefehle ohne Argumente. Alles andere lehnt es ab und protokolliert die Ablehnung.</li>
            <li>Als root richtet die App keinen Lesezugang ein.</li>
            <li>Der Host-Schlüssel des Kundenservers wird beim Einrichten festgehalten. Eine umgeleitete Verbindung bricht vor der Anmeldung ab.</li>
            <li>Der private Schlüssel liegt nur im Überwachungsprozess, nicht in der Web-API, die das Dashboard ausliefert.</li>
            <li>Jeder Abruf steht im Prüfpfad des Teams, und das Skript schreibt ein eigenes Log auf dem Kundenserver.</li>
          </ul>
          <p>
            Wo kein SSH möglich ist, prüft der Server nur von aussen: Erreichbarkeit, SSL und Antwortzeit. Auf der
            Kundenseite liegt dann gar nichts. Die Hintergründe stehen im Beitrag{' '}
            <Link to="/blog/ueberwachung-ohne-plugin">WordPress überwachen, ohne ein Plugin zu installieren</Link>.
          </p>

          <h2>Teilen im Team, Ende-zu-Ende verschlüsselt</h2>
          <p>
            Was du ins Team teilst, verschlüsselt WPorbit auf deinem Mac, bevor es den Server erreicht. Der Server
            speichert nur verschlüsselte Daten. Entschlüsseln können sie nur die Macs, die im Team freigegeben sind. Ein
            neuer Mac kommt erst dazu, wenn ein Kollege ihn mit einem Code freigibt.
          </p>
          <p>
            Geteilt wird nur, was ein Kollege braucht, um ein Projekt selbst einzurichten. Lokale Werte wie die
            Zugänge zur lokalen Datenbank bleiben auf deinem Mac. Was genau geteilt wird, steht unter{' '}
            <Link to="/anleitungen/zugaenge/projekte-im-team-teilen">Projekte im Team teilen</Link>.
          </p>

          <h2>Die ehrlichen Grenzen</h2>
          <ul>
            <li>
              Wer den Überwachungsdienst selbst übernimmt, kann das Inventar der Sites mit Lesezugang lesen: Versionen,
              Plugin-Listen, Admin-Logins. Zugangsdaten, Dateien und Kundendatenbanken bekommt er so nicht, und er kann
              nichts verändern.
            </li>
            <li>
              Für überwachte Projekte liegen Adresse, Projektname und Kunde im Klartext beim Server. Ohne Adresse kann
              er keine Seite aufrufen.
            </li>
            <li>
              Im Team sehen alle Mitglieder alle Zugangsdaten ihrer Team-Projekte. Wenn jemand geht, schützt das neue
              Verschlüsseln nur künftige Stände. Passwörter, die die Person gesehen hat, solltest du ändern. Wie das
              geht, steht unter{' '}
              <Link to="/anleitungen/zugaenge/teammitglied-verlaesst-das-team">Ein Teammitglied verlässt das Team</Link>.
            </li>
            <li>
              Für Performance-Messungen geht die Adresse einer Website an Google PageSpeed. Alarme in Slack sind
              optional; wählst du Slack als Kanal, gehen die Meldungen dorthin.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Datenschutz"
          title="Unterauftragsbearbeiter und rechtliche Grundlagen"
          lead="WPorbit richtet sich nach dem Schweizer Datenschutzgesetz (revDSG) und, wo anwendbar, nach der DSGVO."
        />
        <ul className="stagger-group mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {processors.map((p) => (
            <li key={p.name} className="rounded-panel border border-line bg-surface p-5">
              <p className="font-heading text-[1rem] font-semibold text-primary">{p.name}</p>
              <p className="text-[0.78rem] text-tertiary">{p.place}</p>
              <p className="mt-2 text-[0.86rem] leading-[1.65] text-secondary">{p.role}</p>
            </li>
          ))}
        </ul>
        <div className="reveal-up max-w-[60ch] space-y-3 text-[0.9rem] leading-[1.7] text-secondary">
          <p>
            Einzelheiten stehen in der <Link to="/datenschutz" className="underline hover:text-accent">Datenschutzerklärung</Link>.
          </p>
          {/* TODO Patrick: Sobald der AVV juristisch geprüft ist (Entwurf: content-plan/avv-entwurf.md), hier verlinken oder als PDF anbieten. */}
          <p>
            <strong className="font-semibold text-primary">Auftragsbearbeitungsvertrag (AVV):</strong> Der AVV für Cloud
            ist in Vorbereitung. Bis er hier steht, schicken wir ihn dir auf Anfrage an{' '}
            <a href="mailto:datenschutz@wporbit.ch" className="underline hover:text-accent">datenschutz@wporbit.ch</a>.
          </p>
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <div className="reveal-up prose-article">
          <h2>Eine Sicherheitslücke gefunden?</h2>
          {/* TODO Patrick: Eigene Adresse für Sicherheitsmeldungen (z. B. security@wporbit.ch) anlegen und hier eintragen, optional mit /.well-known/security.txt. */}
          <p>
            Schreib uns an <a href="mailto:hallo@wporbit.ch">hallo@wporbit.ch</a>, mit einer kurzen Beschreibung und, wenn
            möglich, den Schritten zum Nachvollziehen. Bitte veröffentliche die Lücke erst, wenn wir sie beheben
            konnten. Wir melden uns, sobald wir die Meldung geprüft haben.
          </p>
        </div>
      </section>

      <CTABand
        title="Fragen zur Sicherheit?"
        text="Wenn deine Kundin wissen will, wie WPorbit mit ihren Daten umgeht, beantworten wir das gerne direkt."
        primary={{ label: 'Kontakt aufnehmen', to: '/kontakt' }}
        secondary={{ label: '10 Tage gratis testen', to: '/testen' }}
      />
    </>
  )
}
