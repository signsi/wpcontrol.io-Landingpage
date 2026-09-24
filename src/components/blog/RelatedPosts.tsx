import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/format'
import type { BlogPost } from '../../lib/content/types'

interface RelatedPostsProps {
  posts: BlogPost[]
  heading?: string
}

export default function RelatedPosts({ posts, heading = 'Passend dazu' }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="border-t border-line pt-9">
      <h2 className="mb-5 font-heading text-[1.125rem] font-semibold text-primary">{heading}</h2>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.path}>
            <Link
              to={post.path}
              className="flex h-full flex-col rounded-control border border-line bg-surface p-4 transition-colors hover:border-tertiary/40"
            >
              <span className="text-[0.75rem] text-tertiary">{formatDate(post.date)}</span>
              <span className="mt-1.5 font-heading text-[0.9375rem] font-semibold leading-snug text-primary">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
