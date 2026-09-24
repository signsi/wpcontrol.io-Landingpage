import { NavLink } from 'react-router-dom'
import { getBlogCategories } from '../../lib/content'

const base =
  'rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors'

export default function CategoryFilter() {
  const categories = getBlogCategories()
  if (categories.length === 0) return null

  return (
    <nav aria-label="Blog-Kategorien" className="flex flex-wrap gap-2">
      <NavLink
        to="/blog"
        end
        className={({ isActive }) =>
          `${base} ${isActive ? 'border-accent bg-accent-tint text-accent-strong' : 'border-line text-secondary hover:border-tertiary/50 hover:text-primary'}`
        }
      >
        Alle
      </NavLink>
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          to={category.path}
          className={({ isActive }) =>
            `${base} ${isActive ? 'border-accent bg-accent-tint text-accent-strong' : 'border-line text-secondary hover:border-tertiary/50 hover:text-primary'}`
          }
        >
          {category.label}
          <span className="ml-1.5 text-tertiary">{category.count}</span>
        </NavLink>
      ))}
    </nav>
  )
}
