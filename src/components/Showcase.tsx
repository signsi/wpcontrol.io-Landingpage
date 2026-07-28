import { useState } from 'react'
import { Link } from 'react-router-dom'
import { showcaseFeatures } from '../data/features'
import { OrbitArc } from './OrbitMotif'

export default function Showcase() {
  const [active, setActive] = useState(0)
  return (
    <section className="relative px-6 py-20" id="detail">
      <OrbitArc
        rotate={-14}
        className="hidden lg:block absolute -right-16 -top-10 w-[420px] h-[420px] text-line opacity-50 pointer-events-none"
      />
      <div className="reveal-up relative grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">

        <div className="flex">
          <div className="flex flex-col flex-1">
            {showcaseFeatures.map((f, i) => (
              <button
                key={f.title}
                type="button"
                className={`cursor-pointer select-none border-l px-5 py-5 text-left transition-colors duration-200 ${
                  i === active ? 'border-accent bg-accent-tint/35' : 'border-line hover:bg-raised'
                }`}
                onClick={() => setActive(i)}
              >
                <p className={`font-heading font-semibold text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.15] tracking-[-0.025em] transition-colors ${
                  i === active ? 'text-primary' : 'text-tertiary hover:text-secondary'
                }`}>
                  {f.title}
                </p>
                {i === active && (
                  <p className="text-secondary text-[0.9375rem] leading-[1.7] mt-3 max-w-[36ch]">
                    {f.text}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Visual panel */}
        <div className="border border-line rounded-xl overflow-hidden min-h-72 flex flex-col">
          {showcaseFeatures[active].visual}
        </div>
      </div>

      <div className="mt-8">
        <Link to="/features" className="text-[0.875rem] font-medium text-secondary hover:text-accent transition-colors">
          Features im Detail ansehen →
        </Link>
      </div>
    </section>
  )
}
