export interface Category {
  slug: string
  name: string
  description: string
  articleCount: number
}

export const categories: Category[] = [
  { slug: 'experiments', name: '实验', description: '视觉实验、交互原型与技术探索', articleCount: 3 },
  { slug: 'craft', name: '工艺', description: '品牌设计、排版艺术与设计系统', articleCount: 3 },
  { slug: 'narrative', name: '叙事', description: '数字文化、创意写作与人类观察', articleCount: 2 },
  { slug: 'theory', name: '理论', description: '认知科学、色彩理论与感知研究', articleCount: 2 },
]
