import { NextResponse } from 'next/server'
import { ArticleAPI, CategoryAPI, TagAPI } from '@/lib/supabase'

export async function GET() {
  try {
    const [articles, categories, tags] = await Promise.all([
      ArticleAPI.getAllArticles(),
      CategoryAPI.getAllCategories(),
      TagAPI.getAllTags()
    ])
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/projects', changefreq: 'weekly', priority: '0.8' },
      { url: '/contact', changefreq: 'monthly', priority: '0.6' },
      { url: '/categories', changefreq: 'weekly', priority: '0.7' },
      { url: '/tags', changefreq: 'weekly', priority: '0.7' },
      { url: '/rss', changefreq: 'monthly', priority: '0.5' },
      { url: '/sitemap', changefreq: 'monthly', priority: '0.5' },
    ]

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  ${tags.map(tag => `
  <url>
    <loc>${baseUrl}/tags/${tag.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('生成 Sitemap 失败:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
