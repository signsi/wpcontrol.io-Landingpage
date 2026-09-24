import { Link } from 'react-router-dom'
import { footerNav } from '../config/navigation'
import NewsletterSignup from './blog/NewsletterSignup'

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
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr_0.9fr] lg:gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="w-fit">
            <img src="/wporbit-quer.svg" alt="WPorbit" className="h-9 w-auto opacity-90" />
          </Link>

          <p className="max-w-[26ch] text-[0.875rem] leading-[1.65] text-secondary">
            Alle WordPress-Projekte, Zugänge und Veröffentlichungen übersichtlich an einem Ort.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <GdprBadge />
            <SwissBadge />
          </div>

          <NewsletterSignup variant="footer" />
        </div>

        {footerNav.map((column) => (
          <div key={column.heading} className="flex flex-col gap-5">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-tertiary">
              {column.heading}
            </p>
            <nav className="flex flex-col gap-4" aria-label={`${column.heading}-Navigation`}>
              {column.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[0.875rem] text-secondary transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-6">
        <p className="text-[0.75rem] text-tertiary">
          © {__BUILD_YEAR__} WPorbit. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
