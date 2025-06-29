import { NextResponse } from 'next/server'
import { ArticleAPI } from '@/lib/supabase'

export async function GET() {
  try {
    const articles = await ArticleAPI.getAllArticles()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dev Blog - 程序员技术博客</title>
    <description>分享前端开发、技术教程和编程经验</description>
    <link>${baseUrl}</link>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <category><![CDATA[${article.category}]]></category>
      ${article.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`).join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('生成 RSS 失败:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
