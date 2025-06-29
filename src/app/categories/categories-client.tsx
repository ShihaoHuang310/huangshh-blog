"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ArrowRight } from "lucide-react"
import { Category } from "@/types/blog"

interface CategoriesClientProps {
  categories: (Category & { postCount: number })[]
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  const totalPosts = categories.reduce((sum, category) => sum + category.postCount, 0)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">文章分类</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            探索不同的技术主题，找到你感兴趣的内容
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {categories.length} 个分类
            </div>
            <div className="flex items-center">
              <span>共 {totalPosts} 篇文章</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/categories/${category.slug}`}
              className="group block h-full"
            >
              <div className="h-full bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                {/* Category Icon */}
                <div className="mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name.charAt(0)}
                  </div>
                </div>

                {/* Category Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {category.postCount} 篇文章
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                    查看文章
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Popular Categories */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">热门分类</h2>
          <p className="text-muted-foreground">
            最受欢迎的技术主题
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories
            .sort((a, b) => b.postCount - a.postCount)
            .slice(0, 6)
            .map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                  <span className="ml-2 text-muted-foreground">
                    ({category.postCount})
                  </span>
                </Link>
              </motion.div>
            ))}
        </div>
      </motion.section>
    </div>
  )
}
