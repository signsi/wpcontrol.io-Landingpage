import Seo from '../../components/Seo'
import PageHero from '../../components/PageHero'
import BlogCard from '../../components/blog/BlogCard'
import CategoryFilter from '../../components/blog/CategoryFilter'
import { getPostsByCategory } from '../../lib/content'
import { blogCategory } from '../../content/taxonomy'
import { breadcrumbLd } from '../../lib/jsonld'

interface BlogCategoryPageProps {
  category: string
}

export default function BlogCategoryPage({ category }: BlogCategoryPageProps) {
  const meta = blogCategory(category)
  const posts = getPostsByCategory(category)
  const path = `/blog/kategorie/${category}`

  const crumbs = [
    { label: 'Blog', path: '/blog' },
    { label: meta?.label ?? category, path },
  ]

  return (
    <>
      <Seo
        title={`${meta?.label ?? category} – Blog`}
        description={meta?.description ?? `Beiträge aus der Kategorie ${category}.`}
        path={path}
        jsonLd={breadcrumbLd(crumbs)}
      />

      <PageHero
        kicker="Kategorie"
        title={meta?.label ?? category}
        lead={meta?.description}
        crumbs={crumbs}
        bordered={false}
      />

      <section className="px-6 pb-20">
        <div className="mb-8">
          <CategoryFilter />
        </div>

        <div className="stagger-group grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.path} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
