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

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  demo_url?: string
  github_url?: string
  featured: boolean
  sort_order: number
  status: 'active' | 'archived' | 'draft'
  created_at: string
  updated_at: string
}

export interface CodeExample {
  id: string
  title: string
  description: string
  language: string
  code: string
  sort_order: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  name: string
  title: string
  bio?: string
  location?: string
  email?: string
  avatar_url?: string
  github_url?: string
  twitter_url?: string
  linkedin_url?: string
  website_url?: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Timeline {
  id: string
  year: string
  title: string
  company?: string
  description?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Stat {
  id: string
  label: string
  value: string
  icon?: string
  command?: string
  sort_order: number
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

/**
 * 项目 API
 */
export class ProjectAPI {
  /**
   * 获取所有项目
   */
  static async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取项目失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取精选项目
   */
  static async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取精选项目失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 根据 ID 获取项目
   */
  static async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error) {
      console.error('获取项目失败:', error)
      return null
    }

    return data
  }
}

/**
 * 代码示例 API
 */
export class CodeExampleAPI {
  /**
   * 获取所有代码示例
   */
  static async getAllCodeExamples(): Promise<CodeExample[]> {
    const { data, error } = await supabase
      .from('code_examples')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取代码示例失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取精选代码示例
   */
  static async getFeaturedCodeExamples(): Promise<CodeExample[]> {
    const { data, error } = await supabase
      .from('code_examples')
      .select('*')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取精选代码示例失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 根据语言获取代码示例
   */
  static async getCodeExamplesByLanguage(
    language: string
  ): Promise<CodeExample[]> {
    const { data, error } = await supabase
      .from('code_examples')
      .select('*')
      .eq('language', language)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('获取代码示例失败:', error)
      return []
    }

    return data || []
  }
}

/**
 * 个人信息 API
 */
export class ProfileAPI {
  /**
   * 获取个人信息
   */
  static async getProfile(): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('获取个人信息失败:', error)
      return null
    }

    return data
  }
}

/**
 * 技能 API
 */
export class SkillAPI {
  /**
   * 获取所有技能
   */
  static async getAllSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('level', { ascending: false })

    if (error) {
      console.error('获取技能失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 根据分类获取技能
   */
  static async getSkillsByCategory(category: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true })
      .order('level', { ascending: false })

    if (error) {
      console.error('获取技能失败:', error)
      return []
    }

    return data || []
  }

  /**
   * 获取技能分类
   */
  static async getSkillCategories(): Promise<string[]> {
    const { data, error } = await supabase.from('skills').select('category')

    if (error) {
      console.error('获取技能分类失败:', error)
      return []
    }

    const categories = [...new Set(data?.map((item) => item.category) || [])]
    return categories
  }
}

/**
 * 时间线 API
 */
export class TimelineAPI {
  /**
   * 获取所有时间线
   */
  static async getAllTimeline(): Promise<Timeline[]> {
    const { data, error } = await supabase
      .from('timeline')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('year', { ascending: false })

    if (error) {
      console.error('获取时间线失败:', error)
      return []
    }

    return data || []
  }
}

/**
 * 统计信息 API
 */
export class StatAPI {
  /**
   * 获取所有统计信息
   */
  static async getAllStats(): Promise<Stat[]> {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('获取统计信息失败:', error)
      return []
    }

    return data || []
  }
}
