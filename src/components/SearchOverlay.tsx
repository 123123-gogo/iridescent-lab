import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllArticles } from '../data/articles'

interface SearchOverlayProps { isOpen: boolean; onClose: () => void }

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const articles = getAllArticles()

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
    else setQuery('')
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!isOpen) return null

  const results = query.trim().length > 0
    ? articles.filter((a) => {
        const q = query.toLowerCase()
        return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))
      })
    : []

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="glass-strong rounded-2xl w-full max-w-[640px] mx-4 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lab notes..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white text-sm placeholder:text-zinc-600 transition-all duration-300"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim().length === 0 && <div className="p-8 text-center text-sm text-zinc-500">Type to search articles, tags, and excerpts</div>}
          {query.trim().length > 0 && results.length === 0 && <div className="p-8 text-center text-sm text-zinc-500">No results found</div>}
          {results.map((article) => (
            <button key={article.slug} onClick={() => { navigate(`/article/${article.slug}`); onClose() }}
              className="w-full text-left p-4 hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-b-0">
              <h4 className="text-sm font-semibold text-zinc-200">{article.title}</h4>
              <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{article.excerpt}</p>
            </button>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-white/10 text-xs text-zinc-600 text-center">ESC to close</div>
      </div>
    </div>
  )
}
