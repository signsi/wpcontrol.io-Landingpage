import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import { getAllPosts } from '../../lib/content'

/**
 * Blog-Anriss auf der Startseite. Der sichtbarste Ausdruck der neuen
 * Doppelrolle: die Landingpage verweist Bestandskunden aktiv ins Wissen.
 */
export default function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="border-t border-line px-6 py-24">
      <div className="reveal-up mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-accent">
            Aus dem Blog
          </p>
          <h2 className="max-w-[24ch] font-heading text-[clamp(1.75rem,3.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Praxiswissen für WordPress-Agenturen
          </h2>
        </div>
        <Link to="/blog" className="btn btn-secondary btn-sm">
          Alle Beiträge
        </Link>
      </div>

      <div className="stagger-group grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.path} post={post} />
        ))}
      </div>
    </section>
  )
}
