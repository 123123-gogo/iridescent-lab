import { authors } from '../data/authors'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.25em] mb-6">Studio</p>
      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
        IRIDESCENT
        <br />
        虹光创意实验室
      </h1>
      <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
        一个探索生成艺术、交互装置与品牌系统交叉领域的创意工作室。
        我们相信代码不仅是工具，更是表达的媒介。WebGL 驱动的视觉实验是我们探索未知的方式。
      </p>

      <section className="mt-24">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] mb-8">Artists</p>
        <div className="space-y-10">
          {authors.map((author) => (
            <div key={author.slug} className="flex gap-5 items-start">
              <img src={author.avatar} alt={author.name} width="64" height="64" className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <h3 className="text-xl font-bold text-white">{author.name}</h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{author.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 glass rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Collaborate</h2>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          我们对跨学科合作持开放态度。如果你有有趣的项目想法，欢迎联系。
        </p>
        <div className="mt-4 space-y-1 text-sm text-zinc-500">
          <p>hello@iridescent.studio</p>
          <p>RSS 订阅更新</p>
        </div>
      </section>
    </div>
  )
}
