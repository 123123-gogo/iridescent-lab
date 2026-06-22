import { Link } from 'react-router-dom'

interface CategoryChipProps {
  slug: string
  name: string
  count?: number
}

export default function CategoryChip({ slug, name, count }: CategoryChipProps) {
  return (
    <Link
      to={`/category/${slug}`}
      className="inline-block px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full text-xs font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-150"
    >
      {name}
      {count !== undefined && (
        <span className="ml-1 opacity-70">{count}</span>
      )}
    </Link>
  )
}
