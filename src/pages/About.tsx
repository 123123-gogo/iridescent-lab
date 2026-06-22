import { authors } from '../data/authors'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black text-[var(--color-text-primary)]">
        关于静读
      </h1>

      <section className="mt-10">
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          静读是一个专注于深度阅读的内容平台。我们相信，在这个信息过载的时代，安静地读完一篇好文章是一种稀缺而珍贵的体验。
        </p>
        <p className="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
          我们的内容涵盖科技、设计、文化和科学四个领域，由一群热爱思考和写作的作者共同维护。每一篇文章都经过精心打磨，力求为读者提供有深度、有温度的阅读体验。
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          我们的坚持
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '深度长文',
              desc: '每篇文章平均阅读时间8分钟以上，拒绝碎片化快餐内容。',
            },
            {
              title: '安静阅读',
              desc: '纯净的阅读体验，无广告、无弹窗、无社交干扰。',
            },
            {
              title: '精选内容',
              desc: '从海量信息中筛选真正有价值的主题和观点。',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-[var(--color-border)]"
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          作者团队
        </h2>
        <div className="mt-6 space-y-8">
          {authors.map((author) => (
            <div key={author.slug} className="flex gap-4 items-start">
              <img
                src={author.avatar}
                alt={author.name}
                width="64"
                height="64"
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {author.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 p-8 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          联系与订阅
        </h2>
        <div className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>
            邮箱：{' '}
            <a
              href="mailto:hello@jingdu.example.com"
              className="text-[var(--color-text-link)] hover:underline"
            >
              hello@jingdu.example.com
            </a>
          </p>
          <p>RSS 订阅：支持通过 RSS 阅读器订阅全部内容更新</p>
          <p>更新频率：每周 2-3 篇深度内容</p>
        </div>
      </section>
    </div>
  )
}
