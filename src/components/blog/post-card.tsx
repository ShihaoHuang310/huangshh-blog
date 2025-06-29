"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, Eye, ArrowRight, User, FileText, Hash, Terminal } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: BlogPost
  className?: string
  variant?: "default" | "featured" | "compact"
  index?: number
}

export function PostCard({ post, className, variant = "default", index = 0 }: PostCardProps) {
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30",
        isFeatured && "md:col-span-2 lg:col-span-3",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Cover Image */}
        {post.coverImage && !isCompact && (
          <div className={cn(
            "relative overflow-hidden",
            isFeatured ? "h-64 md:h-80" : "h-48"
          )}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  精选
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(
          "p-6",
          isCompact && "p-4"
        )}>
          {/* Terminal-style header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                ./{post.category.toLowerCase()}/
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                {post.category}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground font-mono">
              {post.readingTime && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readingTime}min
                </div>
              )}
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {post.viewCount}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2 font-mono",
            isFeatured ? "text-2xl md:text-3xl" : "text-lg",
            isCompact && "text-base"
          )}>
            <span className="text-muted-foreground mr-2">const</span>
            <span className="text-blue-500">title</span>
            <span className="text-muted-foreground mr-2">=</span>
            <span className="text-green-400">"{post.title}"</span>
          </h3>

          {/* Excerpt */}
          {post.excerpt && !isCompact && (
            <div className="mb-4">
              <p className="text-muted-foreground text-xs font-mono mb-1">
                // {isFeatured ? "Featured article" : "Article description"}
              </p>
              <p className={cn(
                "text-muted-foreground line-clamp-3 leading-relaxed",
                isFeatured ? "text-base" : "text-sm"
              )}>
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && !isCompact && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-muted/50 text-muted-foreground border border-border/50">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center space-x-4">
              {/* Author */}
              <div className="flex items-center space-x-2">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                )}
                <span className="text-xs text-muted-foreground font-mono">
                  @{post.author.name.toLowerCase().replace(/\s+/g, '')}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center text-xs text-muted-foreground font-mono">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: '2-digit'
                })}
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center text-xs font-mono text-primary group-hover:text-primary/80 transition-colors">
              <FileText className="mr-1 h-3 w-3" />
              read()
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
