"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, Code, Folder, ArrowRight, Hash, FileText, Zap, Coffee, Database } from "lucide-react"
import { Category } from "@/types/blog"

interface CategoriesClientProps {
  categories: (Category & { postCount: number })[]
}

// 程序员风格的图标映射
const getCategoryIcon = (name: string) => {
  const iconMap: Record<string, any> = {
    'React': Code,
    'Next.js': Terminal,
    'TypeScript': FileText,
    'JavaScript': Zap,
    'CSS': Hash,
    'Database': Database,
    'Performance': Coffee,
    'Tools': Terminal,
    'Design': Hash,
    'Frontend': Code,
    'Backend': Database,
    'DevOps': Terminal,
    'Algorithm': Zap,
  }

  return iconMap[name] || Folder
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  // 直接使用传入的数据，避免客户端状态管理
  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name))
  const totalPosts = categories.reduce((sum, category) => sum + category.postCount, 0)

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
              <div className="text-sm font-mono text-gray-400">categories.list()</div>
              <div className="w-16"></div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">ls -la categories/</span>
              </div>

              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">
                  total {categories.length} directories, {totalPosts} files
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">drwxr-xr-x</span>
                  <span className="ml-2">.</span>
                  <span className="ml-8 text-gray-500">current directory</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">drwxr-xr-x</span>
                  <span className="ml-2">..</span>
                  <span className="ml-8 text-gray-500">parent directory</span>
                </div>
                {sortedCategories.slice(0, 3).map((category) => (
                  <div key={category.id} className="text-gray-300">
                    <span className="text-blue-400">drwxr-xr-x</span>
                    <span className="ml-2 text-purple-400">{category.slug}/</span>
                    <span className="ml-4 text-gray-500">{category.postCount} files</span>
                  </div>
                ))}
                {sortedCategories.length > 3 && (
                  <div className="text-gray-500">... and {sortedCategories.length - 3} more directories</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedCategories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-gray-900 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/50 hover:bg-gray-800">
                    {/* Terminal-style Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs font-mono text-gray-500">
                        ./{category.slug}
                      </div>
                    </div>

                    {/* Category Icon & Info */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className="w-10 h-10 rounded flex items-center justify-center"
                          style={{ backgroundColor: category.color + '20', border: `1px solid ${category.color}` }}
                        >
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: category.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold font-mono text-white group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </h3>
                          <div className="text-xs font-mono text-gray-500">
                            {category.postCount} files
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded p-3 border border-gray-600">
                        <div className="text-xs font-mono text-gray-400 mb-1">
                          <span className="text-green-400">$</span> cat README.md
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 font-mono">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-mono text-gray-400">
                        <span className="text-blue-400">ls</span> | <span className="text-green-400">wc -l</span>
                        <span className="ml-2">{category.postCount}</span>
                      </div>
                      <div className="flex items-center text-sm font-mono text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-green-400">cd</span>
                        <span className="ml-1">{category.slug}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Popular Categories Terminal */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-400">popular_categories.sh</div>
              <div className="w-16"></div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">sort -nr categories.txt | head -6</span>
              </div>

              <div className="ml-6 space-y-3">
                <div className="text-blue-400 text-sm mb-4">
                  # Top categories by post count
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {[...sortedCategories]
                    .sort((a, b) => b.postCount - a.postCount)
                    .slice(0, 6)
                    .map((category, index) => {
                      const IconComponent = getCategoryIcon(category.name)

                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Link
                            href={`/categories/${category.slug}`}
                            className="group block p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500/50 transition-all duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: category.color + '20', border: `1px solid ${category.color}` }}
                              >
                                <IconComponent
                                  className="w-4 h-4"
                                  style={{ color: category.color }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-white group-hover:text-blue-400 transition-colors truncate">
                                    {category.name}
                                  </span>
                                  <span className="text-gray-400 text-sm ml-2">
                                    {category.postCount}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  ./{category.slug}/
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
