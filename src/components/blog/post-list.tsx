"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BlogPost } from "@/types/blog"
import { PostCard } from "./post-card"
import { cn } from "@/lib/utils"

interface PostListProps {
  posts: BlogPost[]
  className?: string
  variant?: "grid" | "list"
  showFeatured?: boolean
}

export function PostList({ 
  posts, 
  className, 
  variant = "grid", 
  showFeatured = true 
}: PostListProps) {
  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  if (posts.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            暂无文章
          </h3>
          <p className="text-muted-foreground">
            还没有发布任何文章，请稍后再来查看。
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={cn("space-y-12", className)}>
      {/* Featured Posts */}
      {showFeatured && featuredPosts.length > 0 && (
        <section>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2">精选文章</h2>
            <p className="text-muted-foreground">
              精心挑选的优质内容
            </p>
          </motion.div>

          <div className={cn(
            variant === "grid" 
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
          )}>
            {featuredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                variant="featured"
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section>
          {showFeatured && featuredPosts.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-2">最新文章</h2>
              <p className="text-muted-foreground">
                最近发布的技术文章
              </p>
            </motion.div>
          )}

          <div className={cn(
            variant === "grid" 
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
          )}>
            {regularPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                variant={variant === "list" ? "compact" : "default"}
                index={index + featuredPosts.length}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
