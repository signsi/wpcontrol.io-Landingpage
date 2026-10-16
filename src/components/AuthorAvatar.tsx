import type { Author } from '../content/authors'

interface AuthorAvatarProps {
  author: Author
  /** Kantenlänge in Pixeln. */
  size?: number
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
}

/**
 * Porträt einer Autorin oder eines Autors. Solange in `authors.ts` kein
 * `avatar` hinterlegt ist, stehen die Initialen da, nie ein leeres Bild.
 */
export default function AuthorAvatar({ author, size = 36 }: AuthorAvatarProps) {
  const style = { width: size, height: size }
  if (author.avatar) {
    return (
      <img
        src={author.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        style={style}
        className="shrink-0 rounded-full border border-line object-cover"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...style, fontSize: Math.round(size * 0.36) }}
      className="grid shrink-0 place-items-center rounded-full border border-line bg-raised font-heading font-semibold text-secondary"
    >
      {initials(author.name)}
    </span>
  )
}
