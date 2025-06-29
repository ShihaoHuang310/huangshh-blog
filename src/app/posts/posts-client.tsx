"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, FileText, Filter, Search, Calendar, Eye, Clock, Tag, TrendingUp, Sparkles, Grid, List } from "lucide-react"
import { PostList } from "@/components/blog/post-list"
import { BlogPost } from "@/types/blog"
import { ParticleBackground } from "@/components/three/particle-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/ui/pagination"

interface PostsClientProps {
  posts: BlogPost[]
  pagination?: {
    currentPage: number
    totalPages: number
    total: number
    pageSize: number
  }
}

export function PostsClient({ posts, pagination }: PostsClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState<"latest" | "popular" | "reading-time">("latest")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    // 确保组件挂载后再显示内容，避免水合问题
    setIsLoaded(true)
  }, [])

  const categories = Array.from(new Set(posts.map(post => post.category)))

  // 简化过滤和排序逻辑
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      const matchesCategory = selectedCategory === null || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.viewCount - a.viewCount
        case "reading-time":
          return a.readingTime - b.readingTime
        case "latest":
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })



  if (!isLoaded) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground variant="matrix" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-muted-foreground">Loading posts...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Particle Background */}
      <ParticleBackground variant="matrix" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2 text-sm font-mono text-muted-foreground"
            >
              <Terminal className="w-4 h-4" />
              <span>ls -la ~/blog/posts/</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold font-mono">
              <span className="text-blue-500">const</span>{" "}
              <span className="text-purple-500">posts</span>{" "}
              <span className="text-gray-500">=</span>{" "}
              <span className="text-green-500">[</span>
              <br />
              <span className="text-2xl sm:text-3xl ml-8">
                <span className="text-orange-500">knowledge</span>
                <span className="text-gray-500">,</span>{" "}
                <span className="text-green-400">experience</span>
                <span className="text-gray-500">,</span>{" "}
                <span className="text-blue-400">insights</span>
              </span>
              <br />
              <span className="text-green-500">];</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed font-mono max-w-2xl mx-auto">
              // 探索技术世界，分享开发经验
              <br />
              // 记录学习历程，传播编程智慧
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm font-mono text-muted-foreground mt-6"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>{posts.length} articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-green-500" />
                <span>{posts.reduce((sum, post) => sum + post.viewCount, 0).toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>{posts.reduce((sum, post) => sum + post.readingTime, 0)} min read</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="card-enhanced rounded-lg p-6 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  // Search articles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="search(title, content)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 font-mono bg-background/50"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  // Sort by
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant={sortBy === "latest" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("latest")}
                    className="font-mono text-xs flex-1"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Latest
                  </Button>
                  <Button
                    variant={sortBy === "popular" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("popular")}
                    className="font-mono text-xs flex-1"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Popular
                  </Button>
                  <Button
                    variant={sortBy === "reading-time" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("reading-time")}
                    className="font-mono text-xs flex-1"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Quick
                  </Button>
                </div>
              </div>

              {/* View Mode */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  // View mode
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="font-mono text-xs flex-1"
                  >
                    <Grid className="w-3 h-3 mr-1" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="font-mono text-xs flex-1"
                  >
                    <List className="w-3 h-3 mr-1" />
                    List
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <label className="block text-sm font-mono text-muted-foreground mb-3">
                // Filter by category
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="font-mono text-xs"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  all ({posts.length})
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="font-mono text-xs"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category.toLowerCase()} ({posts.filter(p => p.category === category).length})
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-6 border-t border-border/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono text-muted-foreground">
                  <Sparkles className="inline w-4 h-4 mr-1 text-yellow-500" />
                  Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
                <div className="text-xs font-mono text-muted-foreground">
                  Total reading time: {filteredPosts.reduce((sum, post) => sum + post.readingTime, 0)} min
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Posts Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-mono font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground font-mono">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search or filter criteria"
                    : "No articles available at the moment"
                  }
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                    className="mt-4 font-mono"
                  >
                    Clear filters
                  </Button>
                )}
              </motion.div>
            ) : (
              <div className={viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }>
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Link href={`/posts/${post.slug}`} className="block">
                      <div className={`card-enhanced rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer ${
                        viewMode === "list" ? "flex h-48" : "h-full flex flex-col"
                      }`}>
                        <div className={`relative overflow-hidden flex-shrink-0 ${
                          viewMode === "list" ? "w-48" : "h-48"
                        }`}>
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-mono">
                              {post.category}
                            </span>
                          </div>
                          {post.featured && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-yellow-500/90 text-yellow-900 px-2 py-1 rounded text-xs font-mono flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Featured
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`p-6 flex flex-col ${viewMode === "list" ? "flex-1" : "flex-1"}`}>
                          {/* 标题 - 固定1行 */}
                          <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-1 min-h-[1.75rem]">
                            {post.title}
                          </h3>

                          {/* 描述 - 固定3行，占据剩余空间 */}
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
                            {post.excerpt}
                          </p>

                          {/* 元信息 - 固定高度 */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-3">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.viewCount.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.readingTime} min</span>
                              </div>
                            </div>
                          </div>

                          {/* 标签 - 固定高度 */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 min-h-[1.5rem]">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-muted/50 text-muted-foreground px-2 py-1 rounded text-xs font-mono"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground font-mono">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
        </motion.div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              total={pagination.total}
              pageSize={pagination.pageSize}
              basePath="/posts"
            />
          </motion.div>
        )}

        {/* End indicator for single page */}
        {(!pagination || pagination.totalPages <= 1) && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-2 text-sm font-mono text-muted-foreground">
              <span>// End of results</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
