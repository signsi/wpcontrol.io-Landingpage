import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TopbarProps {
  variant?: 'landing' | 'features'
}

export default function Topbar({ variant = 'landing' }: TopbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const landingLinks = [
    { label: 'Produkt',    href: '#produkt',   isLink: false },
    { label: 'Features',   href: '/features',  isLink: true  },
    { label: 'Vergleich',  href: '#vergleich', isLink: false },
    { label: 'Preise',     href: '#preise',    isLink: false },
  ]
  const featureLinks = [
    { label: 'Startseite', href: '/',           isLink: true  },
    { label: 'Vergleich',  href: '/#vergleich', isLink: true  },
    { label: 'Preise',     href: '/#preise',    isLink: true  },
  ]
  const links = variant === 'landing' ? landingLinks : featureLinks

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-base/90 backdrop-blur-sm' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 h-[3.25rem]">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/wporbit-quer.svg" alt="WPorbit" className="h-6 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {links.map((l) =>
            l.isLink ? (
              <Link key={l.label} to={l.href} className="text-[0.875rem] font-medium text-secondary hover:text-primary transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-[0.875rem] font-medium text-secondary hover:text-primary transition-colors">
                {l.label}
              </a>
            )
          )}
          {variant === 'landing' ? (
            <a href="#waitlist" className="text-[0.875rem] font-medium text-primary bg-surface border border-line px-3.5 py-1.5 rounded-lg hover:bg-raised transition-colors">
              Early Access
            </a>
          ) : (
            <Link to="/#waitlist" className="text-[0.875rem] font-medium text-primary bg-surface border border-line px-3.5 py-1.5 rounded-lg hover:bg-raised transition-colors">
              Early Access
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
          aria-label={mobileOpen ? 'Navigation schliessen' : 'Navigation öffnen'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`block w-5 h-px bg-primary transition-all duration-200 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-primary transition-all duration-200 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-base/95 backdrop-blur-sm">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map((l) =>
              l.isLink ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-sm font-medium text-secondary hover:text-primary py-2.5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-secondary hover:text-primary py-2.5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="#waitlist"
              className="mt-2 text-sm font-bold text-on-accent gradient-solar px-4 py-2.5 rounded-lg text-center shadow-[0_4px_16px_-4px_#FF6A3966]"
              onClick={() => setMobileOpen(false)}
            >
              Early Access sichern
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
