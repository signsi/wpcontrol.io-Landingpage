interface OrbitMarkProps {
  className?: string
}

export default function OrbitMark({ className = 'h-8 w-8 text-primary' }: OrbitMarkProps) {
  return (
    <svg viewBox="8 -6 344 252" fill="none" className={`overflow-visible ${className}`} aria-hidden="true">
      <circle cx="180.88" cy="129.7" r="36" fill="currentColor" />
      <path d="M72.03,221.85c65.68,29.51,167.13,8,226.61-48.04,59.48-56.04,54.45-125.39-11.23-154.89-12.22-5.49-26.08-9.34-41.09-11.42" stroke="currentColor" strokeWidth="15" strokeLinecap="round" />
      <circle cx="0" cy="0" r="16" className="animate-logo-orbit fill-accent [filter:drop-shadow(0_0_3px_oklch(52%_0.185_288/60%))]" />
    </svg>
  )
}
