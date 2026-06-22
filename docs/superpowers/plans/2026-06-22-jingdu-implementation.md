# 静读 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium Chinese content site (静读) with 5 pages, 10 articles, pure CSS transitions, all components from scratch.

**Architecture:** Vite SPA with React Router v7. Data layer is static TypeScript modules. Pages compose shared components. Article body rendered via react-markdown.

**Tech Stack:** Vite 6, React 19, Tailwind CSS v4, React Router v7, react-markdown, TypeScript

## Global Constraints

- PRIMARY: #2563eb (blue-600), no other accent color
- FONTS: Inter (sans), Noto Serif SC (serif), JetBrains Mono (mono) — via Google Fonts CDN in index.html
- SPACING: 4px base unit (--spacing-1 through --spacing-20)
- RADIUS: 4px/6px/8px/12px + full for chips
- SHADOWS: sm/md/lg/xl only, no custom
- READING AREA: pure white bg, 1.75 line-height, max 720px width
- NO emoji, NO UI library, NO animation library (CSS transitions only)
- NO card-in-card, NO magic hex values, NO TODOs/FIXMEs/console.log
- ALL interactive elements: focus-visible ring + tooltip + 44px min touch target
- 3 columns on desktop article page: left 240px recs + 720px body + right 200px TOC

---

### Task 1: Scaffold Vite Project + Install Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

**Interfaces:**
- Produces: `npm run dev` starts on localhost:5173

- [ ] **Step 1: Create package.json**

```bash
cd D:/Showmaker/jingdu
npm init -y
npm install react react-dom react-router-dom react-markdown remark-gfm
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @tailwindcss/vite tailwindcss
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: Create tsconfig.json + tsconfig.app.json + tsconfig.node.json**

```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create index.html**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="静读 - 深度阅读，安静思考" />
    <title>静读</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create src/main.tsx + src/App.tsx + src/index.css stub**

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  )
}
```

```css
/* src/index.css */
@import 'tailwindcss';
```

- [ ] **Step 6: Verify dev server starts**

```bash
cd D:/Showmaker/jingdu && npm run dev
```

Expected: Vite dev server on localhost:5173

- [ ] **Step 7: Commit**

```bash
cd D:/Showmaker/jingdu && git init && git add -A && git commit -m "chore: scaffold Vite + React + Tailwind v4 project"
```

---

### Task 2: Design Tokens + Global CSS

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS custom properties for all design tokens, Tailwind-compatible

- [ ] **Step 1: Replace src/index.css with full design token system**

```css
@import 'tailwindcss';

@theme inline {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-info: #0284c7;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;
  --color-border: #e2e8f0;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-text-tertiary: #94a3b8;
  --color-text-link: #2563eb;
  --color-text-link-hover: #1d4ed8;
  --color-text-code: #b91c1c;
  --color-bg-code: #f1f5f9;
  --color-reading-bg: #ffffff;
  --color-reading-text: #1e293b;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Noto Serif SC', 'Source Han Serif SC', Georgia, 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}

/* Tailwind v4 layer extensions */
@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-text-primary);
    background: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  ::selection {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
}

