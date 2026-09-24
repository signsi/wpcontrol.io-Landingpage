import Seo from '../components/Seo'
import Hero from '../components/Hero'
import BigPlus from '../components/BigPlus'
import AgencyBanner from '../components/AgencyBanner'
import FeatureGrid from '../components/FeatureGrid'
import Showcase from '../components/Showcase'
import LogoCloud from '../components/LogoCloud'
import EarlyAccess from '../components/EarlyAccess'
import Comparison from '../components/Comparison'
import CloudTeaser from '../components/CloudTeaser'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import BlogTeaser from '../components/blog/BlogTeaser'
import { organizationLd, softwareApplicationLd, webSiteLd } from '../lib/jsonld'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Startseite"
        path="/"
        jsonLd={[organizationLd(), webSiteLd(), softwareApplicationLd()]}
      />

      <Hero />
      <BigPlus />
      <AgencyBanner />
      <FeatureGrid />
      <Showcase />
      <LogoCloud />
      <EarlyAccess />
      <Comparison />
      <CloudTeaser />
      <Pricing />
      <FAQ />
      <BlogTeaser />
    </>
  )
}
