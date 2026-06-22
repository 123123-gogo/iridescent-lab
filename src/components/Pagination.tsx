interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  const btnClass =
    'min-w-[44px] h-11 px-3 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center justify-center'
  const activeClass = 'bg-[var(--color-primary)] text-white'
  const inactiveClass =
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
  const disabledClass = 'text-[var(--color-text-tertiary)] opacity-50 cursor-not-allowed'

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="分页导航">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`}
        aria-label="上一页"
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className={`${btnClass} text-[var(--color-text-tertiary)]`}
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`${btnClass} ${p === currentPage ? activeClass : inactiveClass}`}
            aria-label={`第 ${p} 页`}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`}
        aria-label="下一页"
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}
