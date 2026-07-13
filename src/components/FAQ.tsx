import { useState } from 'react'
import { faqItems } from '../data/landing'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-6 py-16 border-t border-line" id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">

        {/* Left: heading */}
        <div className="lg:sticky lg:top-24">
          <p className="font-heading font-bold text-[0.67rem] uppercase tracking-[0.13em] text-accent mb-3">
            FAQ
          </p>
          <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em] mb-4">
            Was Teams vor dem Start wissen wollen
          </h2>
          <p className="text-secondary text-[0.88rem] leading-[1.75] max-w-[32ch]">
            Weitere Fragen? Melde dich direkt über die Early-Access-Anmeldung.
          </p>
        </div>

        {/* Right: accordion cards */}
        <div className="flex flex-col gap-2">
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  isOpen ? 'border-line bg-surface' : 'border-line bg-surface hover:bg-raised'
                }`}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer bg-transparent border-0"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-medium text-[0.9rem] leading-snug transition-colors ${
                    isOpen ? 'text-primary' : 'text-secondary'
                  }`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[0.75rem] transition-colors mt-0.5 ${
                    isOpen ? 'border-accent text-accent' : 'border-line text-tertiary'
                  }`}>
                    {isOpen ? '×' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-secondary text-[0.88rem] leading-[1.75]">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
