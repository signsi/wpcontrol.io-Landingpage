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
    name: 'Patrick Williner',
    role: 'Geschäftsführer, WPorbit',
    bio: 'Gründer und Geschäftsführer der viwiv GmbH in Rotkreuz, die WPorbit entwickelt.',
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
