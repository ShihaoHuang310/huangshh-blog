import { createClient } from '@supabase/supabase-js'
import matter from 'gray-matter'
import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'

// 延迟创建 Supabase 客户端
function getSupabaseClient() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_KEY
  ) {
    throw new Error(
      'Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY'
    )
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
}

interface ArticleMetadata {
  title: string
  excerpt: string
  category: string
  tags: string[]
  coverImage: string
  publishedAt: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
}

interface CategoryData {
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

export class ContentSyncer {
  private supabase = getSupabaseClient()

  /**
   * 同步所有内容到 Supabase
   */
  async syncAllContent() {
    console.log('🚀 开始同步内容到 Supabase...')

    try {
      // 1. 同步分类
      console.log('\n📁 同步分类...')
      await this.syncCategories()

      // 2. 同步文章
      console.log('\n📝 同步文章...')
      await this.syncArticles()

      // 3. 更新统计信息
      console.log('\n📊 更新统计信息...')
      await this.updateStats()

      console.log('\n✅ 内容同步完成！')
    } catch (error) {
      console.error('❌ 同步失败:', error)
      process.exit(1)
    }
  }

  /**
   * 同步分类数据
   */
  private async syncCategories() {
    try {
      const categoryFiles = await glob('content/categories/*.json')

      if (categoryFiles.length === 0) {
        console.log('⚠️  未找到分类文件，跳过分类同步')
        return
      }

      for (const file of categoryFiles) {
        const content = await fs.readFile(file, 'utf-8')
        const category: CategoryData = JSON.parse(content)

        const { error } = await this.supabase.from('categories').upsert(
          {
            name: category.name,
            slug: category.slug,
            description: category.description,
            color: category.color,
            icon: category.icon
          },
          {
            onConflict: 'slug'
          }
        )

        if (error) {
          console.error(`❌ 分类同步失败 ${file}:`, error)
        } else {
          console.log(`✅ 分类已同步: ${category.name}`)
        }
      }
    } catch (error) {
      console.error('分类同步过程出错:', error)
    }
  }

  /**
   * 同步所有文章
   */
  private async syncArticles() {
    try {
      const articleFiles = await glob('content/posts/*.md')

      if (articleFiles.length === 0) {
        console.log('⚠️  未找到文章文件，跳过文章同步')
        return
      }

      let successCount = 0
      let errorCount = 0

      for (const file of articleFiles) {
        try {
          await this.syncSingleArticle(file)
          successCount++
        } catch (error) {
          console.error(`❌ 文章同步失败 ${file}:`, error)
          errorCount++
        }
      }

      console.log(`\n📊 同步结果: ${successCount} 成功, ${errorCount} 失败`)
    } catch (error) {
      console.error('文章同步过程出错:', error)
    }
  }

  /**
   * 同步单个文章
   */
  async syncSingleArticle(filePath: string) {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data: metadata, content } = matter(fileContent)
    const slug = path.basename(filePath, '.md')

    // 验证必要字段
    if (!metadata.title || !metadata.excerpt || !content) {
      throw new Error(`文章缺少必要字段: ${filePath}`)
    }

    // 计算阅读时间
    const readingTime = this.calculateReadingTime(content)

    const articleData = {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content,
      category: metadata.category || 'uncategorized',
      tags: metadata.tags || [],
      cover_image: metadata.coverImage || null,
      published_at: metadata.publishedAt || new Date().toISOString(),
      featured: metadata.featured || false,
      reading_time: readingTime,
      status: 'published',
      seo_title: metadata.seoTitle || metadata.title,
      seo_description: metadata.seoDescription || metadata.excerpt,
      seo_keywords: metadata.seoKeywords || metadata.tags || [],
      updated_at: new Date().toISOString()
    }

    // 插入或更新文章
    const { data, error } = await this.supabase
      .from('articles')
      .upsert(articleData, {
        onConflict: 'slug'
      })
      .select('id')
      .single()

    if (error) {
      throw error
    }

    console.log(`✅ 文章已同步: ${metadata.title}`)

    // 同步标签关联
    if (metadata.tags && metadata.tags.length > 0) {
      await this.syncArticleTags(data.id, metadata.tags)
    }

    return data
  }

  /**
   * 同步文章标签关联
   */
  private async syncArticleTags(articleId: string, tags: string[]) {
    try {
      // 首先确保所有标签都存在
      for (const tagName of tags) {
        const tagSlug = this.slugify(tagName)

        await this.supabase.from('tags').upsert(
          {
            name: tagName,
            slug: tagSlug,
            description: `${tagName} 相关文章`
          },
          {
            onConflict: 'slug'
          }
        )
      }

      // 删除旧的标签关联
      await this.supabase
        .from('article_tags')
        .delete()
        .eq('article_id', articleId)

      // 创建新的标签关联
      for (const tagName of tags) {
        const tagSlug = this.slugify(tagName)

        const { data: tag } = await this.supabase
          .from('tags')
          .select('id')
          .eq('slug', tagSlug)
          .single()

        if (tag) {
          await this.supabase.from('article_tags').insert({
            article_id: articleId,
            tag_id: tag.id
          })
        }
      }
    } catch (error) {
      console.error('标签关联同步失败:', error)
    }
  }

  /**
   * 更新统计信息
   */
  private async updateStats() {
    try {
      // 更新分类文章数量
      const { data: categories } = await this.supabase
        .from('categories')
        .select('slug')

      if (categories) {
        for (const category of categories) {
          const { count } = await this.supabase
            .from('articles')
            .select('*', { count: 'exact', head: true })
            .eq('category', category.slug)
            .eq('status', 'published')

          await this.supabase
            .from('categories')
            .update({ article_count: count || 0 })
            .eq('slug', category.slug)
        }
      }

      // 更新标签文章数量
      const { data: tags } = await this.supabase.from('tags').select('id, slug')

      if (tags) {
        for (const tag of tags) {
          const { count } = await this.supabase
            .from('article_tags')
            .select('*', { count: 'exact', head: true })
            .eq('tag_id', tag.id)

          await this.supabase
            .from('tags')
            .update({ article_count: count || 0 })
            .eq('id', tag.id)
        }
      }

      console.log('✅ 统计信息更新完成')
    } catch (error) {
      console.error('统计信息更新失败:', error)
    }
  }

  /**
   * 计算阅读时间（分钟）
   */
  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200 // 中文阅读速度
    const wordCount = content.length // 中文按字符数计算
    return Math.ceil(wordCount / wordsPerMinute)
  }

  /**
   * 生成 URL 友好的 slug
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  /**
   * 检查 Supabase 连接
   */
  async checkConnection() {
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .select('count', { count: 'exact', head: true })

      if (error) {
        throw error
      }

      console.log('✅ Supabase 连接正常')
      return true
    } catch (error) {
      console.error('❌ Supabase 连接失败:', error)
      return false
    }
  }
}
