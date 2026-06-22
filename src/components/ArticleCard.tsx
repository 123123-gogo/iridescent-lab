import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'
import CategoryChip from './CategoryChip'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block rounded-lg overflow-hidden bg-white border border-[var(--color-border)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          width="400"
          height="225"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <CategoryChip
          slug={article.category}
          name={
            article.category === 'technology'
              ? '科技'
              : article.category === 'design'
              ? '设计'
              : article.category === 'culture'
              ? '文化'
              : '科学'
          }
          link={false}
        />
        <h3 className="mt-2 text-lg font-bold text-[var(--color-text-primary)] line-clamp-2 leading-snug">
          {article.title}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          <span>{article.readingTime} 分钟阅读</span>
        </div>
      </div>
    </Link>
  )
}
