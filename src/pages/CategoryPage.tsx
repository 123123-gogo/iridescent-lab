import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticlesByCategory, getAllArticles } from '../data/articles'
import { categories } from '../data/categories'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

const ARTICLES_PER_PAGE = 6

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState(1)

  const category = categories.find((c) => c.slug === slug)
  const articles = slug ? getArticlesByCategory(slug) : getAllArticles()

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const paginatedArticles = useMemo(
    () => articles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE),
    [articles, page]
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-tertiary)] mb-8">
        <Link
          to="/"
          className="hover:text-[var(--color-text-link)] transition-colors duration-150"
        >
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text-primary)]">
          {category ? category.name : '全部文章'}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-[var(--color-text-primary)]">
          {category ? category.name : '全部文章'}
        </h1>
        {category && (
          <p className="mt-2 text-[var(--color-text-secondary)]">
            {category.description}
          </p>
        )}
        <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
          共 {articles.length} 篇文章
        </p>
      </header>

      {/* Empty state */}
      {articles.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">
            <svg
              width="64"
              height="64"
              className="mx-auto text-[var(--color-text-tertiary)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)]">
            该分类暂无文章
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-[var(--color-text-link)] hover:underline text-sm"
          >
            返回首页
          </Link>
        </div>
      )}

      {/* Article grid */}
      {articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-12">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  )
}
