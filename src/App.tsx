import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import Iridescence from './components/Iridescence'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import CategoryPage from './pages/CategoryPage'
import About from './pages/About'

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col relative bg-[#09090b]">
      <div className="fixed inset-0 z-0" style={{ width: '100vw', height: '100vh' }}>
        <Iridescence speed={2.2} amplitude={0.55} mouseReact />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
