"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, FileText, Folder, Hash, Home, User, Code, Mail, Rss, ExternalLink, ChevronRight, Globe, Map } from "lucide-react"
import { Article, Category, Tag } from "@/types/blog"

interface SitemapClientProps {
  articles: Article[]
  categories: Category[]
  tags: Tag[]
}

export function SitemapClient({ articles, categories, tags }: SitemapClientProps) {
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(['main', 'articles']))

  // 使用固定时间避免水合错误
  const currentTime = '2024-12-29T12:00:00.000Z'

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const sitemapSections = [
    {
      id: 'main',
      title: 'main_pages/',
      icon: Home,
      color: 'text-blue-400',
      items: [
        { name: 'index.html', path: '/', description: '首页 - 博客主页和最新内容' },
        { name: 'about.html', path: '/about', description: '关于我 - 个人信息和技能展示' },
        { name: 'projects.html', path: '/projects', description: '项目展示 - 开源项目和代码示例' },
        { name: 'contact.html', path: '/contact', description: '联系方式 - 获取联系信息' },
      ]
    },
    {
      id: 'articles',
      title: 'articles/',
      icon: FileText,
      color: 'text-green-400',
      items: (articles || []).slice(0, 10).map(article => ({
        name: `${article.slug}.html`,
        path: `/articles/${article.slug}`,
        description: article.title,
        date: article.publishedAt
      }))
    },
    {
      id: 'categories',
      title: 'categories/',
      icon: Folder,
      color: 'text-yellow-400',
      items: (categories || []).map(category => ({
        name: `${category.slug}/`,
        path: `/categories/${category.slug}`,
        description: category.description || category.name,
        count: category.postCount || 0
      }))
    },
    {
      id: 'tags',
      title: 'tags/',
      icon: Hash,
      color: 'text-purple-400',
      items: (tags || []).slice(0, 15).map(tag => ({
        name: `${tag.slug}.html`,
        path: `/tags/${tag.slug}`,
        description: `标签: ${tag.name}`,
        count: tag.postCount || 0
      }))
    },
    {
      id: 'feeds',
      title: 'feeds/',
      icon: Rss,
      color: 'text-orange-400',
      items: [
        { name: 'rss.xml', path: '/rss.xml', description: 'RSS 主要订阅源' },
        { name: 'sitemap.xml', path: '/sitemap.xml', description: 'XML 站点地图' },
        { name: 'robots.txt', path: '/robots.txt', description: '搜索引擎爬虫规则' },
      ]
    }
  ]

  const totalPages = sitemapSections.reduce((sum, section) => sum + (section.items?.length || 0), 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-400">sitemap.xml()</div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">tree -a website/</span>
              </div>
              
              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">
                  website/ ({totalPages} pages total)
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">├──</span> 
                  <span className="ml-2 text-blue-400">public/</span>
                  <span className="ml-4 text-gray-500"># Static assets</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">├──</span> 
                  <span className="ml-2 text-purple-400">pages/</span>
                  <span className="ml-4 text-gray-500"># Dynamic routes</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">├──</span> 
                  <span className="ml-2 text-yellow-400">api/</span>
                  <span className="ml-4 text-gray-500"># API endpoints</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">└──</span> 
                  <span className="ml-2 text-orange-400">sitemap.xml</span>
                  <span className="ml-4 text-gray-500"># This file</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sitemap Sections */}
        <div className="space-y-6">
          {sitemapSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
            >
              {/* Section Header */}
              <div 
                className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-3">
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                  <span className="font-mono text-white">{section.title}</span>
                  <span className="text-xs font-mono text-gray-400">
                    ({section.items.length} items)
                  </span>
                </div>
                <ChevronRight 
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.has(section.id) ? 'rotate-90' : ''
                  }`} 
                />
              </div>

              {/* Section Content */}
              {expandedSections.has(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-gray-500 font-mono">developer@localhost:~$</span>
                    <span className="text-green-400 font-mono">ls -la {section.title}</span>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: itemIndex * 0.05 }}
                        className="group"
                      >
                        <Link
                          href={item.path}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500/50 hover:bg-gray-750 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="font-mono text-blue-400 group-hover:text-blue-300">
                                {item.name}
                              </span>
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                              {item.description}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-xs font-mono text-gray-500">
                            {item.date && (
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            )}
                            {item.count !== undefined && (
                              <span>({item.count})</span>
                            )}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    
                    {section.id === 'articles' && (articles?.length || 0) > 10 && (
                      <div className="p-3 bg-gray-800 rounded border border-gray-600 text-center">
                        <Link
                          href="/articles"
                          className="text-blue-400 hover:text-blue-300 font-mono text-sm"
                        >
                          ... and {(articles?.length || 0) - 10} more articles
                        </Link>
                      </div>
                    )}

                    {section.id === 'tags' && (tags?.length || 0) > 15 && (
                      <div className="p-3 bg-gray-800 rounded border border-gray-600 text-center">
                        <Link
                          href="/tags"
                          className="text-blue-400 hover:text-blue-300 font-mono text-sm"
                        >
                          ... and {(tags?.length || 0) - 15} more tags
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-12 bg-gray-900 rounded-lg border border-gray-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-gray-500 font-mono">developer@localhost:~$</span>
            <span className="text-green-400 font-mono">wc -l sitemap.xml</span>
          </div>
          
          <div className="ml-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-800 rounded border border-gray-600 p-4">
              <div className="text-2xl font-bold text-blue-400">{totalPages}</div>
              <div className="text-sm text-gray-400 font-mono">total_pages</div>
            </div>
            <div className="bg-gray-800 rounded border border-gray-600 p-4">
              <div className="text-2xl font-bold text-green-400">{articles?.length || 0}</div>
              <div className="text-sm text-gray-400 font-mono">articles</div>
            </div>
            <div className="bg-gray-800 rounded border border-gray-600 p-4">
              <div className="text-2xl font-bold text-yellow-400">{categories?.length || 0}</div>
              <div className="text-sm text-gray-400 font-mono">categories</div>
            </div>
            <div className="bg-gray-800 rounded border border-gray-600 p-4">
              <div className="text-2xl font-bold text-purple-400">{tags?.length || 0}</div>
              <div className="text-sm text-gray-400 font-mono">tags</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
            <div className="text-xs font-mono text-gray-400">
              <div className="text-green-400 mb-1"># Last updated:</div>
              <div>{currentTime || 'Loading...'}</div>
              <div className="text-yellow-400 mt-2"># Auto-generated sitemap for SEO optimization</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