@layer utilities {
  .font-reading {
    font-family: var(--font-serif);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css && git commit -m "feat: add complete design token system"
```

---

### Task 3: Data Layer — Articles, Categories, Authors

**Files:**
- Create: `src/data/authors.ts`
- Create: `src/data/categories.ts`
- Create: `src/data/articles.ts`

**Interfaces:**
- Produces: `Author { slug, name, avatar, bio }`
- Produces: `Category { slug, name, description, articleCount }`
- Produces: `Article { slug, title, excerpt, content, coverImage, category, tags, author, publishedAt, updatedAt?, readingTime, featured }`
- Produces: `getAllArticles()`, `getArticleBySlug(slug)`, `getArticlesByCategory(slug)`, `getFeaturedArticle()`

- [ ] **Step 1: Create src/data/authors.ts**

```ts
export interface Author {
  slug: string
  name: string
  avatar: string
  bio: string
}

export const authors: Author[] = [
  {
    slug: 'lin-yue',
    name: '林悦',
    avatar: 'https://picsum.photos/seed/author-linyue/64/64',
    bio: '科技写作者，前互联网从业者。关注AI、开源与数字社会。',
  },
  {
    slug: 'chen-mo',
    name: '陈默',
    avatar: 'https://picsum.photos/seed/author-chenmo/64/64',
    bio: '设计师兼写作者。专注品牌设计、交互体验与视觉文化。',
  },
]

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}
```

- [ ] **Step 2: Create src/data/categories.ts**

```ts
export interface Category {
  slug: string
  name: string
  description: string
  articleCount: number
}

export const categories: Category[] = [
  { slug: 'technology', name: '科技', description: '人工智能、开源生态、数字社会与技术哲学', articleCount: 3 },
  { slug: 'design', name: '设计', description: '品牌设计、交互体验、视觉文化与设计思维', articleCount: 3 },
  { slug: 'culture', name: '文化', description: '阅读笔记、文化观察与人文思考', articleCount: 2 },
  { slug: 'science', name: '科学', description: '基础科学、生命科学与认知探索', articleCount: 2 },
]
```

- [ ] **Step 3: Create src/data/articles.ts with 10 Chinese articles**

Each article has full markdown content. Content themes: technology, design, culture, science. Real-feeling Chinese prose. Include `featured: true` on first article.

```ts
import type { Author } from './authors'
import { getAuthor } from './authors'

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime: number
  featured: boolean
}

