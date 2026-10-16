import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import BrowserFrame from '../components/cloud/BrowserFrame'
import AlertStream from '../components/cloud/AlertStream'
import QuestionExplorer from '../components/cloud/QuestionExplorer'
import type { AnsweredQuestion } from '../components/cloud/QuestionExplorer'
import KeyFlow from '../components/cloud/KeyFlow'
import SafeUpdateDemo from '../components/cloud/SafeUpdateDemo'
import ReportMock from '../components/cloud/ReportMock'
import CompareCards from '../components/cloud/CompareCards'
import {
  BriefcaseIcon, CalmIcon, CoinsIcon, LayersIcon, LinkIcon, PatchIcon, PinIcon, PipelineIcon,
  ShieldIcon, UserKeyIcon,
} from '../components/cloud/icons'
import type { ReactNode } from 'react'
import { CLOUD_INCLUDED_SEATS, plans } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'
import { cloudComingSoon as comingSoon, cloudToday as today } from '../data/cloud'

const cloud = plans.find((p) => p.id === 'cloud')!

const crumbs = [{ label: 'Cloud', path: '/cloud' }]

/** Die Fragen, die sich jede Webagentur stellt, und die Antwort aus dem Dashboard. */
const questions: AnsweredQuestion[] = [
  {
    question: '„Ist die Seite vom Kunden noch online?“',
    answer: 'Das Dashboard misst alle 5 Minuten und meldet einen Ausfall in Slack oder per Mail. Du weisst es, bevor der Kunde anruft.',
    image: '/cloud/q-online.webp', alt: 'Tab Erreichbarkeit: Verfügbarkeit über 30 und 90 Tage und Antwortzeit der letzten 7 Tage mit markiertem Ausfall',
    url: 'dashboard.wporbit.ch', width: 1408, height: 1646,
  },
  {
    question: '„Wo sind Updates offen, und welche sind dringend?“',
    answer: 'Alle offenen Updates aller Kundenseiten in einer Liste, mit den Lücken, die sie schliessen. Kein Einloggen Seite für Seite.',
    image: '/cloud/q-updates.webp', alt: 'Projektseite mit Kennzahlen und der Liste „Anstehende Updates“',
    url: 'dashboard.wporbit.ch', width: 1408, height: 1144,
  },
  {
    question: '„Hat irgendein Plugin eine Sicherheitslücke?“',
    answer: 'Bekannte Lücken werden mit jedem Inventar abgeglichen. Betroffene Seiten stehen oben, mit dem Update, das hilft.',
    image: '/cloud/q-luecken.webp', alt: 'Tab Sicherheit mit einer bekannten Lücke in einem Plugin und dem Update, das sie behebt',
    url: 'dashboard.wporbit.ch', width: 1728, height: 442,
  },
  {
    question: '„Kommen die Mails vom Kontaktformular noch an?“',
    answer: 'Einmal am Tag schickt jede Seite eine Testmail über ihren echten Mailweg. Ein stilles Formular fällt auf, nicht erst nach Wochen.',
    image: '/cloud/q-mail.webp', alt: 'Tab Mail: SPF, DKIM und DMARC bewertet, die letzte Testmail angekommen',
    url: 'dashboard.wporbit.ch', width: 1408, height: 1534,
  },
  {
    question: '„Läuft bald ein Zertifikat oder eine Domain ab?“',
    answer: 'SSL- und Domain-Ablauf werden überwacht und rechtzeitig gemeldet, statt dass die Seite plötzlich eine Warnung zeigt.',
    image: '/cloud/q-ablauf.webp', alt: 'Tab Umgebung mit Domain, Ablaufdatum, Nameservern und Hoster',
    url: 'dashboard.wporbit.ch', width: 1408, height: 820,
  },
  {
    question: '„Wer hat da einen neuen Admin angelegt?“',
    answer: 'Jede Änderung wird festgehalten, ein neuer Administrator löst sofort einen Alarm aus.',
    image: '/cloud/q-admin.webp', alt: 'Tab Änderungen mit hervorgehobenem Eintrag „Neuer Administrator“',
    url: 'dashboard.wporbit.ch', width: 1408, height: 1094,
  },
  {
    question: '„Wo ist nochmal das Passwort für diesen Server?“',
    answer: 'Zugänge liegen verschlüsselt im Projekt und sind für das Team da, ohne Chat, Excel oder Zettel.',
    image: '/cloud/q-passwort.webp', alt: 'WPorbit-App: geteilte Zugänge eines Projekts, Passwörter verdeckt',
    width: 1120, height: 920,
  },
  {
    question: '„Wer kümmert sich, wenn ich in den Ferien bin?“',
    answer: 'Alle im Team sehen denselben Stand und dieselben Alarme. Übernehmen geht ohne Übergabe-Mail.',
    image: '/cloud/q-team.webp', alt: 'WPorbit-App: Team mit drei Mitgliedern und freigegebenen Macs',
    width: 1440, height: 900,
  },
]

