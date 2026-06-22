import { Link } from 'react-router-dom'
import { getFeaturedArticle } from '../data/articles'
import CategoryChip from './CategoryChip'

export default function HeroArticle() {
  const article = getFeaturedArticle()

  if (!article) return null

  const categoryName =
    article.category === 'technology'
      ? '科技'
      : article.category === 'design'
      ? '设计'
      : article.category === 'culture'
      ? '文化'
      : '科学'

  return (
    <Link
      to={`/article/${article.slug}`}
      className="block group"
    >
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <div className="absolute bottom-4 right-4">
          <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {article.readingTime} 分钟阅读
          </span>
        </div>
      </div>

      <div className="mt-6 max-w-3xl">
        <CategoryChip slug={article.category} name={categoryName} />
        <h1 className="mt-3 text-3xl md:text-5xl font-black text-[var(--color-text-primary)] leading-tight tracking-tight">
          {article.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            width="32"
            height="32"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {article.author.name}
          </span>
          <span className="text-sm text-[var(--color-text-tertiary)]">·</span>
          <time
            dateTime={article.publishedAt}
            className="text-sm text-[var(--color-text-tertiary)]"
          >
            {article.publishedAt}
          </time>
          <span className="text-sm text-[var(--color-text-tertiary)]">·</span>
          <span className="text-sm text-[var(--color-text-tertiary)]">
            {article.readingTime} 分钟阅读
          </span>
        </div>
      </div>
    </Link>
  )
}
