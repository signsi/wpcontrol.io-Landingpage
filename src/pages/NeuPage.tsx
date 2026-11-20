import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import BrowserFrame from '../components/cloud/BrowserFrame'
import { breadcrumbLd } from '../lib/jsonld'

const crumbs = [{ label: 'Neu in 1.25', path: '/neu' }]

interface Item {
  title: string
  detail: string
  tag?: string
}

/** Neuerungen der App (Mac). Quelle: Release-Notes 1.25.0. */
const appItems: Item[] = [
  {
    title: 'Team-Sicht',
    detail: 'Alle geteilten Projekte auf einen Blick: ob sie auf diesem Mac schon verknüpft sind, nur im Team liegen oder dein Mac sie nicht lesen kann. Mit der Aktion, die gerade Sinn ergibt.',
  },
  {
    title: 'Server sichern',
    detail: 'Eine Kopie der Live-Seite auf deinen Mac laden (Datenbank, Plugins, Uploads, Themes), bevor du etwas anfasst. Server und lokales Projekt bleiben unverändert.',
  },
  {
    title: 'Projekte nach Kunde oder Tag gruppieren',
    detail: 'Die Seitenleiste ordnet sich nach Tag oder Kunde, Gruppen lassen sich einklappen. Ein Projekt kann mehrere Tags haben.',
  },
  {
    title: 'phpMyAdmin ohne Anmeldung',
    detail: '«Datenbank öffnen» meldet dich direkt an, mit einem Token, das nur für diesen Klick und 60 Sekunden gilt.',
  },
  {
    title: 'VS Code startet schneller',
    detail: 'Der VS Code Server bleibt pro Projekt im Container erhalten und wird nicht nach jeder Neuanlage von vorn geladen.',
  },
  {
    title: 'Neu von Remote aufsetzen',
    detail: 'Ein Projekt lokal zurücksetzen und frisch vom Server laden, mit Sicherung vorher und klarer Ansage, was lokal verloren ginge.',
  },
  {
    title: '1Password als SSH-Agent',
    detail: 'Wähle in den Einstellungen, ob deine SSH-Schlüssel aus dem Agenten des Macs oder aus 1Password kommen.',
  },
  {
    title: 'Fehler nennen ihre Quelle',
    detail: 'Server, PHP, Datenbank, Übertragung: Die Meldung sagt, an welcher Schicht es hakt und wer zuständig ist, statt den Rohtext des Servers zu zeigen.',
  },
]

