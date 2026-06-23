import { useState, useEffect, useMemo } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  const headings = useMemo(() => {
    const result: TocItem[] = []
    const regex = /^(#{2,3})\s+(.+)$/gm
    let match: RegExpExecArray | null
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .replace(/[^\w一-鿿\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase()
      result.push({ id, text, level })
    }
    return result
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      <details className="lg:hidden mb-8 rounded-xl border border-white/10 glass">
        <summary className="px-4 py-3 text-sm font-semibold text-zinc-300 cursor-pointer select-none">
          目录
        </summary>
        <nav className="px-4 pb-4">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-sm py-1 transition-colors duration-200 ${
                h.level === 3 ? 'pl-4' : ''
              } ${
                activeId === h.id
                  ? 'text-white font-medium'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </details>

      <nav className="hidden lg:block sticky top-24">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          目录
        </h4>
        <div className="border-l-2 border-white/10">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-sm py-1.5 transition-all duration-200 ${
                h.level === 3 ? 'pl-6' : 'pl-4'
              } ${
                activeId === h.id
                  ? 'text-white font-medium border-l-2 border-white -ml-[2px]'
                  : 'text-zinc-500 hover:text-zinc-300 border-l-2 border-transparent -ml-[2px]'
              }`}
            >
              {h.text}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
