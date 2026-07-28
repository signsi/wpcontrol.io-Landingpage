import { Link } from 'react-router-dom'

function GdprBadge() {
  return (
    <div className="flex items-center gap-2.5 border border-line rounded-md px-3 py-2">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary flex-shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span className="text-[0.75rem] font-semibold text-secondary leading-tight">
        GDPR<br />Compliant
      </span>
    </div>
  )
}

function SwissBadge() {
  return (
    <div className="flex items-center gap-2.5 border border-line rounded-md px-3 py-2">
      {/* Swiss cross as SVG — no emoji */}
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" aria-hidden="true">
        <rect width="20" height="20" rx="2" fill="#D52B1E"/>
        <rect x="8.5" y="4" width="3" height="12" rx="0.5" fill="white"/>
        <rect x="4" y="8.5" width="12" height="3" rx="0.5" fill="white"/>
      </svg>
      <span className="text-[0.75rem] font-semibold text-secondary leading-tight">
        Entwickelt &amp;<br />gehostet in der Schweiz
      </span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 pt-16 pb-10">

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 lg:gap-8">

        {/* Brand column */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="w-fit">
            <img
              src="/wporbit-quer.svg"
              alt="WPorbit"
              className="h-9 w-auto opacity-90"
            />
          </Link>

          <p className="text-secondary text-[0.875rem] leading-[1.65] max-w-[26ch]">
            Vom Setup bis zur Wartung. Ein Cockpit für WordPress-Agenturen.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <GdprBadge />
            <SwissBadge />
          </div>
        </div>

        {/* Produkt */}
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[0.75rem] uppercase tracking-[0.13em] text-tertiary">
            Produkt
          </p>
          <nav className="flex flex-col gap-4" aria-label="Produkt-Navigation">
            <a href="#produkt"    className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Überblick</a>
            <Link to="/standalone" className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Standalone</Link>
            <Link to="/cloud" className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Cloud</Link>
            <a href="#vergleich"  className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Vergleich</a>
            <a href="#preise"     className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Preise</a>
            <a href="#faq"        className="text-[0.875rem] text-secondary hover:text-primary transition-colors">FAQ</a>
          </nav>
        </div>

        {/* Pläne */}
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[0.75rem] uppercase tracking-[0.13em] text-tertiary">
            Pläne
          </p>
          <nav className="flex flex-col gap-4" aria-label="Pläne-Navigation">
            <Link to="/standalone" className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Standalone</Link>
            <Link to="/cloud"      className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Cloud</Link>
            <Link to="/custom"     className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Custom</Link>
            <a href="#waitlist"    className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Early Access</a>
          </nav>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[0.75rem] uppercase tracking-[0.13em] text-tertiary">
            Legal
          </p>
          <nav className="flex flex-col gap-4" aria-label="Legal-Navigation">
            <a href="/impressum"   className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Impressum</a>
            <a href="/datenschutz" className="text-[0.875rem] text-secondary hover:text-primary transition-colors">Datenschutz</a>
            <a href="/agb"         className="text-[0.875rem] text-secondary hover:text-primary transition-colors">AGB</a>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 pt-6 border-t border-line">
        <p className="text-tertiary text-[0.75rem]">
          © 2026 WPorbit. Alle Rechte vorbehalten.
        </p>
      </div>

    </footer>
  )
}
