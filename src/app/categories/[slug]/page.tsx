import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryDetailClient } from "./category-detail-client"
import { CategoryAPI, ArticleAPI } from "@/lib/supabase"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await CategoryAPI.getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: "分类未找到",
      description: "请求的分类不存在"
    }
  }

  return {
    title: `${category.name} | 分类文章`,
    description: category.description || `浏览 ${category.name} 分类下的所有文章`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const { slug } = await params
    const [category, articles] = await Promise.all([
      CategoryAPI.getCategoryBySlug(slug),
      ArticleAPI.getArticlesByCategory(slug)
    ])

    if (!category) {
      notFound()
    }

    return <CategoryDetailClient category={category} articles={articles} />
  } catch (error) {
    console.error('获取分类详情失败:', error)
    notFound()
  }
}
