export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readingTime: number
  viewCount: number
  featured: boolean
  author: Author
  coverImage?: string
}

export interface Author {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  website?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount: number
}

export interface Newsletter {
  id: string
  email: string
  subscribedAt: string
  active: boolean
}

export interface SearchResult {
  posts: BlogPost[]
  totalCount: number
  query: string
}

export interface BlogStats {
  totalPosts: number
  totalViews: number
  totalSubscribers: number
  popularPosts: BlogPost[]
  recentPosts: BlogPost[]
}

export type SortOrder = 'asc' | 'desc'
export type SortBy = 'publishedAt' | 'title' | 'viewCount' | 'readingTime'

export interface BlogFilters {
  category?: string
  tags?: string[]
  search?: string
  sortBy?: SortBy
  sortOrder?: SortOrder
  limit?: number
  offset?: number
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface BlogResponse<T> {
  data: T
  pagination?: PaginationInfo
  success: boolean
  message?: string
}
