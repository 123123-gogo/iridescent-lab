import { getAllArticles, getArticlesByCategory } from '../data/articles'
import { categories } from '../data/categories'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import FlowingMenu from '../components/FlowingMenu'
import { Link } from 'react-router-dom'

export default function Home() {
  const articles = getAllArticles()
  const latest = articles.filter((a) => !a.featured).slice(0, 6)

  const menuItems = categories.map((cat) => {
    const catArticles = getArticlesByCategory(cat.slug)
    const image = catArticles.length > 0 ? catArticles[0].coverImage : 'https://picsum.photos/600/400?random=1'
    return { link: `/category/${cat.slug}`, text: cat.name, image }
  })

  return (
    <div>
      <Hero />

      <section className="mt-8 mb-16">
        <div style={{ height: '600px', position: 'relative' }}>
          <FlowingMenu
            items={menuItems}
            speed={15}
            textColor="#ffffff"
            bgColor="#120F17"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="#ffffff"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">Latest</p>
              <h2 className="text-2xl font-bold text-white mt-1">Lab Notes</h2>
            </div>
            <Link to="/articles" className="text-sm text-zinc-500 hover:text-white transition-colors duration-300">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-8">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">Research</p>
            <h2 className="text-2xl font-bold text-white mt-1">Areas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-500 hover:-translate-y-[2px]"
              >
                <p className="text-sm font-bold text-white">{cat.name}</p>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{cat.description}</p>
                <p className="text-[10px] text-zinc-600 mt-3 uppercase tracking-wider">{cat.articleCount} notes</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
