import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-lg font-black text-white tracking-tight">IRIDESCENT</Link>
            <p className="mt-2 text-sm text-zinc-500">虹光创意实验室</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Navigate</h4>
            <div className="space-y-2 text-sm text-zinc-500">
              <Link to="/articles" className="block hover:text-white transition-colors duration-300">Journal</Link>
              <Link to="/about" className="block hover:text-white transition-colors duration-300">Studio</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Connect</h4>
            <div className="space-y-2 text-sm text-zinc-500">
              <a href="#" className="block hover:text-white transition-colors duration-300">RSS</a>
              <a href="mailto:hello@iridescent.studio" className="block hover:text-white transition-colors duration-300">hello@iridescent.studio</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-zinc-600">
          &copy; 2026 IRIDESCENT Lab
        </div>
      </div>
    </footer>
  )
}
