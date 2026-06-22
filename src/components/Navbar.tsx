import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-150 hover:text-[var(--color-primary)] ${
      location.pathname === path || location.pathname.startsWith(path + '/')
        ? 'text-[var(--color-primary)]'
        : 'text-[var(--color-text-secondary)]'
    }`

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? 'shadow-sm bg-white/95 backdrop-blur-sm' : 'bg-white'
      }`}
      style={{ height: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-black tracking-tight text-[var(--color-text-primary)]"
        >
          静读
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/articles" className={linkClass('/articles')}>
            文章
          </Link>
          <Link to="/category/technology" className={linkClass('/category')}>
            分类
          </Link>
          <Link to="/about" className={linkClass('/about')}>
            关于
          </Link>
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center"
            title="搜索文章"
            aria-label="搜索文章"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center"
            title="搜索文章"
            aria-label="搜索文章"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center"
            title="菜单"
            aria-label="菜单"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[var(--color-border)] shadow-sm">
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/articles"
              className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2"
            >
              文章
            </Link>
            <Link
              to="/category/technology"
              className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2"
            >
              分类
            </Link>
            <Link
              to="/about"
              className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2"
            >
              关于
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
