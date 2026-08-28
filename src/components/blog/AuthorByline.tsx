import { formatDate, readingTimeLabel } from '../../lib/format'
import type { Author } from '../../content/authors'

interface AuthorBylineProps {
  author: Author
  date: string
  updated?: string
  readingMinutes: number
}

export default function AuthorByline({ author, date, updated, readingMinutes }: AuthorBylineProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-raised font-heading text-[0.8125rem] font-semibold text-secondary"
        >
          {author.name.charAt(0)}
        </span>
        <div className="leading-tight">
          <p className="text-[0.875rem] font-medium text-primary">{author.name}</p>
          <p className="text-[0.75rem] text-tertiary">{author.role}</p>
        </div>
      </div>

      <span aria-hidden="true" className="hidden h-8 w-px bg-line sm:block" />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-tertiary">
        <time dateTime={date}>{formatDate(date)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingTimeLabel(readingMinutes)}</span>
        {updated && updated !== date && (
          <>
            <span aria-hidden="true">·</span>
            <span>Aktualisiert am {formatDate(updated)}</span>
          </>
        )}
      </div>
    </div>
  )
}
