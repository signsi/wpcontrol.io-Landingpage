interface PlanetDotProps {
  color?: 'solar' | 'orbit'
  size?: number
  ring?: boolean
  ringPadding?: number
  className?: string
}

const gradients: Record<NonNullable<PlanetDotProps['color']>, string> = {
  solar: 'gradient-solar',
  orbit: 'gradient-orbit',
}

const glows: Record<NonNullable<PlanetDotProps['color']>, string> = {
  solar: '0 0 14px rgba(255,106,57,0.55)',
  orbit: '0 0 14px rgba(47,217,238,0.45)',
}

export default function PlanetDot({ color = 'solar', size = 12, ring = false, ringPadding = 8, className = '' }: PlanetDotProps) {
  const dotStyle = { width: size, height: size, boxShadow: glows[color] }
  const dotClass = `inline-block rounded-full flex-shrink-0 ${gradients[color]}`

  if (!ring) {
    return <span aria-hidden="true" className={`${dotClass} ${className}`} style={dotStyle} />
  }

  const ringDiameter = size + ringPadding * 2

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full border border-line flex-shrink-0 ${className}`}
      style={{ width: ringDiameter, height: ringDiameter }}
    >
      <span aria-hidden="true" className={dotClass} style={dotStyle} />
    </span>
  )
}
