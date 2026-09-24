import { Link } from 'react-router-dom'

interface CTABandProps {
  title: string
  text: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}

/**
 * Wiederverwendbarer Abschluss-CTA. Ersetzt die vier nahezu identischen,
 * von Hand kopierten Schluss-Sektionen der Produktseiten.
 */
export default function CTABand({
  title,
  text,
  primary = { label: '10 Tage gratis testen', to: '/demo' },
  secondary,
}: CTABandProps) {
  return (
    <section className="reveal-up border-t border-line bg-surface px-6 py-20 text-center">
      <h2 className="mx-auto mb-3 max-w-[26ch] font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
        {title}
      </h2>
      <p className="mx-auto mb-7 max-w-[46ch] text-[0.95rem] leading-[1.75] text-secondary">
        {text}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to={primary.to} className="btn btn-primary btn-md">
          {primary.label}
        </Link>
        {secondary && (
          <Link to={secondary.to} className="btn btn-secondary btn-md">
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  )
}
