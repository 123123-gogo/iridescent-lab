export interface Category {
  slug: string
  name: string
  description: string
  articleCount: number
}

export const categories: Category[] = [
  {
    slug: 'technology',
    name: '科技',
    description: '人工智能、开源生态、数字社会与技术哲学',
    articleCount: 3,
  },
  {
    slug: 'design',
    name: '设计',
    description: '品牌设计、交互体验、视觉文化与设计思维',
    articleCount: 3,
  },
  {
    slug: 'culture',
    name: '文化',
    description: '阅读笔记、文化观察与人文思考',
    articleCount: 2,
  },
  {
    slug: 'science',
    name: '科学',
    description: '基础科学、生命科学与认知探索',
    articleCount: 2,
  },
]
