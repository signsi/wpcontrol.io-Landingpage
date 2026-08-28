export interface Author {
  key: string
  name: string
  role: string
  bio: string
  avatar?: string
}

export const authors: Record<string, Author> = {
  patrick: {
    key: 'patrick',
    name: 'Patrick Siegfried',
    role: 'Gründer, WPorbit',
    bio: 'Baut seit über zehn Jahren WordPress-Projekte in Agenturen und entwickelt WPorbit aus genau diesem Alltag heraus.',
  },
  team: {
    key: 'team',
    name: 'WPorbit Team',
    role: 'Produkt & Entwicklung',
    bio: 'Beiträge aus dem Team hinter WPorbit.',
  },
}

export const fallbackAuthor = authors.team

export function resolveAuthor(key: string | undefined): Author {
  if (!key) return fallbackAuthor
  return authors[key] ?? fallbackAuthor
}
