import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import OrbitMark from './OrbitMark'
import MobileNav from './nav/MobileNav'
import { primaryCta, primaryNav, secondaryCta, type NavGroup } from '../config/navigation'

function isGroupActive(group: NavGroup, pathname: string): boolean {
  if (group.to) return pathname === group.to
  return (group.matches ?? []).some((m) => pathname === m || pathname.startsWith(`${m}/`))
}

export default function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  // Startwert bewusst `false`: der Server rendert ohne Scroll-Position. Würde
  // hier aus `window.scrollY` initialisiert, wiche die Hydration vom
  // vorgerenderten HTML ab.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openGroup) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null)
    }
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openGroup])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // Kleine Verzögerung beim Verlassen, damit die diagonale Mausbewegung vom
  // Trigger ins Panel das Menü nicht schliesst.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || openGroup ? 'border-line bg-base/95 backdrop-blur-sm' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-[1120px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="WPorbit Startseite">
          <OrbitMark className="h-8 w-8 text-primary" />
          <span className="font-heading text-[1.05rem] font-semibold tracking-[-0.02em] text-primary">
            WPorbit
          </span>
        </Link>

        <div ref={navRef} className="hidden md:flex items-center gap-1" onMouseLeave={scheduleClose}>
          <nav className="flex items-center gap-1" aria-label="Hauptnavigation">
            {primaryNav.map((group) => {
              const active = isGroupActive(group, pathname)
              const panelId = `nav-panel-${group.label.toLowerCase()}`

              if (group.to) {
                return (
                  <Link
                    key={group.label}
                    to={group.to}
                    onMouseEnter={() => { cancelClose(); setOpenGroup(null) }}
                    className={`rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors ${
                      active ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {group.label}
                  </Link>
                )
              }

              const isOpen = openGroup === group.label

              return (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onMouseEnter={() => { cancelClose(); setOpenGroup(group.label) }}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors ${
                      active || isOpen ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {group.label}
                    <svg
                      width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1.5L4.5 4.5L8 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="group"
                      aria-label={group.label}
                      onMouseEnter={cancelClose}
                      className={`absolute left-0 top-[calc(100%+0.5rem)] rounded-panel border border-line bg-surface p-2 shadow-overlay ${
                        group.columns ? 'grid grid-cols-2 gap-1 w-[38rem]' : 'w-[19rem]'
                      }`}
                    >
                      {group.columns
                        ? group.columns.map((col) => (
                            <div key={col.heading} className="p-2">
                              <p className="px-3 pb-2 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-tertiary">
                                {col.heading}
                              </p>
                              {col.items.map((item) => (
                                <NavPanelLink key={item.to} item={item} onNavigate={() => setOpenGroup(null)} />
                              ))}
                            </div>
                          ))
                        : group.items?.map((item) => (
                            <NavPanelLink key={item.to} item={item} onNavigate={() => setOpenGroup(null)} />
                          ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="ml-4 flex items-center gap-2">
            <Link
              to={secondaryCta.to}
              className="rounded-lg px-3 py-2 text-[0.875rem] font-medium text-secondary transition-colors hover:text-primary"
            >
              {secondaryCta.label}
            </Link>
            <Link to={primaryCta.to} className="btn btn-primary btn-sm">
              {primaryCta.label}
            </Link>
          </div>
        </div>

        <button
          className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? 'Navigation schliessen' : 'Navigation öffnen'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`block h-px w-5 bg-primary transition-all duration-200 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-primary transition-all duration-200 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  )
}

interface NavPanelLinkProps {
  item: { label: string; to: string; description?: string; badge?: string }
  onNavigate: () => void
}

function NavPanelLink({ item, onNavigate }: NavPanelLinkProps) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="group block rounded-control px-3 py-2.5 transition-colors hover:bg-raised"
    >
      <span className="flex items-center gap-2">
        <span className="text-[0.875rem] font-medium text-primary">{item.label}</span>
        {item.badge && (
          <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] font-semibold text-tertiary">
            {item.badge}
          </span>
        )}
      </span>
      {item.description && (
        <span className="mt-0.5 block text-[0.8125rem] leading-[1.5] text-tertiary">
          {item.description}
        </span>
      )}
    </Link>
  )
}
