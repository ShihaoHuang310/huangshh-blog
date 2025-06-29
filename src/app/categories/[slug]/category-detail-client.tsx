"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal, ArrowLeft, Calendar, Clock, Eye, Heart, Folder, FileText } from "lucide-react"
import { Article, Category } from "@/types/blog"
import { Button } from "@/components/ui/button"

interface CategoryDetailClientProps {
  category: Category & { postCount?: number }
  articles: Article[]
}

export function CategoryDetailClient({ category, articles }: CategoryDetailClientProps) {
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
              <div className="text-sm font-mono text-gray-400">categories/{category.slug}/</div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">cd categories/{category.slug} && ls -la</span>
              </div>
              
              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">
                  Found {articles.length} articles in {category.name}
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">drwxr-xr-x</span> 
                  <span className="ml-2 text-purple-400">{category.slug}/</span>
                  <span className="ml-4 text-gray-500">{category.description}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            variant="outline"
            asChild
            className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800 font-mono"
          >
            <Link href="/categories">
              <ArrowLeft className="w-4 h-4 mr-2" />
              cd ../
            </Link>
          </Button>
        </motion.div>

        {/* Category Info */}
        <motion.div
          className="mb-12 bg-gray-900 rounded-lg border border-gray-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div
              className="w-12 h-12 rounded flex items-center justify-center"
              style={{ backgroundColor: category.color + '20', border: `2px solid ${category.color}` }}
            >
              <Folder className="w-6 h-6" style={{ color: category.color }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-mono text-white">{category.name}</h1>
              <p className="text-gray-400 font-mono">{articles.length} articles</p>
            </div>
          </div>
          
          {category.description && (
            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <div className="text-xs font-mono text-gray-400 mb-2">
                <span className="text-green-400">$</span> cat README.md
              </div>
              <p className="text-gray-300 font-mono">{category.description}</p>
            </div>
          )}
        </motion.div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="group block bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold font-mono text-white group-hover:text-blue-400 transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                    {article.featured && (
                      <div className="ml-4 px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs font-mono text-yellow-400">
                        featured
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.reading_time} min read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.view_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{article.like_count}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-mono text-gray-300 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500 font-mono">
                  # This category is empty. Check back later for new content!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
