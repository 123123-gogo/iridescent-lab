export interface Author {
  slug: string
  name: string
  avatar: string
  bio: string
}

export const authors: Author[] = [
  { slug: 'mira', name: 'Mira', avatar: 'https://picsum.photos/seed/mira-avatar/64/64', bio: '创意技术专家，专注于生成艺术与交互装置。' },
  { slug: 'kai', name: 'Kai', avatar: 'https://picsum.photos/seed/kai-avatar/64/64', bio: '视觉设计师，探索品牌系统与数字媒介的边界。' },
]

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}
