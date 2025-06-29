import * as React from "react"
import { Metadata } from "next"
import { SitemapClient } from "./sitemap-client"
import { ArticleAPI, CategoryAPI, TagAPI, supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "sitemap.xml() | 站点地图",
  description: "浏览网站的完整结构和所有页面链接。",
}

export default async function SitemapPage() {
  try {
    // 优化：只获取基础数据，不查询文章数量（避免慢查询）
    const [articles, categories, tags] = await Promise.all([
      // 暂时返回空数组，避免慢查询
      Promise.resolve([]),
      // 只获取分类基础信息，不查询文章数量
      getCategoriesBasic(),
      // 只获取标签基础信息，不查询文章数量
      getTagsBasic()
    ])

    // 确保数据是数组格式
    const safeArticles = Array.isArray(articles) ? articles : []
    const safeCategories = Array.isArray(categories) ? categories : []
    const safeTags = Array.isArray(tags) ? tags : []

    return <SitemapClient articles={safeArticles} categories={safeCategories} tags={safeTags} />
  } catch (error) {
    console.error('获取站点地图数据失败:', error)

    // 如果数据库连接失败，显示错误信息并传递空数组
    return <SitemapClient articles={[]} categories={[]} tags={[]} />
  }
}

// 优化的分类获取函数（不查询文章数量）
async function getCategoriesBasic() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('获取分类失败:', error)
      return []
    }

    // 添加默认的 postCount
    return (data || []).map(category => ({
      ...category,
      postCount: 0 // 默认值，避免慢查询
    }))
  } catch (error) {
    console.error('获取分类失败:', error)
    return []
  }
}

// 优化的标签获取函数（不查询文章数量）
async function getTagsBasic() {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name')

    if (error) {
      console.error('获取标签失败:', error)
      return []
    }

    // 添加默认的 postCount
    return (data || []).map(tag => ({
      ...tag,
      postCount: 0 // 默认值，避免慢查询
    }))
  } catch (error) {
    console.error('获取标签失败:', error)
    return []
  }
}
