import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug, getRelatedArticles } from '../data/articles'
import { categories } from '../data/categories'
import ReadingProgress from '../components/ReadingProgress'
import BackToTop from '../components/BackToTop'
import TableOfContents from '../components/TableOfContents'
import ArticleCard from '../components/ArticleCard'
import CategoryChip from '../components/CategoryChip'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticleBySlug(slug || '')

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          文章未找到
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block text-[var(--color-text-link)] hover:underline"
        >
          返回首页
        </Link>
      </div>
    )
  }

  const relatedArticles = getRelatedArticles(article, 3)
  const categoryName =
    article.category === 'technology'
      ? '科技'
      : article.category === 'design'
      ? '设计'
      : article.category === 'culture'
      ? '文化'
      : '科学'

  function renderMarkdown(content: string) {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent = ''
    let codeLang = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-[var(--color-bg-tertiary)] p-4 rounded-md overflow-x-auto font-mono text-sm my-4">
              <code>{codeContent.trim()}</code>
            </pre>
          )
          codeContent = ''
          inCodeBlock = false
        } else {
          inCodeBlock = true
          codeLang = line.slice(3).trim()
        }
        continue
      }

      if (inCodeBlock) {
        codeContent += line + '\n'
        continue
      }

      if (line.startsWith('## ')) {
        const text = line.slice(3)
        const id = text.replace(/[^\w一-鿿\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
        elements.push(
          <h2 key={i} id={id} className="text-2xl font-bold text-[var(--color-text-primary)] mt-10 mb-3 leading-tight">
            {text}
          </h2>
        )
        continue
      }

      if (line.startsWith('### ')) {
        const text = line.slice(4)
        const id = text.replace(/[^\w一-鿿\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
        elements.push(
          <h3 key={i} id={id} className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-2">
            {text}
          </h3>
        )
        continue
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-[var(--color-primary)] pl-4 italic text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] py-3 pr-4 rounded-r-md my-4">
            {renderInline(line.slice(2))}
          </blockquote>
        )
        continue
      }

      if (line.startsWith('1. ') || line.match(/^\d+\. /)) {
        const text = line.replace(/^\d+\.\s*/, '')
        elements.push(
          <li key={i} className="ml-6 list-decimal my-1 text-base text-[var(--color-reading-text)] font-reading leading-relaxed">
            {renderInline(text)}
          </li>
        )
        continue
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        const text = line.slice(2)
        const nextIsList = i + 1 < lines.length && (lines[i + 1].startsWith('- ') || lines[i + 1].startsWith('* '))
        elements.push(
          <li key={i} className="ml-6 list-disc my-1 text-base text-[var(--color-reading-text)] font-reading leading-relaxed">
            {renderInline(text)}
          </li>
        )
        if (!nextIsList) {
          elements.push(<div key={`spacer-${i}`} className="h-3" />)
        }
        continue
      }

      if (line.trim() === '') {
        elements.push(<div key={i} className="h-3" />)
        continue
      }

      elements.push(
        <p key={i} className="text-base text-[var(--color-reading-text)] font-reading leading-relaxed">
          {renderInline(line)}
        </p>
      )
    }

    return elements
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-[var(--color-bg-code)] text-[var(--color-text-code)] text-sm px-1.5 py-0.5 rounded-sm font-mono">
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  const allArticles = getRelatedArticles(article, 100)
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug)
  const prevArticle = allArticles.filter((_, i) => i === currentIndex + 1)[0]
  const nextArticle = allArticles.filter((_, i) => i === currentIndex - 1)[0]

  return (
    <div className="bg-[var(--color-reading-bg)]">
      <ReadingProgress />
      <BackToTop />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left sidebar - Related articles (desktop) */}
          <aside className="hidden xl:block w-[240px] shrink-0">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-4">
                精选推荐
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    to={`/article/${ra.slug}`}
                    className="block group"
                  >
                    <div className="aspect-[16/9] rounded-lg overflow-hidden mb-2">
                      <img
                        src={ra.coverImage}
                        alt={ra.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <h5 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-2 leading-snug group-hover:text-[var(--color-text-link)] transition-colors duration-150">
                      {ra.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Center - Article body */}
          <article className="flex-1 min-w-0 max-w-[720px] mx-auto">
            {/* Header */}
            <header className="mb-8">
              <CategoryChip slug={article.category} name={categoryName} />
              <h1 className="mt-3 text-3xl md:text-4xl font-black text-[var(--color-text-primary)] leading-tight tracking-tight">
                {article.title}
              </h1>
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
                <time dateTime={article.publishedAt} className="text-sm text-[var(--color-text-tertiary)]">
                  {article.publishedAt}
                </time>
                <span className="text-sm text-[var(--color-text-tertiary)]">·</span>
                <span className="text-sm text-[var(--color-text-tertiary)]">
                  {article.readingTime} 分钟阅读
                </span>
              </div>
            </header>

            {/* Cover image */}
            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full max-w-[720px] h-auto rounded-lg mb-8"
                loading="lazy"
              />
            )}

            {/* TOC (mobile/tablet) */}
            <TableOfContents content={article.content} />

            {/* Body */}
            <div className="prose-custom">
              {renderMarkdown(article.content)}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                  }}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link)] transition-colors duration-150"
                  title="复制链接"
                >
                  复制链接
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link)] transition-colors duration-150"
                  title="分享到 Twitter"
                >
                  Twitter
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-link)] transition-colors duration-150"
                  title="通过邮件分享"
                >
                  邮件
                </a>
              </div>

              {/* Prev/Next */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                {prevArticle ? (
                  <Link
                    to={`/article/${prevArticle.slug}`}
                    className="group p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-150"
                  >
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      上一篇
                    </span>
                    <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-text-link)] transition-colors duration-150">
                      {prevArticle.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nextArticle ? (
                  <Link
                    to={`/article/${nextArticle.slug}`}
                    className="group p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-150 text-right"
                  >
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      下一篇
                    </span>
                    <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-text-link)] transition-colors duration-150">
                      {nextArticle.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Related */}
              {relatedArticles.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                    相关推荐
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((ra) => (
                      <ArticleCard key={ra.slug} article={ra} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Right sidebar - TOC (desktop) */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <TableOfContents content={article.content} />
          </aside>
        </div>
      </div>
    </div>
  )
}