/** Neuerungen der Cloud (Dashboard). */
const cloudItems: Item[] = [
  {
    title: 'Suche & Traffic',
    tag: 'Beta',
    detail: 'Search Console und Analytics, nur lesend verbunden. Klicks, Impressionen, Sitzungen und Key Events täglich, dazu Alarme bei Fehlerseiten und Einbrüchen.',
  },
  {
    title: 'Kurzbericht',
    detail: 'Eine Ampel mit Begründung, vier Zahlen mit Veränderung zur Vorperiode und höchstens drei Auffälligkeiten. Zum Lesen reicht ein Blick.',
  },
  {
    title: 'Monatsbericht',
    detail: 'Am 4. des Monats legt WPorbit je Projekt einen unveränderlichen Bericht des Vormonats an: Summen, Wochenverlauf, wichtigste Seiten, Alarme.',
  },
  {
    title: 'Link für Kunden',
    detail: 'Ein Link mit Ablaufdatum zeigt deinem Kunden den neuesten Bericht, ohne Anmeldung. Jederzeit widerrufbar.',
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

function ItemList({ items }: { items: Item[] }) {
  return (
    <dl className="stagger-group grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="border-t border-line pt-4">
          <dt className="flex items-center gap-2 font-heading text-[1rem] font-semibold text-primary">
            {item.title}
            {item.tag && (
              <span className="rounded-full bg-accent-tint px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-accent-strong">
                {item.tag}
              </span>
            )}
          </dt>
          <dd className="mt-1.5 text-[0.86rem] leading-[1.65] text-secondary">{item.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function NeuPage() {
  return (
    <>
      <Seo
        title="Neu in WPorbit 1.25: Team-Sicht und Berichte"
        description="WPorbit 1.25: Team-Sicht, Server-Backup, gruppierte Projekte und klarere Fehler. Im Dashboard neu: Suche & Traffic, Monatsbericht, Kunden-Link."
        path="/neu"
        image="/og/default.jpg"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Version 1.25"
        title={<>Dein Team im Blick.<br />Deine Kunden auch.</>}
        lead="Die App zeigt jetzt alle geteilten Projekte auf einen Blick und sichert Live-Seiten mit einem Klick. Das Team-Dashboard erzählt zusätzlich, wie die Seiten in der Suche laufen, und schreibt den Monatsbericht für deine Kunden."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/testen" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/changelog" className="btn btn-secondary btn-md">Alle Änderungen</Link>
          </>
        }
      />

      <section className="border-b border-line px-6 pb-16">
        <div className="hero-image">
          <img
            src="/home/app-1280.webp"
            srcSet="/home/app-800.webp 800w, /home/app-1280.webp 1280w, /home/app-1920.webp 1920w"
            sizes="(min-width: 1280px) 1200px, 100vw"
            alt="WPorbit-App auf dem Mac mit Projektliste und Projektansicht"
            className="block h-auto w-full rounded-panel border border-line shadow-card"
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Die App"
          title="Weniger suchen, weniger klicken, weniger Überraschungen"
          lead="Für alle, die viele Projekte betreuen: schneller finden, sicher sichern, Fehler verstehen."
        />
        <ItemList items={appItems} />
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Die Cloud"
          title="Das Dashboard für das ganze Team"
          lead="Ein Ort für alle Kundenseiten: Erreichbarkeit, Updates, Sicherheitslücken, Mail-Zustellung, und neu die Sichtbarkeit in der Suche. Ohne Plugin auf der Kundenseite, gehostet in der Schweiz."
        />
        <div className="mb-12">
          <BrowserFrame>
            <img
              src="/cloud/hero.webp"
              alt="Team-Dashboard: alle Kundenseiten mit Zustand, offenen Updates, SSL, Antwortzeit, Verfügbarkeit und Performance"
              width={2400}
              height={933}
              loading="lazy"
              className="block h-auto w-full"
            />
          </BrowserFrame>
        </div>
        <p className="mb-6 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">Neu im Dashboard</p>
        <ItemList items={cloudItems} />
        <p className="mt-8 max-w-[62ch] text-[0.86rem] leading-[1.65] text-tertiary">
          Suche & Traffic ist in der Beta und wird je Team von Hand freigeschaltet.{' '}
          <Link to="/kontakt" className="font-semibold text-primary hover:text-accent">Schreib uns</Link>, wenn du es ausprobieren willst. Gespeichert werden Tageswerte nur 60 Tage lang, Google bleibt die Quelle.
        </p>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Sicherheit"
          title="Zugangsdaten im Data-Protection-Schlüsselbund"
          lead="Beim Wechsel zwischen App-Versionen fragt macOS nicht mehr für jeden Eintrag einzeln nach. Vorhandene Zugangsdaten werden beim ersten Start übernommen. Passwörter bleiben auf deinem Mac, und das Dashboard überwacht ohne Plugin auf der Kundenseite."
        />
        <Link to="/sicherheit" className="font-semibold text-primary hover:text-accent">So schützen wir Zugänge</Link>
      </section>

      <section className="border-b border-line bg-raised px-6 py-12">
        <p className="max-w-[62ch] text-[0.9rem] leading-[1.7] text-secondary">
          <strong className="text-primary">Update:</strong> Die App aktualisiert sich selbst. WPorbit 1.25 braucht macOS 26 oder neuer. Beim ersten Start erneuert WPorbit den Dienst der Container-Laufzeit; laufende Projekte danach einmal neu starten.
        </p>
      </section>

      <CTABand
        title="Probiere 1.25 mit deinem Team"
        text="10 Tage gratis, ohne Kreditkarte. Die App für den Mac, das Dashboard dazu, Server in der Schweiz."
        secondary={{ label: 'Cloud ansehen', to: '/cloud' }}
      />
    </>
  )
}
