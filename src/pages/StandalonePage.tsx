import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import NumberedFeatures from '../components/NumberedFeatures'
import CTABand from '../components/CTABand'
import { plans, STANDALONE_PROJECT_LIMIT } from '../data/plans'
import { breadcrumbLd } from '../lib/jsonld'

const standalone = plans.find((p) => p.id === 'standalone')!

const features = [
  {
    title: 'Startklar ohne Einrichtung',
    detail: 'WPorbit starten, Projekt öffnen und direkt loslegen. Die technische Einrichtung läuft automatisch im Hintergrund. Jedes Projekt erhält eine eigene, zuverlässig abgestimmte Arbeitsumgebung.',
  },
  {
    title: 'Alle Projekte im Blick',
    detail: 'Alle WordPress-Projekte werden in einer gemeinsamen Oberfläche zusammengeführt. Verbindungen, aktueller Stand und nächste Schritte sind auf einen Blick sichtbar. So wechselt das Team ohne lange Suche direkt zum nächsten Projekt.',
  },
  {
    title: 'Zugänge sicher verwahrt',
    detail: 'Passwörter, Schlüssel und weitere Zugangsdaten liegen verschlüsselt im passenden Projekt. Kein Teilen über Chats oder E-Mails und keine sensiblen Daten in ungeschützten Notizen.',
  },
  {
    title: 'Änderungen sicher veröffentlichen',
    detail: 'Websites online aktualisieren oder den aktuellen Stand zurückholen, ohne einzelne technische Schritte von Hand auszuführen. WPorbit prüft die Voraussetzungen und startet den bestehenden Ablauf. Zum Start stehen Vorlagen für GitLab bereit; GitHub lässt sich nach demselben Prinzip anbinden.',
  },
  {
    title: 'Bestehende Websites übernehmen',
    detail: 'Die vorhandenen Zugangsdaten genügen, um eine bestehende WordPress-Website samt Projektdateien zu übernehmen. Manuelle Sicherungen und aufwendiges Wiederherstellen entfallen.',
  },
  {
    title: 'Aus dem Agenturalltag entwickelt',
    detail: 'WPorbit kennt die typischen Stolpersteine in WordPress-Projekten. Voraussetzungen werden vor kritischen Aktionen geprüft, bekannte Fehlerquellen früh abgefangen und verständlich erklärt. Kontextbezogene Hilfestellungen zeigen direkt im jeweiligen Arbeitsschritt, was zu tun ist.',
  },
]

const crumbs = [{ label: 'Standalone', path: '/standalone' }]

export default function StandalonePage() {
  return (
    <>
      <Seo
        title="WordPress lokal entwickeln und veröffentlichen"
        description={`WPorbit Standalone: WordPress-Projekte unabhängig organisieren, Zugänge sicher verwahren und Änderungen veröffentlichen. Ab ${standalone.priceMain.replace('ab ', '')} CHF pro Person und Monat.`}
        path="/standalone"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Standalone"
        title={<>Professionell arbeiten.<br />Einfach starten.</>}
        lead="Für Agenturen, die WordPress-Projekte zuverlässig organisieren und unabhängig von der Cloud bearbeiten wollen."
        crumbs={crumbs}
        actions={
          <>
            <Link to="/testen" className="btn btn-primary btn-md">10 Tage gratis testen</Link>
            <Link to="/preise" className="btn btn-secondary btn-md">Alle Pläne vergleichen</Link>
          </>
        }
      >
        <div className="mt-5 flex items-end gap-2 leading-none">
          <span className="font-heading text-[2.8rem] font-semibold leading-none tracking-[-0.03em] text-primary">
            {standalone.priceMain}
          </span>
          <span className="mb-1.5 text-[0.88rem] leading-tight text-secondary">
            {standalone.priceSub}
            <br />
            <span className="text-[0.78rem] text-tertiary">Max. {STANDALONE_PROJECT_LIMIT} Projekte</span>
          </span>
        </div>
      </PageHero>

      <NumberedFeatures features={features} />

      <CTABand
        title="Mehr Projekte oder ein Team?"
        text="Mit dem Cloud-Plan arbeitet das gesamte Team auf demselben Projektstand. Wissen, Zugänge und nächste Schritte bleiben für Berechtigte verfügbar."
        primary={{ label: 'Cloud-Plan ansehen', to: '/cloud' }}
        secondary={{ label: 'Alle Pläne vergleichen', to: '/preise' }}
      />
    </>
  )
}
