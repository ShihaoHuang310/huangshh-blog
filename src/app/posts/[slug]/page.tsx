import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PostClient } from "./post-client"
import { ArticleAPI, type Article } from "../../../lib/supabase"

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
      bio: "热爱技术分享的前端开发者，专注于 React、Next.js 和现代前端技术栈。",
      website: "https://example.com",
      social: {
        github: "https://github.com/username",
        twitter: "https://twitter.com/username",
        linkedin: "https://linkedin.com/in/username",
      },
    },
    coverImage: article.cover_image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
  }
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  // 从 Supabase 获取文章信息
  const article = await ArticleAPI.getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "文章未找到",
    }
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    keywords: article.seo_keywords?.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: ["博客作者"],
      images: article.cover_image ? [article.cover_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.cover_image ? [article.cover_image] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  // 从 Supabase 获取文章
  const article = await ArticleAPI.getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // 转换为 BlogPost 格式
  const post = articleToBlogPost(article)

  return <PostClient post={post} />
}
