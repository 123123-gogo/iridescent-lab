import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps { onSearchOpen: () => void }

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-300 ${
      location.pathname === path || location.pathname.startsWith(path + '/')
        ? 'text-white'
        : 'text-zinc-400 hover:text-white'
    }`

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{ height: '64px' }}
    >
      <div className={`h-full transition-all duration-500 ${scrolled ? 'glass-strong' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tight text-white">IRIDESCENT</span>
            <span className="hidden sm:inline text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em]">Lab</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/articles" className={linkClass('/articles')}>Journal</Link>
            <Link to="/category/experiments" className={linkClass('/category')}>Work</Link>
            <Link to="/about" className={linkClass('/about')}>Studio</Link>
            <button onClick={onSearchOpen} className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 w-11 h-11 flex items-center justify-center" title="搜索" aria-label="搜索">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" className="text-zinc-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button onClick={onSearchOpen} className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 w-11 h-11 flex items-center justify-center" title="搜索" aria-label="搜索">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" className="text-zinc-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 w-11 h-11 flex items-center justify-center" title="菜单" aria-label="菜单">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" className="text-zinc-400">
                {menuOpen ? <path d="M6 18 18 6M6 6l12 12"/> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-strong">
          <div className="px-6 py-4 space-y-3">
            <Link to="/articles" className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2">Journal</Link>
            <Link to="/category/experiments" className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2">Work</Link>
            <Link to="/about" className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2">Studio</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