/** Was die Agentur davon hat. */
const benefits = [
  {
    icon: <CoinsIcon />,
    title: 'Spart Geld',
    detail: 'Ein Werkzeug statt mehrerer Dienste und Plugins pro Seite. Keine Kontrollgänge von Hand, und Probleme werden klein entdeckt, nicht erst, wenn sie teuer sind.',
  },
  {
    icon: <CalmIcon />,
    title: 'Spart Nerven',
    detail: 'Keine Überraschungsanrufe, kein Plugin, das auf jeder Kundenseite gepflegt werden muss, keine Suche nach Zugängen. Alarme kommen dann, wenn es zählt, mit Ruhezeiten.',
  },
  {
    icon: <BriefcaseIcon />,
    title: 'Professionelle Dienstleistung für deine Kunden',
    detail: 'Du meldest dich, bevor der Kunde etwas merkt, und kannst zeigen, was du in der Wartung tust. Bis zum Release kommen Berichte im Auftritt deiner Agentur dazu.',
  },
]

/** Mit Cloud möglich: Bausteine, die es lokal schon gibt oder die auf Wunsch kommen. */
const possible = [
  {
    icon: <LayersIcon />,
    title: 'Staging und Vorschau im Dashboard',
    detail: 'Staging-Umgebungen und Vorschauen gibt es lokal in der App. In der Cloud liessen sie sich hinterlegen und als Link mit dem Kunden teilen.',
  },
  {
    icon: <PipelineIcon />,
    title: 'Pipeline-Status im Dashboard',
    detail: 'Deploys über GitLab oder GitHub laufen heute schon aus der App. Der Stand jeder Pipeline könnte im Dashboard neben Updates und Erreichbarkeit stehen.',
  },
  {
    icon: <UserKeyIcon />,
    title: 'Zugriff pro Projekt',
    detail: 'Heute sehen alle Mitglieder eines Teams alle Projekte. Wer Freelancer oder Kunden einbinden will, bekommt gezielten Zugriff auf einzelne Projekte.',
  },
  {
    icon: <LinkIcon />,
    title: 'Link-Monitor',
    detail: 'Defekte Links auf den Kundenseiten finden, bevor es Besucher oder Suchmaschinen tun.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Firewall über Cloudflare oder den Hoster',
    detail: 'Eine Firewall gehört vor die Website, nicht als Plugin in sie hinein. WPorbit bindet sie dort an, wo sie hingehört: bei Cloudflare oder beim Hoster.',
  },
  {
    icon: <PatchIcon />,
    title: 'Virtual Patching über einen Partner',
    detail: 'Bekannte Lücken abfangen, bis das Update eingespielt ist, über einen spezialisierten Partner statt eines eigenen Plugins.',
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

/** Ruhige Liste statt Kartenraster: Titel und Satz, getrennt durch eine Linie. */
function FeatureList({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="border-t border-line pt-4">
          <dt className="font-heading text-[1rem] font-semibold text-primary">{item.title}</dt>
          <dd className="mt-1.5 text-[0.86rem] leading-[1.65] text-secondary">{item.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function CardGrid({ items, tone = 'plain' }: { items: { icon?: ReactNode; title: string; detail: string }[]; tone?: 'plain' | 'accent' | 'dashed' }) {
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
          {item.icon && (
            <span className="mb-3 grid size-9 place-items-center rounded-control bg-surface text-accent shadow-card">{item.icon}</span>
          )}
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
        title="WordPress-Wartung ohne Plugin für Agenturen"
        description="Alle Kundenseiten im Blick: Erreichbarkeit, Updates, Sicherheitslücken und Mail-Zustellung. Ohne Plugin auf der Kundenseite, gehostet in der Schweiz."
        path="/cloud"
        image="/og/cloud.jpg"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Cloud · für Webagenturen"
        title={<>Die Fragen jeder Webagentur.<br />Beantwortet, bevor der Kunde anruft.</>}
        lead="Cloud ist aus dem Agenturalltag entstanden. Das Team-Dashboard zur App zeigt, welche Kundenseite down ist, wo Updates und Lücken offen sind und ob das Kontaktformular noch Mails verschickt, ohne Plugin auf der Kundenseite. Das spart Geld und Nerven, und deine Kunden bekommen eine Wartung, die man vorzeigen kann."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/preise" className="btn btn-primary btn-md">Alle Pläne vergleichen</Link>
            <Link to="/vergleich#wartung" className="btn btn-secondary btn-md">Im Vergleich</Link>
          </>
        }
      >
        <div className="mt-5 flex items-end gap-2 leading-none">
          <span className="whitespace-nowrap font-heading text-[2.8rem] font-semibold leading-none tracking-[-0.03em] text-primary">
            {cloud.priceMain}
          </span>
          <span className="mb-1.5 text-[0.88rem] leading-tight text-secondary">
            {cloud.priceSub}
            <br />
            <span className="text-[0.78rem] text-tertiary">{CLOUD_INCLUDED_SEATS} Personen inkl. · Release bis Ende 2026</span>
          </span>
        </div>
      </PageHero>

      <section className="border-b border-line px-6 pb-16">
        <div className="hero-image relative">
          <BrowserFrame>
            <img
              src="/cloud/hero.webp"
              alt="Team-Dashboard: alle Kundenseiten mit Zustand, offenen Updates, SSL, Antwortzeit, Verfügbarkeit und Performance"
              width={2400}
              height={933}
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </BrowserFrame>
          <div className="mt-6 flex justify-end lg:absolute lg:-bottom-8 lg:right-6 lg:mt-0">
            <AlertStream />
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Aus der Praxis"
          title="Gebaut für die Fragen, die im Agenturalltag wirklich kommen"
          lead="Jede Agentur mit Wartungskunden kennt sie. Cloud beantwortet sie für alle Kundenseiten auf einmal."
        />
        <QuestionExplorer items={questions} />
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Was es bringt"
          title="Weniger Aufwand, weniger Ärger, mehr Wert für deine Kunden"
        />
        <CardGrid items={benefits} tone="accent" />
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="So funktioniert es"
          title="Überwachen, ohne die Kundenseite zu öffnen"
          lead="Jedes Plugin, das eine Website nach aussen öffnet, ist zusätzliche Angriffsfläche, auch ein Überwachungs-Plugin. WPorbit braucht keines und speichert keine Passwörter."
        />
        <KeyFlow />
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Heute gebaut"
          title="Was das Dashboard schon kann"
          lead="Alles hier läuft bereits im Team-Dashboard."
        />
        <FeatureList items={today} />
      </section>

      <section className="border-b border-line px-6 py-16">
        <SectionHead
          kicker="Als Nächstes"
          title="Geplant für Cloud"
          lead="Damit wird aus dem Überblick eine vollständige Wartung: aktualisieren, absichern, berichten."
        />
        <div className="mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <SafeUpdateDemo />
          <ReportMock />
        </div>
        <FeatureList items={comingSoon} />
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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="grid grid-cols-1 gap-4">
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
        <figure>
          <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-card">
            <img
              src="/cloud/q-team.webp"
              alt="WPorbit-App, Einstellungen: Team mit drei Mitgliedern, ein Mac wartet auf Freigabe"
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-2.5 text-[0.76rem] text-tertiary">
            Ein neuer Mac kommt erst dazu, wenn ein Kollege ihn mit einem Code freigibt.
          </figcaption>
        </figure>
        </div>
      </section>

      <section className="border-b border-line bg-raised px-6 py-16">
        <SectionHead
          kicker="Schweiz"
          title="Entwickelt, gehostet und gespeichert in der Schweiz"
          lead="WPorbit wird in der Schweiz entwickelt. Server und Datenbank des Dashboards stehen in der Schweiz."
        />
        <ul className="stagger-group mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { what: 'Entwickelt', where: 'Rotkreuz ZG', who: 'viwiv GmbH' },
            { what: 'Gehostet', where: 'Zürich', who: 'Rechenzentren von Nine' },
            { what: 'Gespeichert', where: 'Zürich', who: 'Datenbank und Sicherungen' },
          ].map((place) => (
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
          lead="Der Unterschied beginnt beim Aufbau: Übliche Dienste brauchen ein Plugin auf jeder Kundenseite, WPorbit nicht. Preislich lässt sich das schlecht vergleichen, weil Cloud die App für die lokale Arbeit einschliesst."
        />
        <CompareCards />
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
        primary={{ label: '10 Tage gratis testen', to: '/testen' }}
        secondary={{ label: 'Preise ansehen', to: '/preise' }}
      />
    </>
  )
}
