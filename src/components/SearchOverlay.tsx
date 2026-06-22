import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllArticles } from '../data/articles'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const articles = getAllArticles()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!isOpen) return null

  const results =
    query.trim().length > 0
      ? articles.filter((a) => {
          const q = query.toLowerCase()
          return (
            a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          )
        })
      : []

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[640px] mx-4 overflow-hidden transition-opacity duration-200">
        <div className="p-4 border-b border-[var(--color-border)]">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base transition-all duration-150"
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim().length === 0 && (
            <div className="p-8 text-center text-sm text-[var(--color-text-tertiary)]">
              输入关键词搜索文章标题、摘要和标签
            </div>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="p-8 text-center text-sm text-[var(--color-text-tertiary)]">
              未找到匹配的文章
            </div>
          )}

          {results.map((article) => {
            const matchStart = article.title
              .toLowerCase()
              .indexOf(query.toLowerCase())
            return (
              <button
                key={article.slug}
                onClick={() => {
                  navigate(`/article/${article.slug}`)
                  onClose()
                }}
                className="w-full text-left p-4 hover:bg-[var(--color-bg-secondary)] transition-colors duration-150 border-b border-[var(--color-border)] last:border-b-0"
              >
                {matchStart >= 0 ? (
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {article.title.slice(0, matchStart)}
                    <mark className="bg-yellow-200 text-inherit">
                      {article.title.slice(
                        matchStart,
                        matchStart + query.length
                      )}
                    </mark>
                    {article.title.slice(matchStart + query.length)}
                  </h4>
                ) : (
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {article.title}
                  </h4>
                )}
                <p className="mt-1 text-xs text-[var(--color-text-tertiary)] line-clamp-2">
                  {article.excerpt}
                </p>
              </button>
            )
          })}
        </div>

        <div className="px-4 py-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-tertiary)] text-center">
          按 ESC 关闭
        </div>
      </div>
    </div>
  )
}
