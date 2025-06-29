import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// 类型定义
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  category: string
  tags: string[]
  status: string
  featured: boolean
  reading_time: number
  view_count: number
  like_count: number
  comment_count: number
  published_at: string
  created_at: string
  updated_at: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  icon: string | null
  article_count: number
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  article_count: number
  created_at: string
  updated_at: string
}

// API 函数
export class ArticleAPI {
  /**
   * 获取精选文章
   */
  static async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('获取精选文章失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取最新文章
   */
  static async getLatestArticles(limit: number = 6): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('获取最新文章失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取所有文章（支持分页）
   */
  static async getAllArticles(
    page: number = 1,
    pageSize: number = 6
  ): Promise<{
    articles: Article[]
    total: number
    totalPages: number
    currentPage: number
  }> {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    // 获取总数
    const { count } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    // 获取分页数据
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('获取文章失败:', error)
      return {
        articles: [],
        total: 0,
        totalPages: 0,
        currentPage: page
      }
    }

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    return {
      articles: data || [],
      total,
      totalPages,
      currentPage: page
    }
  }

  /**
   * 根据 slug 获取文章
   */
  static async getArticleBySlug(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      console.error('获取文章失败:', error)
      return null
    }

    // 增加浏览量
    if (data) {
      await this.incrementViewCount(data.id)
    }

    return data
  }

  /**
   * 增加文章浏览量
   */
  static async incrementViewCount(articleId: string): Promise<void> {
    try {
      await supabase.rpc('increment_view_count', {
        article_id: articleId
      })
    } catch (error) {
      console.error('增加浏览量失败:', error)
    }
  }

  /**
   * 获取分类列表
   */
  static async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('article_count', { ascending: false })

    if (error) {
      console.error('获取分类失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取标签列表
   */
  static async getTags(): Promise<Tag[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('article_count', { ascending: false })

    if (error) {
      console.error('获取标签失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 根据分类获取文章
   */
  static async getArticlesByCategory(
    categorySlug: string,
    limit: number = 10
  ): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('category', categorySlug)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('获取分类文章失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 搜索文章
   */
  static async searchArticles(
    query: string,
    limit: number = 10
  ): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .or(
        `title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`
      )
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('搜索文章失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取文章统计信息
   */
  static async getArticleStats() {
    try {
      const [
        { count: totalArticles },
        { count: featuredArticles },
        { data: categories },
        { data: tags }
      ] = await Promise.all([
        supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published'),
        supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('featured', true),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('tags').select('*', { count: 'exact', head: true })
      ])

      return {
        totalArticles: totalArticles || 0,
        featuredArticles: featuredArticles || 0,
        totalCategories: categories || 0,
        totalTags: tags || 0
      }
    } catch (error) {
      console.error('获取统计信息失败:', error)
      return {
        totalArticles: 0,
        featuredArticles: 0,
        totalCategories: 0,
        totalTags: 0
      }
    }
  }
}
