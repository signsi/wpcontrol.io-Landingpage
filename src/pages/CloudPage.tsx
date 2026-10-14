import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { CLOUD_INCLUDED_SEATS, plans } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'

const cloud = plans.find((p) => p.id === 'cloud')!

const crumbs = [{ label: 'Cloud', path: '/cloud' }]

/** In drei Schritten: was die App einrichtet und was auf dem Kundenserver bleibt. */
const steps = [
  {
    title: 'In der App einschalten',
    detail:
      'Ein Rechtsklick auf das Projekt genügt. WPorbit richtet die Überwachung vom Mac aus ein, mit den Zugängen, die dort ohnehin verschlüsselt liegen.',
  },
  {
    title: 'Ein beschränkter Lese-Schlüssel statt Plugin',
    detail:
      'Auf dem Server liegt ein kleines Skript und ein SSH-Schlüssel, der nur feste Befehle ausführen darf: keine Shell, keine Dateien, kein root. Dein Kunde sieht die Zeile und kann sie jederzeit löschen.',
  },
  {
    title: 'Oder ganz ohne Eingriff',
    detail:
      'Wo kein Zugang möglich ist, überwacht WPorbit nur von aussen: Erreichbarkeit, SSL und Antwortzeit. Auf der Kundenseite liegt dann nichts.',
  },
]

/** Was heute im Team-Dashboard gebaut ist. */
const today = [
  {
    title: 'Erreichbarkeit',
    detail: 'Messung alle 5 Minuten, Nachprüfung vor dem Alarm, Verfügbarkeit über 30 und 90 Tage mit Ziel, Wartungsfenster und Inhaltsprüfung.',
  },
  {
    title: 'Updates und Inventar',
    detail: 'Alle Plugins, Themes und Versionen jeder Seite, offene Updates, Auto-Updates, inaktive und verwaiste Plugins, team-weit als Liste und CSV.',
  },
  {
    title: 'Sicherheitslücken',
    detail: 'Bekannte Lücken in WordPress, Plugins und Themes aus Wordfence Intelligence, mit Schwere und dem Update, das sie schliesst.',
  },
  {
    title: 'Änderungen',
    detail: 'Was sich auf einer Seite geändert hat, über 13 Monate. Ein neuer Administrator löst sofort einen Alarm aus.',
  },
  {
    title: 'Performance und SEO',
    detail: 'PageSpeed-Werte und Core Web Vitals mit Verlauf, dazu Indexierung, Search Console und Analytics der Seite.',
  },
  {
    title: 'Barrierefreiheit',
    detail: 'Ein automatischer Teil-Check mit Befunden und Verlauf. Er ersetzt keine Prüfung nach WCAG, zeigt aber früh, was kippt.',
  },
  {
    title: 'Mail-Zustellung',
    detail: 'Einmal am Tag eine Testmail über den echten Mailweg der Seite, dazu SPF, DKIM und DMARC der Domain. So fällt ein stilles Kontaktformular auf.',
  },
  {
    title: 'Domain und Hoster',
    detail: 'Ablauf der Domain, Nameserver, Mailserver, IP-Adressen und der Hoster von Website und Server.',
  },
  {
    title: 'Alarme',
    detail: 'In Slack oder an eine Team-Adresse, dazu persönliche Alarme mit Ruhezeiten und jeden Montag eine Übersicht.',
  },
]

/** Kommt vor dem Release. */
const comingSoon = [
  {
    title: 'Updates mit einem Klick aus der Ferne',
    detail: 'Core, Plugins und Themes einzeln oder gebündelt aktualisieren, direkt aus dem Dashboard. Eine gemeldete Lücke ist so mit einem Klick geschlossen, statt nur abgefangen.',
  },
  {
    title: 'Sichere Updates mit Rollback',
    detail: 'Vor jedem Update ein Backup, danach ein visueller Vergleich der wichtigsten Seiten. Weicht etwas ab, geht es zurück auf den Stand davor.',
  },
  {
    title: 'Wartungs- und Update-Planung',
    detail: 'Updates und Wartungsfenster im Voraus planen, für einzelne Seiten oder den ganzen Bestand.',
  },
  {
    title: 'Backups',
    detail: 'Regelmässige Sicherungen der Kundenseiten, zentral im Dashboard.',
  },
  {
    title: 'Kundenberichte mit eigenem Logo',
    detail: 'Monatliche Berichte über Wartung, Updates und Verfügbarkeit, im Auftritt deiner Agentur.',
  },
  {
    title: 'Malware-Scanner',
    detail: 'Prüft die Kundenseiten auf Schadcode und meldet Funde wie jeden anderen Alarm.',
  },
]

