import { Link } from 'react-router-dom'
import { getFeaturedArticle } from '../data/articles'

export default function Hero() {
  const article = getFeaturedArticle()
  if (!article) return null

  return (
    <section className="relative min-h-[90dvh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">
            Creative Lab / Est. 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
            虹光
            <br />
            创意实验室
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-[45ch]">
            生成艺术、交互装置与品牌系统的交叉探索。
            WebGL 驱动的数字体验工作室。
          </p>

          <div className="mt-10 flex items-center gap-6">
            <Link
              to={`/article/${article.slug}`}
              className="glass-strong px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white/15 transition-all duration-300 inline-flex items-center gap-2"
            >
              阅读最新实验
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
            <Link
              to="/articles"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-300"
            >
              浏览全部 Journal
            </Link>
          </div>
        </div>

        {/* Floating stat */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { n: '10', l: 'Lab Notes' },
            { n: '4', l: 'Research Areas' },
            { n: '2', l: 'Artists' },
          ].map((s) => (
            <div key={s.l} className="glass-subtle rounded-2xl p-5 text-center">
              <div className="text-2xl font-black text-white tabular-nums">{s.n}</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
