interface OrbitArcProps {
  className?: string
  rotate?: number
}

/** Offener Orbit-Bogen — das Kernmotiv aus dem Logo, als leise Deko hinter Karten/Sections. Nie vollständig geschlossen. */
export function OrbitArc({ className = '', rotate = -18 }: OrbitArcProps) {
  const rotation = rotate === -14 ? '-rotate-[14deg]' : '-rotate-[18deg]'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`${rotation} ${className}`}
    >
      <ellipse
        cx="100"
        cy="100"
        rx="96"
        ry="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        pathLength={100}
        strokeDasharray="88 12"
        strokeDashoffset="-6"
      />
    </svg>
  )
}

interface OrbitDividerProps {
  className?: string
}

/** Geschwungene Divider-Linie zwischen zwei Sections, anstelle einer geraden Trennlinie. */
export function OrbitDivider({ className = '' }: OrbitDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 32"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M0,16 C100,-6 300,38 400,16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}
