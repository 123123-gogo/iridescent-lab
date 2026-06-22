import { Link } from 'react-router-dom'

interface CategoryChipProps {
  slug: string
  name: string
  count?: number
  link?: boolean
}

export default function CategoryChip({ slug, name, count, link = true }: CategoryChipProps) {
  const content = (
    <>
      {name}
      {count !== undefined && (
        <span className="ml-1 opacity-70">{count}</span>
      )}
    </>
  )

  if (!link) {
    return (
      <span className="inline-block px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full text-xs font-medium">
        {content}
      </span>
    )
  }

  return (
    <Link
      to={`/category/${slug}`}
      className="inline-block px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full text-xs font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-150"
    >
      {content}
    </Link>
  )
}
