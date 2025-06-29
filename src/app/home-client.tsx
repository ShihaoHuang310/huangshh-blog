"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal, Code, Coffee, Zap, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

// 代码示例
const codeExample = `const developer = {
  name: "Frontend Dev",
  skills: ["React", "TypeScript", "Next.js"],
  passion: "Building amazing UIs",

  createMagic() {
    return this.skills.map(skill =>
      \`\${skill} + creativity = ✨\`
    );
  }
};

console.log(developer.createMagic());`

const stats = [
  { label: "Lines of Code", value: "100K+", icon: Code },
  { label: "Projects Built", value: "50+", icon: Terminal },
  { label: "Coffee Consumed", value: "∞", icon: Coffee },
  { label: "Ideas per Day", value: "42", icon: Zap },
]

interface HomeClientProps {
  featuredPosts: Array<{
    id: string
    title: string
    excerpt: string
    category: string
    publishedAt: string
    readingTime: number
    viewCount: number
    slug: string
    coverImage: string
  }>
}

export function HomeClient({ featuredPosts }: HomeClientProps) {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 text-green-400 font-mono text-sm"
                >
                  <Terminal className="w-4 h-4" />
                  <span className="text-gray-500">developer@localhost:~$</span>
                  <span>cat welcome.txt</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 font-mono text-sm"
                >
                  <div className="text-gray-500">// Building the future, one component at a time</div>
                  <div className="text-gray-500">// Sharing knowledge through code and creativity</div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-mono"
                >
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-purple-400">developer</span>{" "}
                  <span className="text-yellow-400">=</span>{" "}
                  <span className="text-yellow-400">{"{"}</span>
                  <div className="ml-4 mt-2 space-y-1 text-2xl md:text-3xl lg:text-4xl">
                    <div><span className="text-orange-400">name</span><span className="text-yellow-400">:</span> <span className="text-green-300">"Frontend Dev"</span><span className="text-yellow-400">,</span></div>
                    <div><span className="text-orange-400">passion</span><span className="text-yellow-400">:</span> <span className="text-green-300">"Modern Web"</span><span className="text-yellow-400">,</span></div>
                    <div><span className="text-orange-400">mission</span><span className="text-yellow-400">:</span> <span className="text-green-300">"Share Knowledge"</span></div>
                  </div>
                  <span className="text-yellow-400">{"}"}</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-sm text-gray-400 space-y-1"
                >
                  <div>/* 专注于现代前端技术栈 */</div>
                  <div>/* React • Vue • TypeScript • Next.js */</div>
                  <div>/* 分享实用开发经验和最佳实践 */</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="group font-mono" asChild>
                  <Link href="/posts">
                    <span className="text-green-400 mr-2">{">"}</span>
                    explore_posts()
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="font-mono" asChild>
                  <Link href="/about">
                    <span className="text-purple-400 mr-2">{">"}</span>
                    ./about_me
                  </Link>
                </Button>
              </motion.div>

              {/* Stats - Terminal Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-8 border-t border-border/50"
              >
                <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center space-x-2 mb-3 text-sm font-mono">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <span className="text-gray-500">system.stats</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="bg-gray-800/50 rounded border border-gray-600 p-3 text-center"
                      >
                        <stat.icon className="w-4 h-4 mx-auto mb-2 text-orange-400" />
                        <div className="text-lg font-bold text-white font-mono">{stat.value}</div>
                        <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 text-sm font-mono ml-4">terminal</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-green-400">$ cat developer.js</div>
                  <pre className="text-gray-300 whitespace-pre-wrap">{codeExample}</pre>
                  <div className="text-green-400">$ npm run build</div>
                  <div className="text-green-400">✓ Build completed successfully</div>
                  <div className="text-green-400">$ git status</div>
                  <div className="text-blue-400">On branch main<br />Your branch is up to date with 'origin/main'</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4 font-mono text-sm">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-gray-500">blog.latest_posts()</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-purple-400">articles</span>{" "}
              <span className="text-yellow-400">=</span>{" "}
              <span className="text-green-300">await</span>{" "}
              <span className="text-orange-400">fetchLatest</span>
              <span className="text-yellow-400">()</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-gray-500">{`/* 探索最新的前端技术趋势和开发实践 */`}</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/posts/${post.slug}`}>
                  <div className="card-enhanced rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {/* 标题 - 固定1行 */}
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-1 min-h-[1.75rem]">
                        {post.title}
                      </h3>

                      {/* 描述 - 固定3行，占据剩余空间 */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
                        {post.excerpt}
                      </p>

                      {/* 元信息 - 固定高度 */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mt-auto">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.publishedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.viewCount}</span>
                          </div>
                        </div>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/posts">
                查看所有文章
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
