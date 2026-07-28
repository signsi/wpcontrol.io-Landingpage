interface PlanetDotProps {
  color?: 'solar' | 'orbit'
  size?: number
  ring?: boolean
  ringPadding?: number
  className?: string
}

/** Single-accent "Signal-Punkt" motif — the `color` prop is kept for call-site compatibility but no longer changes the hue. */
export default function PlanetDot({ size = 12, ring = false, ringPadding = 8, className = '' }: PlanetDotProps) {
  const dotSize = size >= 18 ? 'size-[1.125rem]' : size >= 16 ? 'size-4' : 'size-3'
  const ringSize = size + ringPadding * 2 >= 38 ? 'size-[2.375rem]' : 'size-[2.125rem]'
  const dotClass = `inline-block flex-shrink-0 rounded-full bg-accent shadow-[0_0_14px_oklch(52%_0.185_288/45%)] ${dotSize}`

  if (!ring) {
    return <span aria-hidden="true" className={`${dotClass} ${className}`} />
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-full border border-line ${ringSize} ${className}`}
    >
      <span aria-hidden="true" className={dotClass} />
    </span>
  )
}
