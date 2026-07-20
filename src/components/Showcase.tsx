import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showcaseFeatures } from '../data/features'
import { OrbitArc } from './OrbitMotif'

export default function Showcase() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el    = itemRefs.current[active]
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!el || !thumb || !track) return
    const trackRect = track.getBoundingClientRect()
    const elRect    = el.getBoundingClientRect()
    thumb.style.top    = `${elRect.top - trackRect.top}px`
    thumb.style.height = `${elRect.height}px`
  }, [active])

  return (
    <section className="relative px-6 py-20" id="detail">
      <OrbitArc
        rotate={-14}
        className="hidden lg:block absolute -right-16 -top-10 w-[420px] h-[420px] text-line opacity-50 pointer-events-none"
      />
      <div className="reveal-up relative grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">

        {/* Tab list with sliding amber bar */}
        <div className="flex" ref={trackRef}>
          <div className="relative w-px bg-line flex-shrink-0 self-stretch mr-0">
            <div
              ref={thumbRef}
              className="absolute left-0 right-0 bg-accent transition-[top,height] duration-[280ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
              style={{ top: 0, height: 0 }}
            />
          </div>
          <div className="flex flex-col flex-1">
            {showcaseFeatures.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => { itemRefs.current[i] = el }}
                className="px-5 py-5 cursor-pointer select-none"
                onClick={() => setActive(i)}
              >
                <p className={`font-heading font-bold text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.15] tracking-[-0.025em] transition-colors ${
                  i === active ? 'text-primary' : 'text-tertiary hover:text-secondary'
                }`}>
                  {f.title}
                </p>
                {i === active && (
                  <p className="text-secondary text-[0.9375rem] leading-[1.7] mt-3 max-w-[36ch]">
                    {f.text}
                  </p>
                )}
              </div>
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