/** Mit Cloud möglich: Bausteine, die es lokal schon gibt oder die auf Wunsch kommen. */
const possible = [
  {
    title: 'Staging und Vorschau im Dashboard',
    detail: 'Staging-Umgebungen und Vorschauen gibt es lokal in der App. In der Cloud liessen sie sich hinterlegen und als Link mit dem Kunden teilen.',
  },
  {
    title: 'Pipeline-Status im Dashboard',
    detail: 'Deploys über GitLab oder GitHub laufen heute schon aus der App. Der Stand jeder Pipeline könnte im Dashboard neben Updates und Erreichbarkeit stehen.',
  },
  {
    title: 'Zugriff pro Projekt',
    detail: 'Heute sehen alle Mitglieder eines Teams alle Projekte. Wer Freelancer oder Kunden einbinden will, bekommt gezielten Zugriff auf einzelne Projekte.',
  },
  {
    title: 'Link-Monitor',
    detail: 'Defekte Links auf den Kundenseiten finden, bevor es Besucher oder Suchmaschinen tun.',
  },
  {
    title: 'Firewall über Cloudflare oder den Hoster',
    detail: 'Eine Firewall gehört vor die Website, nicht als Plugin in sie hinein. WPorbit bindet sie dort an, wo sie hingehört: bei Cloudflare oder beim Hoster.',
  },
  {
    title: 'Virtual Patching über einen Partner',
    detail: 'Bekannte Lücken abfangen, bis das Update eingespielt ist, über einen spezialisierten Partner statt eines eigenen Plugins.',
  },
]

/** Kurzvergleich. Namen der Anbieter und Details stehen auf /vergleich. */
const comparisonRows: { label: string; orbit: string; others: string }[] = [
  { label: 'Plugin auf jeder Kundenseite', orbit: 'Nein', others: 'Ja, ein Verbindungs-Plugin' },
  { label: 'Zugangsdaten beim Dienst', orbit: 'Nein, nur ein beschränkter Lese-Schlüssel', others: 'Je nach Dienst' },
  { label: 'Mailtest über den echten Mailweg', orbit: 'Ja', others: 'Nicht gefunden' },
  { label: 'Änderungsverlauf und Alarm bei neuem Admin', orbit: 'Ja', others: 'Teilweise, meist als Zusatz' },
  { label: 'Lokale Entwicklung im selben Werkzeug', orbit: 'Ja, mit der App', others: 'Nein' },
  { label: 'Updates und Backups aus der Ferne', orbit: 'Bis zum Release', others: 'Ja' },
  { label: 'Standort', orbit: 'Schweiz', others: 'EU, USA oder eigener Server' },
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

function CardGrid({ items, tone = 'plain' }: { items: { title: string; detail: string }[]; tone?: 'plain' | 'accent' | 'dashed' }) {
  const card =
    tone === 'accent'
      ? 'rounded-xl border border-accent/30 bg-accent/10 p-5'
      : tone === 'dashed'
        ? 'rounded-xl border border-dashed border-line bg-base p-5'
        : 'rounded-xl border border-line bg-surface p-5'
  return (
    <div className="stagger-group grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className={card}>
          <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">{item.title}</h3>
          <p className="text-[0.86rem] leading-[1.65] text-secondary">{item.detail}</p>
        </article>
      ))}
    </div>
  )
}

