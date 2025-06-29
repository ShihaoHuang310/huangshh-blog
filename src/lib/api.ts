import { supabase, supabaseAdmin } from './supabase'
import type { BlogPost, Category, BlogFilters, PaginationInfo } from '@/types/blog'

// Posts API
export async function getPosts(filters: BlogFilters = {}) {
  let query = supabase
    .from('posts')
    .select(`
      *,
      authors (
        id,
        name,
        email,
        avatar,
        bio,
        website,
        social
      )
    `)
    .eq('published_at', true)

  // Apply filters
  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags)
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
  }

  // Apply sorting
  const sortBy = filters.sortBy || 'published_at'
  const sortOrder = filters.sortOrder || 'desc'
  query = query.order(sortBy, { ascending: sortOrder === 'asc' })

  // Apply pagination
  const limit = filters.limit || 10
  const offset = filters.offset || 0
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`)
  }

  return {
    posts: data as BlogPost[],
    totalCount: count || 0,
  }
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors (
        id,
        name,
        email,
        avatar,
        bio,
        website,
        social
      )
    `)
    .eq('slug', slug)
    .eq('published_at', true)
    .single()

  if (error) {
    throw new Error(`Failed to fetch post: ${error.message}`)
  }

  return data as BlogPost
}

export async function getFeaturedPosts(limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors (
        id,
        name,
        email,
        avatar,
        bio,
        website,
        social
      )
    `)
    .eq('featured', true)
    .eq('published_at', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch featured posts: ${error.message}`)
  }

  return data as BlogPost[]
}

export async function getPopularPosts(limit = 5) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors (
        id,
        name,
        email,
        avatar,
        bio,
        website,
        social
      )
    `)
    .eq('published_at', true)
    .order('view_count', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch popular posts: ${error.message}`)
  }

  return data as BlogPost[]
}

export async function incrementViewCount(postId: string) {
  const { error } = await supabase.rpc('increment_view_count', {
    post_id: postId
  })

  if (error) {
    console.error('Failed to increment view count:', error.message)
  }
}

// Categories API
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`)
  }

  return data as Category[]
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    throw new Error(`Failed to fetch category: ${error.message}`)
  }

  return data as Category
}

// Newsletter API
export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email, active: true }])
    .select()
    .single()

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('该邮箱已经订阅过了')
    }
    throw new Error(`订阅失败: ${error.message}`)
  }

  return data
}

export async function unsubscribeFromNewsletter(email: string) {
  const { error } = await supabase
    .from('subscribers')
    .update({ active: false })
    .eq('email', email)

  if (error) {
    throw new Error(`取消订阅失败: ${error.message}`)
  }
}

// Search API
export async function searchPosts(query: string, limit = 10) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      authors (
        id,
        name,
        email,
        avatar,
        bio,
        website,
        social
      )
    `)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('published_at', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`搜索失败: ${error.message}`)
  }

  return data as BlogPost[]
}

// Stats API
export async function getBlogStats() {
  const [postsResult, viewsResult, subscribersResult] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact' }).eq('published_at', true),
    supabase.from('posts').select('view_count').eq('published_at', true),
    supabase.from('subscribers').select('id', { count: 'exact' }).eq('active', true),
  ])

  const totalPosts = postsResult.count || 0
  const totalViews = viewsResult.data?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0
  const totalSubscribers = subscribersResult.count || 0

  return {
    totalPosts,
    totalViews,
    totalSubscribers,
  }
}
