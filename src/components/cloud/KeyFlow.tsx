import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Eigene Linien-Icons, eine Strichstärke, damit sie zusammenpassen. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

const MacIcon = () => (
  <Icon>
    <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" />
    <path d="M2 19h20" />
  </Icon>
)

const ServerIcon = () => (
  <Icon>
    <rect x="4" y="4" width="16" height="7" rx="1.5" />
    <rect x="4" y="13" width="16" height="7" rx="1.5" />
    <path d="M8 7.5h.01M8 16.5h.01" />
  </Icon>
)

const DashboardIcon = () => (
  <Icon>
    <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
    <path d="M3.5 9h17M9 9v11" />
  </Icon>
)

function Node({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="relative z-10 rounded-panel border border-line bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2.5 text-primary">
        <span className="grid size-9 place-items-center rounded-control bg-accent-tint text-accent">{icon}</span>
        <h3 className="font-heading text-[1rem] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}

/**
 * Verbindung zwischen zwei Stationen. Auf breiten Bildschirmen wandert ein
 * Punkt die Linie entlang; die Animation läuft über `transform` des Trägers,
 * damit sie bei jeder Breite stimmt. Schmal steht die Verbindung senkrecht und
 * still.
 */
function Link({ label, delay = '0s' }: { label: string; delay?: string }) {
  return (
    <div className="flex items-center justify-center lg:block lg:pt-14" aria-hidden="true">
      <div className="relative h-8 w-px bg-line lg:h-px lg:w-full">
        <span className="absolute inset-0 hidden lg:block">
          <span className="animate-key-travel absolute inset-0 block" style={{ animationDelay: delay }}>
            <span className="absolute -left-1.5 -top-1.5 block size-3 rounded-full bg-accent shadow-action" />
          </span>
        </span>
      </div>
      <p className="ml-3 text-[0.72rem] font-semibold text-accent lg:ml-0 lg:mt-2 lg:text-center">{label}</p>
    </div>
  )
}

export default function KeyFlow() {
  // Die Schleife läuft nur, solange das Schema zu sehen ist.
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-2 lg:grid-cols-[1fr_7rem_1.25fr_7rem_1fr] lg:gap-0 ${visible ? '' : '[&_.animate-key-travel]:[animation-play-state:paused]'}`}
    >
      <Node icon={<MacIcon />} title="Dein Mac">
        <p className="text-[0.86rem] leading-[1.65] text-secondary">
          Ein Rechtsklick auf das Projekt schaltet die Überwachung ein. Die Zugänge dafür liegen verschlüsselt
          auf dem Mac und verlassen ihn nicht.
        </p>
      </Node>

      <Link label="richtet einmal ein" />

      <Node icon={<ServerIcon />} title="Server des Kunden">
        <p className="text-[0.86rem] leading-[1.65] text-secondary">
          Ein Lese-Schlüssel, der nur feste Befehle ausführen darf. Keine Shell, keine Dateien, kein root. Und
          <strong className="font-semibold text-primary"> kein Plugin in WordPress.</strong>
        </p>
        <pre className="mt-3 overflow-x-auto rounded-control bg-dark px-3 py-2.5 text-[0.68rem] leading-[1.6] text-[oklch(88%_0.02_282)]">
          <code>
            <span className="text-[oklch(78%_0.12_288)]">restrict,command=</span>"~/.wporbit/agent.sh"{'\n'}
            ssh-ed25519 AAAAC3Nz… wporbit-worker
          </code>
        </pre>
        <p className="mt-2 text-[0.74rem] text-tertiary">Diese eine Zeile sieht dein Kunde, und er kann sie jederzeit löschen.</p>
      </Node>

      <Link label="liest nur" delay="2.2s" />

      <Node icon={<DashboardIcon />} title="Team-Dashboard">
        <p className="text-[0.86rem] leading-[1.65] text-secondary">
          Misst alle 5 Minuten von aussen und liest alle 6 Stunden das Inventar. Gehostet in der Schweiz, für
          das ganze Team.
        </p>
      </Node>
    </div>
  )
}
