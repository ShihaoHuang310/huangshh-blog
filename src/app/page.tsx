import { ArticleAPI, type Article } from "@/lib/supabase"
import { HomeClient } from "./home-client"

// 将 Article 转换为显示格式的辅助函数
function formatArticleForDisplay(article: Article) {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    publishedAt: new Date(article.published_at).toLocaleDateString('zh-CN'),
    readingTime: article.reading_time,
    viewCount: article.view_count,
    slug: article.slug,
    coverImage: article.cover_image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
  }
}

export default async function Home() {
  // 从 Supabase 获取精选文章
  const articles = await ArticleAPI.getFeaturedArticles(3)
  const featuredPosts = articles.map(formatArticleForDisplay)

  return <HomeClient featuredPosts={featuredPosts} />
}
