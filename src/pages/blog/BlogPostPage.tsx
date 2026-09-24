import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import ArticleLayout from '../../components/article/ArticleLayout'
import AuthorByline from '../../components/blog/AuthorByline'
import RelatedPosts from '../../components/blog/RelatedPosts'
import NewsletterSignup from '../../components/blog/NewsletterSignup'
import { mdxComponents } from '../../components/mdx'
import { getPostBySlug, getRelatedPosts } from '../../lib/content'
import { blogCategory } from '../../content/taxonomy'
import { blogPostingLd, breadcrumbLd } from '../../lib/jsonld'
import { SITE } from '../../config/site'
import type { MdxBody } from '../../lib/content/types'

interface BlogPostPageProps {
  slug: string
  Body: MdxBody
}

export default function BlogPostPage({ slug, Body }: BlogPostPageProps) {
  const post = getPostBySlug(slug)
  if (!post) return null

  const category = blogCategory(post.category)
  const crumbs = [
    { label: 'Blog', path: '/blog' },
    ...(category ? [{ label: category.label, path: `/blog/kategorie/${category.slug}` }] : []),
    { label: post.title, path: post.path },
  ]

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={post.path}
        type="article"
        image={post.cover ?? SITE.blogOgImage}
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        authorName={post.author.name}
        noindex={post.draft}
        jsonLd={[blogPostingLd(post), breadcrumbLd(crumbs)]}
      />

      <ArticleLayout
        crumbs={crumbs}
        kicker={
          category && (
            <Link
              to={`/blog/kategorie/${category.slug}`}
              className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-accent"
            >
              {category.label}
            </Link>
          )
        }
        title={post.title}
        lead={post.description}
        meta={
          <AuthorByline
            author={post.author}
            date={post.date}
            updated={post.updated}
            readingMinutes={post.readingMinutes}
          />
        }
        toc={post.toc}
        footer={
          <div className="flex flex-col gap-12">
            <NewsletterSignup />
            <RelatedPosts posts={getRelatedPosts(post.slug)} />
          </div>
        }
      >
        <Body components={mdxComponents} />
      </ArticleLayout>
    </>
  )
}
