import { Link } from 'react-router-dom'

interface TopbarProps {
  variant?: 'landing' | 'features'
}

export default function Topbar({ variant = 'landing' }: TopbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/90 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 h-[3.25rem]">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-[0.65rem] tracking-[0.12em] text-accent bg-accent-dark px-1.5 py-0.5 rounded-[0.2rem]">
            WP
          </span>
          <span className="font-heading font-bold text-sm text-primary">WPorbit</span>
        </Link>

        <nav className="flex items-center gap-5">
          {variant === 'landing' ? (
            <>
              <a href="#produkt"   className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Produkt</a>
              <Link to="/features" className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Features</Link>
              <a href="#vergleich" className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Vergleich</a>
              <a href="#preise"    className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Preise</a>
              <a href="#waitlist"  className="text-[0.82rem] font-medium text-primary bg-surface border border-line px-3.5 py-1.5 rounded-[0.28rem] hover:bg-raised transition-colors">
                Early Access
              </a>
            </>
          ) : (
            <>
              <Link to="/"          className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Startseite</Link>
              <Link to="/#vergleich" className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Vergleich</Link>
              <Link to="/#preise"   className="text-[0.82rem] font-medium text-secondary hover:text-primary transition-colors">Preise</Link>
              <Link to="/#waitlist" className="text-[0.82rem] font-medium text-primary bg-surface border border-line px-3.5 py-1.5 rounded-[0.28rem] hover:bg-raised transition-colors">
                Early Access
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