export default function CloudPage() {
  return (
    <>
      <Seo
        title="Cloud"
        description="WPorbit Cloud: alle Kundenseiten im Team-Dashboard, ohne Plugin auf der Kundenseite und ohne gespeicherte Passwörter. Entwickelt und gehostet in der Schweiz. Release bis Ende 2026."
        path="/cloud"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Cloud · in Entwicklung"
        title={<>Alle Kundenseiten im Blick.<br />Ohne Plugin auf der Kundenseite.</>}
        lead="Cloud ist das Team-Dashboard zur App: Erreichbarkeit, Updates, Sicherheitslücken, Performance und Mail-Zustellung aller Websites an einem Ort, für das ganze Team. Eingerichtet aus der App, mit einem beschränkten Lese-Schlüssel statt eines Plugins."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/preise" className="btn btn-primary btn-md">Alle Pläne vergleichen</Link>
            <Link to="/vergleich#wartung" className="btn btn-secondary btn-md">Im Vergleich</Link>
          </>
        }
      >
        <div className="mt-5 flex items-end gap-2 leading-none">
          <span className="font-heading text-[2.8rem] font-semibold leading-none tracking-[-0.03em] text-primary">
            {cloud.priceMain}
          </span>
          <span className="mb-1.5 text-[0.88rem] leading-tight text-secondary">
            {cloud.priceSub}
            <br />
            <span className="text-[0.78rem] text-tertiary">{CLOUD_INCLUDED_SEATS} Personen inkl. · Release bis Ende 2026</span>
          </span>
        </div>
      </PageHero>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="So funktioniert es"
          title="Überwachen, ohne die Kundenseite zu öffnen"
          lead="Jedes Plugin, das eine Website nach aussen öffnet, ist zusätzliche Angriffsfläche, auch ein Überwachungs-Plugin. WPorbit braucht keines und speichert keine Passwörter."
        />
        <div className="stagger-group grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <article key={step.title} className="rounded-xl border border-line bg-surface p-5">
              <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-tertiary">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">{step.title}</h3>
              <p className="text-[0.86rem] leading-[1.65] text-secondary">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Heute gebaut"
          title="Was das Dashboard schon kann"
          lead="Alles hier läuft bereits im Team-Dashboard."
        />
        <CardGrid items={today} />
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Bis zum Release"
          title="Kommt vor Ende 2026"
          lead="Damit wird aus dem Überblick eine vollständige Wartung: aktualisieren, absichern, berichten."
        />
        <CardGrid items={comingSoon} tone="accent" />
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Mit Cloud möglich"
          title="Bausteine, die mit der App zusammenspielen"
          lead="Manches gibt es lokal schon, anderes ist vorbereitet. Was davon zuerst kommt, entscheidet, was Agenturen brauchen."
        />
        <CardGrid items={possible} tone="dashed" />
        <p className="mt-6 text-[0.9rem] text-secondary">
          Brauchst du etwas davon?{' '}
          <Link to="/kontakt" className="font-semibold text-primary hover:text-accent">Sag es uns</Link>.
        </p>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Team"
          title="Ein Team, ein Stand, geteilte Zugänge"
          lead="Projekte und Zugangsdaten teilt das Team Ende-zu-Ende-verschlüsselt. Auch wir sehen sie nicht. Teams und Rollen sind eingebaut, ein neuer Mac kommt erst nach Freigabe durch einen Kollegen dazu."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface p-5">
            <p className="mb-2 text-[0.66rem] uppercase tracking-[0.12em] text-tertiary">Standalone</p>
            <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Die App für dich allein</h3>
            <p className="text-[0.86rem] leading-[1.65] text-secondary">
              Lokal entwickeln, veröffentlichen, Zugänge verwahren. Ohne Team-Funktionen und ohne Dashboard.
            </p>
          </article>
          <article className="rounded-xl border border-accent/30 bg-accent/10 p-5">
            <p className="mb-2 text-[0.66rem] uppercase tracking-[0.12em] text-accent">Cloud</p>
            <h3 className="mb-2 font-heading text-[1rem] font-semibold text-primary">Die App und das Team-Dashboard</h3>
            <p className="text-[0.86rem] leading-[1.65] text-secondary">
              Alles aus Standalone, dazu Teams, geteilte Projekte und Zugänge und die Überwachung aller Kundenseiten.
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Schweiz"
          title="Entwickelt, gehostet und gespeichert in der Schweiz"
          lead="WPorbit wird in der Schweiz entwickelt. Server und Datenbank des Dashboards stehen in der Schweiz."
        />
        <p className="max-w-[60ch] text-[0.82rem] leading-[1.65] text-tertiary">
          Für Performance-Messungen fragt das Dashboard Google PageSpeed an, dabei geht die Adresse der Website an
          Google. Alarme in Slack sind optional. Details in der{' '}
          <Link to="/datenschutz" className="underline hover:text-accent">Datenschutzerklärung</Link>.
        </p>
      </section>

      <section id="vergleich" className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Im Vergleich"
          title="Was anders ist als bei üblichen Wartungsdiensten"
          lead="Übliche Wartungsdienste verbinden sich über ein Plugin auf jeder Kundenseite. Preislich lässt sich das schlecht vergleichen: Cloud kommt zusammen mit der App für die lokale Arbeit."
        />
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[34rem] text-left text-[0.86rem]">
            <thead className="bg-raised text-[0.72rem] uppercase tracking-[0.08em] text-tertiary">
              <tr>
                <th className="px-4 py-3 font-semibold"></th>
                <th className="px-4 py-3 font-semibold text-accent">WPorbit Cloud</th>
                <th className="px-4 py-3 font-semibold">Übliche Wartungsdienste</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <td className="px-4 py-3 text-primary">{row.label}</td>
                  <td className="px-4 py-3 font-medium text-primary">{row.orbit}</td>
                  <td className="px-4 py-3 text-secondary">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[0.82rem] text-tertiary">
          Stand Oktober 2026, nach Angaben der Anbieter.{' '}
          <Link to="/vergleich#wartung" className="font-semibold text-primary hover:text-accent">
            Ausführlicher Vergleich mit WP Umbrella, ManageWP, MainWP und weiteren →
          </Link>
        </p>
      </section>

      <CTABand
        title="Heute mit Standalone starten."
        text="Die App läuft schon heute. Cloud mit Team-Dashboard folgt bis Ende 2026, deine Projekte nimmst du mit."
        primary={{ label: 'Standalone testen', to: '/testen' }}
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
