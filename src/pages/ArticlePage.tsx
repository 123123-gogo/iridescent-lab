import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug, getRelatedArticles } from '../data/articles'
import { categories } from '../data/categories'
import ReadingProgress from '../components/ReadingProgress'
import BackToTop from '../components/BackToTop'
import ArticleCard from '../components/ArticleCard'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticleBySlug(slug || '')

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Not Found</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-zinc-400 hover:text-white transition-colors duration-300">Back home</Link>
      </div>
    )
  }

  const relatedArticles = getRelatedArticles(article, 3)
  const cat = categories.find((c) => c.slug === article.category)

  function decodeEntities(text: string): string {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }

  function renderInline(text: string): React.ReactNode {
    const decoded = decodeEntities(text)
    // Parse links [text](url), images ![alt](url), bold **text**, inline code `text`
    const pattern = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g
    const parts: React.ReactNode[] = []
    let last = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(decoded)) !== null) {
      if (match.index > last) parts.push(decoded.slice(last, match.index))
      if (match[1]) {
        // Image ![alt](url)
        parts.push(
          <img
            key={match.index}
            src={match[3]}
            alt={match[2]}
            loading="lazy"
            className="max-w-full h-auto rounded-lg my-6"
          />
        )
      } else if (match[4]) {
        // Link [text](url)
        const isExternal = match[5].startsWith('http')
        parts.push(
          <a
            key={match.index}
            href={match[5]}
            className="text-slate-700 underline decoration-slate-300 hover:decoration-slate-700 transition-colors duration-200"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {match[4]}
          </a>
        )
      } else if (match[6]) {
        // Bold **text**
        parts.push(<strong key={match.index} className="font-bold text-slate-900">{match[6]}</strong>)
      } else if (match[7]) {
        // Inline code `text`
        parts.push(<code key={match.index} className="bg-slate-100 text-slate-600 text-sm px-1.5 py-0.5 rounded font-mono">{match[7]}</code>)
      }
      last = match.index + match[0].length
    }
    if (last < decoded.length) parts.push(decoded.slice(last))
    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
  }

  function renderMarkdown(content: string) {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent = ''
    let listItems: React.ReactNode[] = []
    let inList: 'ul' | 'ol' | null = null

    function flushList() {
      if (listItems.length > 0 && inList) {
        const Tag = inList === 'ol' ? 'ol' : 'ul'
        elements.push(
          <Tag key={`list-${elements.length}`} className={inList === 'ol' ? 'list-decimal pl-6 my-4 space-y-1' : 'list-disc pl-6 my-4 space-y-1'}>
            {listItems}
          </Tag>
        )
        listItems = []
        inList = null
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const indent = line.match(/^(\s*)/)?.[1].length || 0

      // Code block
      if (line.startsWith('```')) {
        flushList()
        if (inCodeBlock) {
          elements.push(<pre key={`code-${i}`} className="bg-slate-100 rounded-xl p-5 overflow-x-auto font-mono text-sm text-slate-700 my-6"><code>{codeContent.trim()}</code></pre>)
          codeContent = ''
          inCodeBlock = false
        } else { inCodeBlock = true }
        continue
      }
      if (inCodeBlock) { codeContent += line + '\n'; continue }

      // H2
      if (line.startsWith('## ')) {
        flushList()
        const text = line.slice(3)
        const id = text.replace(/[^\w一-鿿\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
        elements.push(<h2 key={i} id={id} className="text-2xl font-bold text-slate-900 mt-12 mb-4 leading-tight">{renderInline(text)}</h2>)
        continue
      }
      // H3
      if (line.startsWith('### ')) {
        flushList()
        const text = line.slice(4)
        const id = text.replace(/[^\w一-鿿\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
        elements.push(<h3 key={i} id={id} className="text-xl font-semibold text-slate-800 mt-8 mb-3">{renderInline(text)}</h3>)
        continue
      }
      // Blockquote
      if (line.startsWith('> ')) {
        flushList()
        elements.push(<blockquote key={i} className="border-l-4 border-slate-200 pl-5 italic text-sm text-slate-500 py-3 my-5">{renderInline(line.slice(2))}</blockquote>)
        continue
      }
      // Ordered list
      if (line.match(/^\d+\. /) && indent === 0) {
        if (inList !== 'ol') { flushList(); inList = 'ol' }
        listItems.push(<li key={i} className="text-base text-slate-700 leading-relaxed">{renderInline(line.replace(/^\d+\.\s*/, ''))}</li>)
        continue
      }
      // Unordered list
      if ((line.startsWith('- ') || line.startsWith('* ')) && indent === 0) {
        if (inList !== 'ul') { flushList(); inList = 'ul' }
        listItems.push(<li key={i} className="text-base text-slate-700 leading-relaxed">{renderInline(line.slice(2))}</li>)
        continue
      }
      // Nested list (indented)
      if ((line.startsWith('  - ') || line.startsWith('  * ')) && inList) {
        listItems.push(<li key={i} className="text-base text-slate-700 leading-relaxed ml-4">{renderInline(line.trim().slice(2))}</li>)
        continue
      }

      flushList()
      // Empty line
      if (line.trim() === '') { elements.push(<div key={i} className="h-4" />); continue }
      // Paragraph
      elements.push(<p key={i} className="text-base text-slate-700 leading-relaxed">{renderInline(line)}</p>)
    }
    flushList()
    return elements
  }

  const allRelated = getRelatedArticles(article, 100)
  const idx = allRelated.findIndex((a) => a.slug === article.slug)
  const prev = allRelated[idx + 1]
  const next = allRelated[idx - 1]

  return (
    <div className="relative">
      <ReadingProgress />
      <BackToTop />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          <article className="flex-1 min-w-0 max-w-[720px] mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <header className="mb-10">
              {cat && <span className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">{cat.name}</span>}
              <h1 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">{article.title}</h1>
              <div className="mt-5 flex items-center gap-3">
                <img src={article.author.avatar} alt={article.author.name} width="32" height="32" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium text-slate-700">{article.author.name}</span>
                <span className="text-slate-300">/</span>
                <time dateTime={article.publishedAt} className="text-sm text-slate-400">{article.publishedAt}</time>
                <span className="text-slate-300">/</span>
                <span className="text-sm text-slate-400">{article.readingTime} min read</span>
              </div>
            </header>

            {article.coverImage && (
              <img src={article.coverImage} alt={article.title} className="w-full max-w-[720px] h-auto rounded-2xl mb-10" loading="lazy" />
            )}

            <div className="text-slate-700">{renderMarkdown(article.content)}</div>

            <footer className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">{tag}</span>)}
              </div>

              <div className="flex items-center gap-6 mb-10">
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="text-sm text-slate-400 hover:text-slate-700 transition-colors duration-300">Copy link</button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-slate-700 transition-colors duration-300">Twitter</a>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {prev ? <Link to={`/article/${prev.slug}`} className="border border-slate-200 rounded-xl p-4 hover:border-slate-400 transition-all duration-300"><span className="text-xs text-slate-400">Previous</span><p className="mt-1 text-sm font-medium text-slate-700 line-clamp-2">{prev.title}</p></Link> : <div />}
                {next ? <Link to={`/article/${next.slug}`} className="border border-slate-200 rounded-xl p-4 text-right hover:border-slate-400 transition-all duration-300"><span className="text-xs text-slate-400">Next</span><p className="mt-1 text-sm font-medium text-slate-700 line-clamp-2">{next.title}</p></Link> : <div />}
              </div>

              {relatedArticles.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Related</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((ra) => <ArticleCard key={ra.slug} article={ra} />)}
                  </div>
                </div>
              )}
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}
