import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link
              to="/"
              className="text-xl font-black text-[var(--color-text-primary)]"
            >
              静读
            </Link>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              深度阅读，安静思考
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
              导航
            </h4>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <Link
                to="/articles"
                className="block hover:text-[var(--color-text-link)] transition-colors duration-150"
              >
                全部文章
              </Link>
              <Link
                to="/about"
                className="block hover:text-[var(--color-text-link)] transition-colors duration-150"
              >
                关于我们
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
              订阅
            </h4>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-text-link)] transition-colors duration-150"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20A2.18 2.18 0 0 1 4 17.82a2.18 2.18 0 0 1 2.18-2.18ZM4 4.44A15.56 15.56 0 0 1 19.56 20h-3.83A11.73 11.73 0 0 0 4 8.27V4.44Z" />
                </svg>
                RSS 订阅
              </a>
              <a
                href="mailto:hello@jingdu.example.com"
                className="flex items-center gap-2 hover:text-[var(--color-text-link)] transition-colors duration-150"
              >
                hello@jingdu.example.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-tertiary)]">
          &copy; 2026 静读
        </div>
      </div>
    </footer>
  )
}
