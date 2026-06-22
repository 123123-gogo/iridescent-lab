import { getAllArticles } from '../data/articles'
import { categories } from '../data/categories'
import HeroArticle from '../components/HeroArticle'
import ArticleCard from '../components/ArticleCard'
import CategoryChip from '../components/CategoryChip'

export default function Home() {
  const articles = getAllArticles()
  const latestArticles = articles.filter((a) => !a.featured).slice(0, 6)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <HeroArticle />

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            最新文章
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            分类浏览
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <CategoryChip
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                count={cat.articleCount}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
