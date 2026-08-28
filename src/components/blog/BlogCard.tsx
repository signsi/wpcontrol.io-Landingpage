import { Link } from 'react-router-dom'
import { blogCategory } from '../../content/taxonomy'
import { formatDate, readingTimeLabel } from '../../lib/format'
import type { BlogPost } from '../../lib/content/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const category = blogCategory(post.category)

  return (
    <article
      className={`group relative flex flex-col rounded-panel border border-line bg-surface p-6 transition-colors hover:border-tertiary/40 ${
        featured ? 'md:col-span-2 md:p-8' : ''
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-tertiary">
        {category && (
          <span className="font-semibold uppercase tracking-[0.1em] text-accent">
            {category.label}
          </span>
        )}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingTimeLabel(post.readingMinutes)}</span>
      </div>

      <h3
        className={`font-heading font-semibold leading-[1.22] tracking-[-0.02em] text-primary ${
          featured ? 'text-[clamp(1.35rem,2.6vw,1.75rem)]' : 'text-[1.0625rem]'
        }`}
      >
        <Link to={post.path} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className={`mt-3 text-secondary ${featured ? 'text-[0.9375rem] leading-[1.7]' : 'text-[0.875rem] leading-[1.65]'}`}>
        {post.description}
      </p>

      <span className="mt-5 text-[0.8125rem] font-medium text-tertiary transition-colors group-hover:text-accent">
        Weiterlesen →
      </span>
    </article>
  )
}
