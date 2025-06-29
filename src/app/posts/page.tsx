import * as React from "react"
import { Metadata } from "next"
import { PostsClient } from "./posts-client"
import { ArticleAPI, type Article } from "../../lib/supabase"

// 将 Article 转换为 BlogPost 格式的辅助函数
function articleToBlogPost(article: Article): any {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags,
    publishedAt: article.published_at,
    updatedAt: article.updated_at,
    readingTime: article.reading_time,
    viewCount: article.view_count,
    featured: article.featured,
    author: {
      id: "1",
      name: "博客作者",
      email: "author@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "热爱技术分享的前端开发者",
    },
    coverImage: article.cover_image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  }
}

export const metadata: Metadata = {
  title: "所有文章",
  description: "浏览所有技术文章，涵盖前端开发、React、Next.js、TypeScript 等主题。",
}

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const pageSize = 6

  // 从 Supabase 获取分页文章
  const result = await ArticleAPI.getAllArticles(page, pageSize)
  const posts = result.articles.map(articleToBlogPost)

  return (
    <PostsClient
      posts={posts}
      pagination={{
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        total: result.total,
        pageSize
      }}
    />
  )
}