export const articles: Article[] = [
  {
    slug: 'ai-writing-2026',
    title: 'AI写作工具如何改变内容创作：2026年的观察与思考',
    excerpt: '当AI能生成流畅的文字，人类写作者的价值在哪里？本文从技术原理、创作伦理和实际体验三个维度展开讨论。',
    content: `## 引言：一个无法回避的问题

2026年，AI写作工具已经从"玩具"变成了"基础设施"。无论是小红书的种草文案，还是技术博客的深度解读，AI都能在几秒内产出可用的草稿。

但真正值得追问的是：**当机器能写出"看起来不错"的文字时，人类写作的价值锚点在哪里？**

## 技术层：从GPT到DeepSeek

过去两年，国产大模型在中文写作能力上完成了质的飞跃。以DeepSeek为代表的开源模型，在中文理解、文风模仿、专业知识组织等方面已经达到了相当高的水准。

一个关键的变化是：AI不再只是"续写"，而是能够理解**上下文意图**。你给它一个主题，它能判断你需要的是科普、评论还是教程，并自动调整语气和结构。

## 创作伦理：工具还是替代品

最激烈的争论集中在"AI是否在替代创作者"这个问题上。

我的观察是：**AI替代的不是写作者，而是"不愿意思考的写作者"**。一个没有观点的人用AI写文章，产出的必然是空洞的正确废话。而一个有观察、有判断、有情感体验的人用AI，AI放大了他的创作能力，而不是替代了它。

## 实际体验：效率与深度的平衡

过去半年，我尝试用AI辅助写作。几个发现：

1. **AI擅长"第一稿"** — 给一个主题和结构，它能快速产出骨架
2. **人类擅长"判断"** — 哪些观点站得住脚，哪些例子有共鸣，哪些表达更准确
3. **最好的协作模式** — 人出思想+结构，AI出初稿，人再做深度编辑

## 结语

技术的进步不会停下来等任何人。与其焦虑"AI会不会取代我"，不如问自己：**我有什么独特的视角、真实的体验、深刻的判断，是任何模型都无法复制的？**

那个答案，就是你作为创作者不可替代的价值。`,
    coverImage: 'https://picsum.photos/seed/ai-writing/1600/686',
    category: 'technology',
    tags: ['AI', '写作', '内容创作', 'DeepSeek'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-06-15',
    readingTime: 8,
    featured: true,
  },
  {
    slug: 'open-source-spirit',
    title: '开源精神的黄昏？大模型时代的知识共享困境',
    excerpt: '当AI公司的核心资产是权重而非代码，传统的开源理念是否还能延续？',
    content: `## 从代码开源到模型开源

开源运动在过去四十年塑造了整个软件行业。Linux、Git、Web标准——我们今天使用的几乎所有技术基础设施都受益于开源精神。

但大语言模型的出现改变了游戏规则。

## 什么是"开源模型"

当一个AI公司声称他们"开源"了一个模型，他们通常指的是公开了**权重文件**（weights），而不是训练数据、训练代码或微调流程。

这意味着社区可以**使用**这个模型，但很难**复现**或**理解**它。这和传统开源软件的"可审计、可修改、可分叉"有本质区别。

## 知识共享的新困境

更深层的问题在于：当模型本身成为一个黑箱，我们对"知识"的定义是否需要更新？

一个开源模型可以在几秒钟内总结一篇论文，但它无法告诉你它是如何得出这个总结的。传统的"引用-验证"知识链条被中断了。

## 乐观的一面

但也不是全无希望。开源社区正在推动几个重要方向：

- **训练数据透明化**：要求公开训练数据的来源和构成
- **可解释性工具**：开发让模型决策过程更透明的技术
- **联邦训练**：让社区参与模型训练而不仅仅是使用

## 我们需要什么样的未来

问题不在于开源"会不会死"，而在于我们想要什么样的知识生态。如果知识的创造和分发越来越依赖少数几个大公司，那无论技术有多先进，我们都在走向一个更封闭的世界。

保持警惕，保持参与，保持对透明和开放的要求——这是每一个技术从业者的责任。`,
    coverImage: 'https://picsum.photos/seed/open-source/1600/686',
    category: 'technology',
    tags: ['开源', 'AI', '知识共享', '开源伦理'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-06-08',
    readingTime: 10,
    featured: false,
  },
  {
    slug: 'design-system-thinking',
    title: '设计系统不是组件库：重新理解设计资产的价值',
    excerpt: '很多团队把设计系统等同于UI组件库。这是一个代价高昂的误解。',
    content: `## 一个常见的误解

"我们在建设计系统"——当你听到这句话时，十有八九对方在做的其实是一个**组件库**。

这两个东西的区别，就像"字典"和"语言"的区别。

## 组件库 vs. 设计系统

**组件库**是一组可复用的UI元素：按钮、输入框、卡片、弹窗。它们解决的是**一致性问题**。

**设计系统**是一套完整的视觉语言规范，包含：色彩体系、字体层级、间距节奏、圆角规则、阴影逻辑、动效时间曲线。它解决的是**意义问题**。

一个按钮为什么是蓝色的？一个卡片为什么用8px圆角？一个弹窗为什么从底部出现？——组件库不回答这些问题，设计系统必须回答。

## 从资产到原则

优秀的团队不是从组件开始建设计系统的。他们的顺序是：

1. **原则** — 我们相信什么样的设计价值观？
2. **Token** — 如何把这些价值观翻译成可量化的设计变量？
3. **组件** — 基于Token，构建具体的UI元素
4. **模式** — 组件如何组合来满足特定的用户场景？

大多数"失败的设计系统"都是直接从第3步开始的。

## 衡量真正的价值

一个设计系统做得好不好，不能只看"有多少个组件"。更关键的指标是：

- 设计师和工程师的沟通成本降低了吗？
- 做一个小改动能快速地在全局生效吗？
- 新成员能在多少时间内理解和使用系统？

## 结语

设计系统的终极目标不是让东西长得一样，而是让团队能把更多精力放在**解决真正的用户问题**上，而不是反复讨论"这个按钮用什么颜色"。`,
    coverImage: 'https://picsum.photos/seed/design-system/1600/686',
    category: 'design',
    tags: ['设计系统', 'UI', '设计思维', '团队协作'],
    author: getAuthor('chen-mo')!,
    publishedAt: '2026-06-10',
    readingTime: 9,
    featured: false,
  },
  {
    slug: 'typography-digital-reading',
    title: '数字阅读的排版艺术：为什么中文字体排印这么难',
    excerpt: '中文排版在屏幕上的挑战比拉丁字母大得多。从字体选择到行间距，每一个细节都影响阅读体验。',
    content: `## 被忽视的基础设施

排版（Typography）是数字阅读中最重要却最容易被忽视的基础设施。

好的排版让人感觉不到排版的存在——你的注意力完全在内容上。而坏的排版让你不断分心：字太小、行太密、段间距不对。

## 中文排版的独特挑战

中文排版有四重困境：

**1. 字符密度**
一个中文字符承载的信息量远大于一个拉丁字母。在相同字号下，中文文本的信息密度是英文的1.5倍以上。这意味着中文需要更大的行间距来维持可读性。

**2. 字体匮乏**
中文字体设计的工作量是拉丁字体的数十倍——一个完整的中文字体需要设计上万个字形。这导致优秀的中文正文字体极为稀缺。

**3. 混排难题**
现代中文内容大量混入英文单词、数字和符号。但中英文字体的x-height、基线、中宫往往不匹配，混排时产生视觉不协调。

**4. 网格对齐**
中文方块字的特性意味着正文需要严格的网格对齐。一个字号的错位，就会让整段文字失去节奏感。

## 好的中文阅读排版长什么样

以本文所在的"静读"站点为例，我们的选择是：

- **字体**：Noto Serif SC（思源宋体）作为正文字体，它是目前最优秀的中文开源衬线体
- **字号**：16px — 这个尺寸在桌面屏幕上正好舒适阅读
- **行高**：1.75 — 比英文推荐的1.5更高，适配中文字符密度
- **行长**：最大720px，约72个字符 — 这是中文阅读的黄金行长
- **背景**：纯白 — 没有任何纹理或渐变分散注意力

## 比规则更重要的是尊重内容

排版技术的尽头不是"好看"，而是让读者忘掉设计的存在，完全沉浸在内容中。这是排版的禅。`,
    coverImage: 'https://picsum.photos/seed/typography/1600/686',
    category: 'design',
    tags: ['排版', '中文字体', '数字阅读', '设计基础'],
    author: getAuthor('chen-mo')!,
    publishedAt: '2026-06-01',
    readingTime: 11,
    featured: false,
  },
  {
    slug: 'minimalist-thinking',
    title: '少即是多：信息过载时代的极简设计哲学',
    excerpt: '在每一个产品都在争夺你注意力的时代，"少做"反而成为最稀缺的设计能力。',
    content: `## 注意力的稀缺性

2026年，一个普通中国人每天接触的信息量相当于15世纪一个人一生接触的信息量。

在这样的环境中，产品的竞争不再是"功能多少"的竞争，而是**注意力分配**的竞争。

## 极简不是风格，是策略

很多人把极简主义（Minimalism）理解为一种审美风格：白色背景、大量留白、无衬线字体。

真正的极简是一种**设计策略**：在理解用户核心任务的基础上，**只提供完成任务所必需的元素**，然后以最优雅的方式呈现它们。

一个极简的界面和一个"看起来极简但什么都有的界面"之间，差了一个**决策勇气**。

## 删除的艺术

设计中最难的不是"加什么"，而是"删什么"。每次你想加一个新元素时，问三个问题：

1. 用户没有这个元素能不能完成任务？如果能，删除。
2. 这个元素能不能合并到已有元素中？如果能，合并。
3. 这个元素能不能推迟到用户真正需要时再出现？如果能，推迟。

你会发现，90%的"必须要有"的功能根本经不起这三个问题的考验。

## 静读的极简实践

在这个阅读站点中，我们把极简策略应用到了每一个细节：

- 文章页只有三样东西：推荐、正文、目录。没有弹窗、没有侧边推荐、没有社交分享浮层
- 正文区的设计目标是"让读者忘记这是网页"
- 所有交互响应时间不超过0.15秒 — 快到你不会注意到

## 极简的悖论

做好极简比做好复杂要难得多。因为你没有东西"藏拙"——每一像素、每一个过渡、每一个文字都必须经过深思熟虑。

这恰恰是设计的魅力所在。`,
    coverImage: 'https://picsum.photos/seed/minimalist/1600/686',
    category: 'design',
    tags: ['极简主义', '设计哲学', '用户体验', '注意力'],
    author: getAuthor('chen-mo')!,
    publishedAt: '2026-05-28',
    readingTime: 8,
    featured: false,
  },
  {
    slug: 'reading-in-fragmented-era',
    title: '碎片时代的深度阅读：为什么我们越来越读不进长文',
    excerpt: '不是你的自控力变差了，而是整个数字环境被设计成让你无法专注。',
    content: `## 一个普遍的焦虑

"我以前能一口气读完一本书，现在连一篇3000字的长文都读不完。"

这句话出现在无数社交平台的自我反思帖中。人们普遍将原因归结为"自制力下降"或"太忙了"。

但真相可能恰恰相反。

## 环境的设计意图

你手机上的每一个应用，背后都有成百上千的工程师和设计师在优化一个指标：**用户停留时长**。

短视频的无限下滑、社交媒体的可变奖励机制、推送通知的紧迫感措辞——这些都是精密设计的产物，目标是让你的注意力不断从一个内容跳到另一个内容。

你"读不进去长文"不是因为自控力差，而是因为你的注意力被数千名最聪明的人联手劫持了。

## 如何重建深度阅读

重建能力不需要"戒掉手机"（那对大多数人来说不现实）。几个可以立即开始的方法：

1. **设定阅读时段** — 每天固定30分钟，关闭所有通知
2. **使用专门的阅读工具** — 一个好的阅读产品应该帮你排除干扰，而不是增加干扰
3. **从感兴趣的主题开始** — 深度阅读不等于读"难"的东西
4. **读完后写三句话总结** — 这是检验你是否真正"读进去了"的最好方法

## 产品设计的责任

作为产品设计者，我经常反思一个问题：我们做的产品是在帮用户更好地生活，还是在剥夺他们的注意力？

一个负责任的阅读产品，应该：
- 让内容成为唯一的焦点
- 避免任何不必要的交互
- 不在阅读过程中插入任何打断元素
- 让"读完一篇文章"成为一次完整的体验

这是"静读"这个项目最核心的设计原则。`,
    coverImage: 'https://picsum.photos/seed/deep-reading/1600/686',
    category: 'culture',
    tags: ['深度阅读', '碎片化', '注意力', '数字生活'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-05-20',
    readingTime: 9,
    featured: false,
  },
  {
    slug: 'craftsmanship-in-code',
    title: '代码中的手艺人精神：为什么质量比速度更重要',
    excerpt: '在"move fast and break things"成为硅谷信条的年代，重新发现代码手艺人的价值。',
    content: `## 一个被遗忘的传统

在工业化之前，"手艺人"（craftsman）是一个受人尊敬的称谓。一个木匠、一个铁匠、一个陶艺师——他们的共同特点是：对自己作品的质量有近乎偏执的要求。

这种精神在软件行业曾经也是一股重要力量。早期黑客文化中的"优雅代码"（elegant code）概念，本质上就是手艺人精神的数字化表达。

## 速度崇拜的代价

过去十年，创业文化把"速度"推上了神坛。MVP（最小可行产品）、敏捷开发、持续部署——这些方法论在商业上是合理的，但它们也带来了一个副作用：**对质量的容忍度越来越低**。

"先上线再说，后面再改"——这句话杀死的代码质量比任何技术债务都要多。因为"后面"永远不会来。

## 手艺人的基本功

一个有手艺人精神的程序员在日常工作中：

- **写测试不是"额外的工作"**，而是对代码正确性的基本要求
- **变量命名不是"随便起一个"**，而是要让半年后读这段代码的人秒懂
- **重构不是"项目做完后"的事**，而是每天写的每一步都在做的事
- **代码审查不是"走个形式"**，而是知识分享和质量把关的核心流程

## 手艺人的快乐

最后想说一个更个人化的观点：做手艺人是有快乐的。

当你回看自己一年前写的代码，心想"写得不错"；当你重构一个模块，干净地删除了200行冗余代码；当你解决了一个困扰团队三天的bug——这些时刻带来的满足感，不比"快速上线了一个新功能"少。

技艺本身就是回报。`,
    coverImage: 'https://picsum.photos/seed/craftsmanship/1600/686',
    category: 'technology',
    tags: ['软件工程', '代码质量', '手艺精神', '职业发展'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-06-18',
    readingTime: 10,
    featured: false,
  },
  {
    slug: 'neuroscience-of-focus',
    title: '专注的科学：大脑如何在分心时代找回深度工作能力',
    excerpt: '神经科学研究揭示了一个令人警醒的事实：多任务处理不是一项技能，而是一种认知损伤。',
    content: `## 多任务的迷思

"我能一边写代码一边回消息一边听播客"——如果你觉得这是效率的体现，神经科学的研究结果可能会让你重新思考。

加州大学欧文分校的一项研究发现，当一个人的工作被干扰打断后，平均需要**23分15秒**才能重新回到原来的专注状态。

换句话说，你在工作时回一条微信，真正"损失"的不是那30秒，而是接下来的23分钟。

## 前额叶皮质的有限资源

从神经机制来看，深度专注依赖于前额叶皮质（prefrontal cortex）的活动。这个区域负责工作记忆、决策和注意力控制——但它是一个**有限资源系统**。

每次你在任务之间切换，前额叶皮质都需要：
1. 抑制前一个任务的神经模式
2. 加载新任务的上下文
3. 重新激活相关的记忆和技能

这些步骤需要时间，并且消耗能量。这就是为什么"多任务"一天之后你会感到精疲力竭——你的大脑一直在做昂贵的上下文切换。

## 重建深度工作的四个方法

1. **时间块法** — 把一天分成几个2小时的时间块，每个块只做一件事
2. **环境最小化** — 把手机放在另一个房间，关闭所有通知
3. **仪式感启动** — 用一个固定的动作（泡一杯茶、戴上耳机）告诉大脑"要进入专注了"
4. **不要追求完美** — 深度专注是可以通过训练增强的能力，从每天25分钟开始即可

## 写在最后

在一个设计成"让你分心"的数字世界里，选择专注本身就是一种抵抗。

静读这个项目，也是这种抵抗的一个小小实践。`,
    coverImage: 'https://picsum.photos/seed/neuroscience/1600/686',
    category: 'science',
    tags: ['神经科学', '专注力', '深度工作', '认知'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-06-05',
    readingTime: 7,
    featured: false,
  },
  {
    slug: 'color-theory-digital',
    title: '屏幕上的色彩：为什么数字设计中的颜色选择如此困难',
    excerpt: '从色域差异到可访问性，屏幕色彩设计是一门被严重低估的学问。',
    content: `## 颜色的幻觉

颜色可能是设计中最主观的元素，也是最容易被滥用的。一个设计师觉得"高级"的配色，在另一个文化背景的用户看来可能毫无吸引力。

但在这种主观性之下，有一整套关于屏幕色彩的科学原理。

## 屏幕色域：你看到的不是全部

人类眼睛能感知的颜色范围远大于任何屏幕能显示的范围。不同的屏幕技术（LCD、OLED、Mini-LED）有不同的色域覆盖能力。

一个在设计师的MacBook Pro上看起来鲜艳夺目的蓝色，在用户的普通办公显示器上可能显得灰暗无力。这不是"设计失败"，而是**媒介差异**。

## 可访问性不是可选项

全球约有3亿人有不同程度的色觉障碍（俗称"色盲"）。如果你的界面只用颜色来传达信息（比如红色表示错误、绿色表示成功），这些人完全无法区分。

WCAG AA标准要求：
- 正文文字与背景的对比度至少**4.5:1**
- 大号文字（18px+）与背景的对比度至少**3:1**

这不是一个"nice to have"的美学建议，而是**基本的设计伦理**。

## 品牌色的科学选择

一个好的品牌色需要满足：

1. 在白色和深色背景上都有足够的对比度
2. 在不同屏幕上有足够的视觉一致性
3. 与10种以上的辅助色兼容（用于信息层级标注）
4. 在色觉障碍视角下依然可辨识

这也是为什么很多大品牌的蓝色看起来"差不多"——蓝色是满足这些条件最稳定的色系之一。静读选择的#2563eb（blue-600）同理：清晰、稳定、跨设备。

## 少即是多

在颜色上，设计新手常犯的错误是"用太多颜色"。一个成熟的设计系统通常只需要：1个品牌色、1组中性灰、2-3个语义色（成功/警告/错误）。

多出来的颜色，不是表现力，是噪音。`,
    coverImage: 'https://picsum.photos/seed/color-theory/1600/686',
    category: 'design',
    tags: ['色彩理论', '可访问性', '设计系统', '屏幕技术'],
    author: getAuthor('chen-mo')!,
    publishedAt: '2026-06-12',
    readingTime: 8,
    featured: false,
  },
  {
    slug: 'sleep-and-creativity',
    title: '睡眠与创造力：为什么好点子总在洗澡时出现',
    excerpt: '科学研究证实：创造力的高峰期往往不在专注工作时，而在放松和休息时。',
    content: `## 洗澡时的灵感

每个人可能都有过这样的经历：一个困扰很久的问题，答案突然在洗澡、散步或快睡着时冒出来。

这不是巧合。神经科学对此有清晰的解释。

## 默认模式网络

大脑在"不做事"的时候并不是在休息。相反，它会启动一个叫做**默认模式网络**（Default Mode Network, DMN）的系统。

DMN在你做白日梦、回忆过去、想象未来时异常活跃。它的核心功能是**连接看似不相关的信息**——这正是创造力的神经基础。

当你在专注工作时，DMN被抑制。当你在洗澡或散步时，DMN被激活。这就是为什么"灵感总在不专注时出现"。

## 睡眠的创造性功能

睡眠不仅仅是"休息"。快速眼动睡眠（REM）阶段，大脑在进行一项关键工作：**记忆重组**。

白天积累的信息碎片在REM睡眠中被重新激活、重新组合。一些看似无关的概念在这个过程中产生了新的连接——你第二天早上醒来时"突然想到"的好点子，其实是夜里REM睡眠帮你想好的。

## 给创意工作者的建议

1. **不要把日程排满** — 留出"什么都不做"的时间
2. **遇到难题，先放一放** — 去散步、洗澡、做家务
3. **重视睡眠** — 牺牲睡眠换来的"多工作两小时"可能反而不如睡好之后的两小时
4. **床边放笔记本** — 刚醒来时的想法往往最有创造力

## 效率文化的陷阱

我们这个时代过度崇拜"忙碌"。但创造力的本质不是线性产出，而是**连接与重组**——这需要大脑处于放松、自由的状态。

有时候，什么事情都不做，恰恰是最有生产力的事情。`,
    coverImage: 'https://picsum.photos/seed/sleep-creativity/1600/686',
    category: 'science',
    tags: ['睡眠', '创造力', '神经科学', '工作效率'],
    author: getAuthor('lin-yue')!,
    publishedAt: '2026-06-19',
    readingTime: 8,
    featured: false,
  },
]

export function getAllArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category === categorySlug)
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured)
}

export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  return articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, count)
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/ && git commit -m "feat: add data layer with 10 Chinese articles, 2 authors, 4 categories"
```

---

### Task 4: Layout Components — Navbar + Footer

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Navbar: fixed top, scroll shadow at 100px, hamburger on mobile, search icon opens overlay
- Footer: copyright, social links, RSS, About link

- [ ] **Step 1: Create Navbar.tsx**

```tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
  onSearchOpen: () => void
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-150 hover:text-[var(--color-primary)] ${
      location.pathname === path ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
    }`

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-16 md:h-16 transition-shadow duration-200 ${
        scrolled ? 'shadow-sm bg-white/95 backdrop-blur-sm' : 'bg-white'
      }`}
      style={{ height: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">
          静读
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/articles" className={linkClass('/articles')}>文章</Link>
          <Link to="/category/technology" className={linkClass('/category/technology')}>分类</Link>
          <Link to="/about" className={linkClass('/about')}>关于</Link>
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center"
            title="搜索文章"
            aria-label="搜索文章"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>

        {/* Mobile: search + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={onSearchOpen} className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center" title="搜索文章" aria-label="搜索文章">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 w-11 h-11 flex items-center justify-center"
            title="菜单"
            aria-label="菜单"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18 18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[var(--color-border)] shadow-sm">
          <div className="px-6 py-4 space-y-3">
            <Link to="/articles" className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2">文章</Link>
            <Link to="/category/technology" className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2">分类</Link>
            <Link to="/about" className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2">关于</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Create Footer.tsx**

```tsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-black text-[var(--color-text-primary)]">静读</Link>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">深度阅读，安静思考</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">导航</h4>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <Link to="/articles" className="block hover:text-[var(--color-text-link)] transition-colors duration-150">全部文章</Link>
              <Link to="/about" className="block hover:text-[var(--color-text-link)] transition-colors duration-150">关于我们</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">订阅</h4>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <a href="#" className="flex items-center gap-2 hover:text-[var(--color-text-link)] transition-colors duration-150">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20A2.18 2.18 0 0 1 4 17.82a2.18 2.18 0 0 1 2.18-2.18ZM4 4.44A15.56 15.56 0 0 1 19.56 20h-3.83A11.73 11.73 0 0 0 4 8.27V4.44Z"/></svg>
                RSS 订阅
              </a>
              <a href="mailto:hello@jingdu.example.com" className="flex items-center gap-2 hover:text-[var(--color-text-link)] transition-colors duration-150">hello@jingdu.example.com</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-tertiary)]">
          &copy; 2026 静读 · 深度阅读，安静思考
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx && git commit -m "feat: add Navbar and Footer layout components"
```

---

### Task 5: Shared Components — ArticleCard, CategoryChip, Pagination

**Files:**
- Create: `src/components/ArticleCard.tsx`
- Create: `src/components/CategoryChip.tsx`
- Create: `src/components/Pagination.tsx`

- [ ] **Step 1: Create ArticleCard.tsx** — 16:9 cover, category chip, title (2-line clamp), excerpt (2-line clamp), date + reading time, hover translateY(-2px)

- [ ] **Step 2: Create CategoryChip.tsx** — pill tag, links to /category/:slug

- [ ] **Step 3: Create Pagination.tsx** — prev/next + page numbers array

- [ ] **Step 4: Commit**

---

### Task 6: HeroArticle + SearchOverlay + ReadingProgress + BackToTop

**Files:**
- Create: `src/components/HeroArticle.tsx`
- Create: `src/components/SearchOverlay.tsx`
- Create: `src/components/ReadingProgress.tsx`
- Create: `src/components/BackToTop.tsx`

- [ ] **Steps: Create each component, commit**

---

### Task 7: Pages — Home, ArticlePage, CategoryPage, About

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/ArticlePage.tsx`
- Create: `src/pages/CategoryPage.tsx`
- Create: `src/pages/About.tsx`

- [ ] **Steps: Implement each page per spec Section 4, commit**

---

### Task 8: Router + App.tsx + QA Pass + Build Verify

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Wire all routes, Step 2: Full QA checklist, Step 3: npm run build, Step 4: Final commit**
