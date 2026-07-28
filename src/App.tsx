import { useEffect } from 'react'
import { initAnimations } from './lib/animations'
import Topbar      from './components/Topbar'
import Hero        from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import LogoCloud   from './components/LogoCloud'
import Showcase    from './components/Showcase'
import AISection   from './components/AISection'
import EarlyAccess from './components/EarlyAccess'
import Comparison  from './components/Comparison'
import Pricing     from './components/Pricing'
import FAQ         from './components/FAQ'
import Footer      from './components/Footer'

export default function App() {
  useEffect(() => initAnimations(), [])

  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="landing" />
      <main className="pt-[3.75rem]">
        <Hero />
        <FeatureGrid />
        <Showcase />
        <LogoCloud />
        <AISection />
        <EarlyAccess />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
