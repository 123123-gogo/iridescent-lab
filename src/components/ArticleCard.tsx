import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'
import { categories } from '../data/categories'

interface ArticleCardProps { article: Article }

export default function ArticleCard({ article }: ArticleCardProps) {
  const cat = categories.find((c) => c.slug === article.category)

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block glass rounded-2xl overflow-hidden transition-all duration-500 hover:glass-strong hover:-translate-y-[2px]"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={article.coverImage} alt={article.title}
          loading="lazy" width="400" height="225"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
          {cat?.name || article.category}
        </span>
        <h3 className="mt-2 text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-zinc-200 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="mt-1.5 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <img src={article.author.avatar} alt="" width="16" height="16" className="w-4 h-4 rounded-full" />
            {article.author.name}
          </span>
          <span>{article.readingTime} min</span>
        </div>
      </div>
    </Link>
  )
}
