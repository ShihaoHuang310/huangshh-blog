import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { TagDetailClient } from "./tag-detail-client"
import { TagAPI, ArticleAPI } from "@/lib/supabase"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await TagAPI.getTagBySlug(slug)
  
  if (!tag) {
    return {
      title: "标签未找到",
      description: "请求的标签不存在"
    }
  }

  return {
    title: `#${tag.name} | 标签文章`,
    description: tag.description || `浏览标签 ${tag.name} 下的所有文章`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  try {
    const { slug } = await params
    const [tag, articles] = await Promise.all([
      TagAPI.getTagBySlug(slug),
      ArticleAPI.getArticlesByTag(slug)
    ])

    if (!tag) {
      notFound()
    }

    return <TagDetailClient tag={tag} articles={articles} />
  } catch (error) {
    console.error('获取标签详情失败:', error)
    notFound()
  }
}
