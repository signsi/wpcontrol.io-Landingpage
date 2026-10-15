import type { ReactNode } from 'react'

/** Linien-Icons der Cloud-Seite: 24er Raster, eine Strichstärke. */
function Icon({ children, className = 'size-5' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export const CoinsIcon = () => (
  <Icon>
    <ellipse cx="9" cy="7" rx="5" ry="2.5" />
    <path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" />
    <path d="M10 15.4c.6.1 1.3.1 2 .1 2.8 0 5-1.1 5-2.5" />
    <ellipse cx="15" cy="13" rx="5" ry="2.5" />
    <path d="M10 13v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" />
  </Icon>
)

export const CalmIcon = () => (
  <Icon>
    <path d="M6 16V11a6 6 0 0 1 9.5-4.9" />
    <path d="M18 11v5l1.5 2H6.8" />
    <path d="M10 21h4" />
    <path d="M4 4l16 16" />
  </Icon>
)

export const BriefcaseIcon = () => (
  <Icon>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M3 12.5h18" />
  </Icon>
)

export const LayersIcon = () => (
  <Icon>
    <path d="M12 4l8.5 4.5L12 13 3.5 8.5z" />
    <path d="M3.5 12.5L12 17l8.5-4.5" />
    <path d="M3.5 16.5L12 21l8.5-4.5" />
  </Icon>
)

export const PipelineIcon = () => (
  <Icon>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M6 8v8M8 6h3a5 5 0 0 1 5 5v-1M8 18h3a5 5 0 0 0 5-5" />
  </Icon>
)

export const UserKeyIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20a6 6 0 0 1 9.5-4.9" />
    <circle cx="17" cy="15" r="2" />
    <path d="M17 17v4M17 19h2" />
  </Icon>
)

export const LinkIcon = () => (
  <Icon>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Icon>
)

export const ShieldIcon = () => (
  <Icon>
    <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.2-7.5 9.5-4.3-1.3-7.5-5-7.5-9.5V6z" />
  </Icon>
)

export const PatchIcon = () => (
  <Icon>
    <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-45 12 12)" />
    <path d="M10.5 10.5h.01M13.5 13.5h.01M10.5 13.5h.01M13.5 10.5h.01" />
  </Icon>
)

export const YesIcon = () => (
  <Icon className="size-4">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
)

export const NoIcon = () => (
  <Icon className="size-4">
    <path d="M7 12h10" />
  </Icon>
)

export const PinIcon = () => (
  <Icon>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
)
