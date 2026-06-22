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
