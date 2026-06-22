# 静读 — Premium Chinese Content Site Design Spec

**Date:** 2026-06-22
**Status:** Approved
**Stack:** Vite 6 + React 19 + Tailwind CSS v4 + React Router v7 + react-markdown

## Core Identity

- **Site name:** 静读 (Quiet Read)
- **Tagline:** 深度阅读，安静思考
- **Audience:** Chinese readers seeking quality long-form content, ad-free, minimal, focused
- **Content:** Technology / Design / Culture / Science — 10 articles, 4 categories, 2 authors

## Architecture

```
jingdu/
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css              ← Tailwind + design tokens
│   ├── data/
│   │   ├── articles.ts         ← 10 articles (Markdown content)
│   │   ├── categories.ts       ← 4 categories
│   │   └── authors.ts          ← 2 authors
│   ├── components/
│   │   ├── Navbar.tsx          ← Fixed nav, scroll shadow, hamburger mobile
│   │   ├── Footer.tsx
│   │   ├── ArticleCard.tsx     ← Card grid item
│   │   ├── HeroArticle.tsx     ← Featured hero (21:9 cover)
│   │   ├── SearchOverlay.tsx   ← Fullscreen search
│   │   ├── ReadingProgress.tsx ← 2px progress bar
│   │   ├── BackToTop.tsx       ← Scroll > 500px FAB
│   │   ├── TableOfContents.tsx ← TOC from headings
│   │   ├── CategoryChip.tsx
│   │   └── Pagination.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── ArticlePage.tsx
│       ├── CategoryPage.tsx
│       └── About.tsx
```

## Design Tokens (from spec Section 3)

- **Brand:** blue-600 (#2563eb) — calm, professional, not aggressive
- **Fonts:** Inter (sans) + Noto Serif SC (serif, for reading) + JetBrains Mono (code)
- **Reading area:** pure white bg, 16px body, 1.75 line-height, max 720px width
- **Spacing:** 4px base unit, 8-step scale
- **Radius:** 4/6/8/12px + full for chips
- **Shadows:** sm/md/lg/xl only

## Pages

1. **Home (/)** — Navbar + Hero (1 featured 21:9) + Grid (3-col desktop) + Categories + Footer
2. **Articles (/articles)** — Navbar + Category header + Article grid + Pagination
3. **Article (/:slug)** — 3-col desktop (240px left recs + 720px body + 200px TOC), mobile single col
4. **Category (/:slug)** — Same as articles but filtered
5. **About (/about)** — Mission + team + contact
6. **Search overlay** — Fullscreen modal, real-time filtering

## Responsive Breakpoints

- Phone: < 640px — single column, hamburger nav
- Tablet: 640-1023px — 2-col grid, body+TOC
- Desktop: 1024px+ — 3-col grid, 3-col article, full nav
- Wide: 1536px+ — max-w containment

## QA Checklist (from spec Section 8)

- Zero emoji in UI
- Zero card-in-card
- Reading area pure white, no gradients/textures
- All colors from tokens, no magic hex values
- Focus-visible on all interactive elements
- Touch targets >= 44x44px
- 3 clicks to any page from any page
- No animation libraries (CSS transitions only)
- All images have width/height or aspect-ratio (no CLS)
- No TODOs, FIXMEs, !important, console.log
