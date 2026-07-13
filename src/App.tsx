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
  return (
    <div className="min-h-screen bg-base text-primary">
      <Topbar variant="landing" />
      <main className="pt-[3.25rem]">
        <Hero />
        <FeatureGrid />
        <Showcase />
        <LogoCloud />
        <AISection />
        <EarlyAccess />
        <Comparison />
        <Pricing />
        <FAQ />

        <section className="px-6 py-20 border-t border-line text-center">
          <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.1] tracking-[-0.025em] mb-4 max-w-[28ch] mx-auto">
            Bring Ordnung in deinen WordPress-Alltag.
          </h2>
          <p className="text-secondary text-[0.95rem] leading-[1.75] max-w-[44ch] mx-auto mb-7">
            Sichere dir Early Access, erhalte sofort die ROI- und Migrations-Checkliste und gestalte die nächsten Prioritäten aktiv mit.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-accent text-on-accent font-bold text-sm px-6 py-3 rounded-[0.3rem] hover:opacity-90 transition-opacity"
          >
            Zur Early-Access-Anmeldung
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}
