import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticlesByCategory, getAllArticles } from '../data/articles'
import { categories } from '../data/categories'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

const PER_PAGE = 6

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState(1)
  const category = categories.find((c) => c.slug === slug)
  const articles = slug ? getArticlesByCategory(slug) : getAllArticles()
  const totalPages = Math.ceil(articles.length / PER_PAGE)
  const paginated = useMemo(() => articles.slice((page - 1) * PER_PAGE, page * PER_PAGE), [articles, page])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="text-sm text-zinc-600 mb-8">
        <Link to="/" className="hover:text-zinc-300 transition-colors duration-300">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">{category ? category.name : 'Journal'}</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">{category ? 'Research Area' : 'All'}</p>
        <h1 className="text-3xl font-black text-white mt-2">{category ? category.name : 'Journal'}</h1>
        {category && <p className="mt-2 text-zinc-400">{category.description}</p>}
        <p className="mt-1 text-sm text-zinc-600">{articles.length} notes</p>
      </header>

      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500">No notes in this area yet</p>
          <Link to="/" className="mt-4 inline-block text-sm text-zinc-400 hover:text-white transition-colors duration-300">Back home</Link>
        </div>
      )}

      {articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
          <div className="mt-12">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  )
}
