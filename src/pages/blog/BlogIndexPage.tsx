import Seo from '../../components/Seo'
import PageHero from '../../components/PageHero'
import BlogCard from '../../components/blog/BlogCard'
import CategoryFilter from '../../components/blog/CategoryFilter'
import NewsletterSignup from '../../components/blog/NewsletterSignup'
import SearchBox from '../../components/SearchBox'
import { getAllPosts, getFeaturedPost } from '../../lib/content'
import { breadcrumbLd } from '../../lib/jsonld'

const crumbs = [{ label: 'Blog', path: '/blog' }]

export default function BlogIndexPage() {
  const featured = getFeaturedPost()
  const rest = getAllPosts().filter((p) => p.path !== featured?.path)

  return (
    <>
      <Seo
        title="Blog"
        description="Tipps, Tricks und Praxiswissen für WordPress-Agenturen: Wartung, Sicherheit, Deployment, Hosting und Agenturbetrieb."
        path="/blog"
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Blog"
        title="Praxiswissen für WordPress-Agenturen"
        lead="Wartung, Sicherheit, Deployment und Agenturbetrieb. Geschrieben aus dem Alltag, nicht aus der Theorie."
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-20">
        <div className="mb-8 flex flex-col gap-5">
          <div className="max-w-xl">
            <SearchBox only="blog" placeholder="Beiträge durchsuchen …" label="Blog durchsuchen" />
          </div>
          <CategoryFilter />
        </div>

        {getAllPosts().length === 0 ? (
          <p className="rounded-panel border border-line bg-surface px-6 py-10 text-center text-secondary">
            Hier erscheinen bald die ersten Beiträge.
          </p>
        ) : (
          <div className="stagger-group grid gap-4 md:grid-cols-2">
            {featured && <BlogCard post={featured} featured />}
            {rest.map((post) => (
              <BlogCard key={post.path} post={post} />
            ))}
          </div>
        )}

        <div className="mt-14 max-w-2xl">
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}
