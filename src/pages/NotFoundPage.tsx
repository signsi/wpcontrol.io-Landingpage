import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import SearchBox from '../components/SearchBox'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Seite nicht gefunden"
        description="Diese Seite existiert nicht oder wurde verschoben."
        path="/404"
        noindex
      />

      <section className="px-6 py-24">
        <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-accent">
          Fehler 404
        </p>
        <h1 className="mb-4 max-w-[20ch] font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mb-8 max-w-[48ch] text-[1rem] leading-[1.75] text-secondary">
          Möglicherweise wurde die Seite verschoben oder der Link enthält einen Tippfehler.
          Such direkt nach dem Thema oder starte an einem der Einstiegspunkte.
        </p>

        <div className="mb-10 max-w-xl">
          <SearchBox />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary btn-md">Zur Startseite</Link>
          <Link to="/anleitungen" className="btn btn-secondary btn-md">Anleitungen</Link>
          <Link to="/blog" className="btn btn-secondary btn-md">Blog</Link>
          <Link to="/kontakt" className="btn btn-secondary btn-md">Kontakt</Link>
        </div>
      </section>
    </>
  )
}
