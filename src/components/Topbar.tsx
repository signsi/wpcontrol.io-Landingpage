import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OrbitMark from './OrbitMark'

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
    { label: 'Standalone', href: '/standalone', isLink: true },
    { label: 'Cloud',      href: '/cloud',      isLink: true  },
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
        scrolled ? 'border-line bg-base/95' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-[1120px] items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="WPorbit Startseite">
          <OrbitMark className="h-8 w-8 text-primary" />
          <span className="font-heading text-[1.05rem] font-semibold tracking-[-0.02em] text-primary">WPorbit</span>
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
            <a href="#demo" className="gradient-solar rounded-full px-4 py-2 text-[0.8125rem] font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              Gratis testen
            </a>
          ) : (
            <Link to="/#demo" className="gradient-solar rounded-full px-4 py-2 text-[0.8125rem] font-semibold text-on-accent shadow-action transition duration-200 ease-out-expo hover:-translate-y-0.5 hover:brightness-110">
              Gratis testen
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
        <div className="border-t border-line bg-base md:hidden">
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
              href="#demo"
              className="gradient-solar mt-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-on-accent shadow-action"
              onClick={() => setMobileOpen(false)}
            >
              Gratis testen
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
