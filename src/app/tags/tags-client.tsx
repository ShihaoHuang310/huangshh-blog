"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, Hash, Search, Filter, Code, Zap, Coffee, Database, Globe, Cpu } from "lucide-react"
import { Tag } from "@/types/blog"

interface TagsClientProps {
  tags: (Tag & { postCount: number })[]
}

// 程序员风格的标签图标映射
const getTagIcon = (name: string) => {
  const iconMap: Record<string, any> = {
    'react': Code,
    'javascript': Zap,
    'typescript': Code,
    'css': Hash,
    'html': Globe,
    'node': Database,
    'performance': Cpu,
    'tutorial': Coffee,
    'tips': Terminal,
    'guide': Coffee,
    'best-practices': Zap,
    'optimization': Cpu,
  }
  
  return iconMap[name.toLowerCase()] || Hash
}

// 根据文章数量计算标签大小
const getTagSize = (count: number, maxCount: number) => {
  const ratio = count / maxCount
  if (ratio > 0.8) return 'text-2xl'
  if (ratio > 0.6) return 'text-xl'
  if (ratio > 0.4) return 'text-lg'
  if (ratio > 0.2) return 'text-base'
  return 'text-sm'
}

// 根据文章数量计算标签颜色
const getTagColor = (count: number, maxCount: number) => {
  const ratio = count / maxCount
  if (ratio > 0.8) return 'text-red-400 border-red-400/50 bg-red-400/10'
  if (ratio > 0.6) return 'text-orange-400 border-orange-400/50 bg-orange-400/10'
  if (ratio > 0.4) return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
  if (ratio > 0.2) return 'text-green-400 border-green-400/50 bg-green-400/10'
  return 'text-blue-400 border-blue-400/50 bg-blue-400/10'
}

export function TagsClient({ tags }: TagsClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortBy, setSortBy] = React.useState<"name" | "count">("count")

  const maxCount = tags.length > 0 ? Math.max(...tags.map(tag => tag.postCount)) : 0

  const filteredTags = tags
    .filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return b.postCount - a.postCount
    })

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
              <div className="text-sm font-mono text-gray-400">tags.all()</div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">find . -name "*.tag" | wc -l</span>
              </div>
              
              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">
                  Found {tags.length} tags in {tags.reduce((sum, tag) => sum + tag.postCount, 0)} posts
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">Most popular:</span>
                  <span className="ml-2 text-yellow-400">
                    {tags.length > 0 ? tags.sort((a, b) => b.postCount - a.postCount)[0]?.name : 'N/A'}
                  </span>
                  <span className="text-gray-500"> ({tags.length > 0 ? tags.sort((a, b) => b.postCount - a.postCount)[0]?.postCount : 0} posts)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="grep -i 'tag_name'"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "count")}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="count">sort -nr</option>
                  <option value="name">sort -a</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tags Cloud */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-gray-500 font-mono">developer@localhost:~$</span>
              <span className="text-green-400 font-mono">cat tag_cloud.txt</span>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredTags.map((tag, index) => {
                const IconComponent = getTagIcon(tag.name)
                const sizeClass = getTagSize(tag.postCount, maxCount)
                const colorClass = getTagColor(tag.postCount, maxCount)
                
                return (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/tags/${tag.slug}`}
                      className={`group inline-flex items-center space-x-2 px-4 py-2 rounded-lg border font-mono transition-all duration-200 hover:shadow-lg ${colorClass} ${sizeClass}`}
                    >
                      <Hash className="w-3 h-3" />
                      <IconComponent className="w-4 h-4" />
                      <span>{tag.name}</span>
                      <span className="text-xs opacity-70">({tag.postCount})</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            
            {filteredTags.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 font-mono">
                  <div className="text-red-400 mb-2">grep: no matches found</div>
                  <div>Try a different search term</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tag Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-gray-500 font-mono">developer@localhost:~$</span>
              <span className="text-green-400 font-mono">analyze_tags.py --stats</span>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-800 rounded border border-gray-600 p-4">
                <div className="text-2xl font-bold text-blue-400">{tags.length}</div>
                <div className="text-sm text-gray-400 font-mono">total_tags</div>
              </div>
              <div className="bg-gray-800 rounded border border-gray-600 p-4">
                <div className="text-2xl font-bold text-green-400">
                  {tags.reduce((sum, tag) => sum + tag.postCount, 0)}
                </div>
                <div className="text-sm text-gray-400 font-mono">total_posts</div>
              </div>
              <div className="bg-gray-800 rounded border border-gray-600 p-4">
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.round(tags.reduce((sum, tag) => sum + tag.postCount, 0) / tags.length)}
                </div>
                <div className="text-sm text-gray-400 font-mono">avg_per_tag</div>
              </div>
              <div className="bg-gray-800 rounded border border-gray-600 p-4">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.max(...tags.map(tag => tag.postCount))}
                </div>
                <div className="text-sm text-gray-400 font-mono">max_posts</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
