"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal, Code, Coffee, Zap, BookOpen, Calendar, Eye, Star, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/three/particle-background"
import { Terminal as TerminalComponent, TerminalCommand, CodeBlock } from "@/components/ui/terminal"

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

// 最新文章预览
const featuredPosts = [
  {
    id: "1",
    title: "深入理解 React 19 的新特性",
    excerpt: "探索 React 19 带来的革命性变化，包括并发特性、Suspense 改进和新的 Hooks。",
    category: "React",
    publishedAt: "2024-01-15",
    readingTime: 8,
    viewCount: 1250,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
  },
  {
    id: "2",
    title: "TypeScript 5.0 实战指南",
    excerpt: "全面解析 TypeScript 5.0 的新功能，提升代码质量和开发效率。",
    category: "TypeScript",
    publishedAt: "2024-01-10",
    readingTime: 12,
    viewCount: 890,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Next.js 15 性能优化实践",
    excerpt: "分享 Next.js 15 的性能优化技巧，让你的应用飞起来。",
    category: "Next.js",
    publishedAt: "2024-01-05",
    readingTime: 10,
    viewCount: 756,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
  }
]

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Particle Background */}
      <ParticleBackground variant="particles" />

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
              <TerminalComponent>
                <TerminalCommand command="cat developer.js" />
                <CodeBlock language="javascript" code={codeExample} />
                <TerminalCommand command="npm run build" />
                <div className="text-green-400 font-mono text-sm">
                  ✓ Build completed successfully
                </div>
                <TerminalCommand command="git status" />
                <div className="text-blue-400 font-mono text-sm">
                  On branch main<br />
                  Your branch is up to date with 'origin/main'
                </div>
              </TerminalComponent>
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
                <Link href={`/posts/${post.id}`}>
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
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
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

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4 font-mono text-sm">
              <Code className="w-4 h-4 text-green-400" />
              <span className="text-gray-500">skills.map(skill ={">"} skill.level)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-purple-400">techStack</span>{" "}
              <span className="text-yellow-400">=</span>{" "}
              <span className="text-yellow-400">{"["}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-gray-500">{`/* 现代前端技术栈和工具链 */`}</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
              { name: "TypeScript", level: 90, color: "from-blue-500 to-blue-700" },
              { name: "Next.js", level: 88, color: "from-gray-400 to-gray-600" },
              { name: "Vue.js", level: 85, color: "from-green-400 to-green-600" },
              { name: "Three.js", level: 75, color: "from-green-400 to-green-600" },
              { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-cyan-600" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-enhanced rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
              <Github className="w-4 h-4 text-purple-400" />
              <span className="text-gray-500">projects.filter(p ={">"} p.featured)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-purple-400">projects</span>{" "}
              <span className="text-yellow-400">=</span>{" "}
              <span className="text-green-300">await</span>{" "}
              <span className="text-orange-400">getPortfolio</span>
              <span className="text-yellow-400">()</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              <span className="text-gray-500">{`/* 开源项目和技术实践展示 */`}</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "React Component Library",
                description: "一套现代化的 React 组件库，包含丰富的 UI 组件和主题系统。",
                tech: ["React", "TypeScript", "Storybook"],
                github: "https://github.com/example/react-components",
                demo: "https://components.example.com",
                stars: 1200,
              },
              {
                id: "2",
                title: "Next.js Blog Platform",
                description: "基于 Next.js 和 Supabase 构建的现代博客平台，支持 Markdown 和实时评论。",
                tech: ["Next.js", "Supabase", "Tailwind CSS"],
                github: "https://github.com/example/nextjs-blog",
                demo: "https://blog.example.com",
                stars: 856,
              },
              {
                id: "3",
                title: "Vue 3 Admin Dashboard",
                description: "使用 Vue 3 和 TypeScript 开发的管理后台模板，包含完整的权限系统。",
                tech: ["Vue 3", "TypeScript", "Element Plus"],
                github: "https://github.com/example/vue-admin",
                demo: "https://admin.example.com",
                stars: 642,
              }
            ].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="card-enhanced rounded-lg p-6 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1 flex-1 mr-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500 flex-shrink-0">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-mono">{project.stars}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 mt-auto">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        代码
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        演示
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="card-enhanced rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                一起探索前端的未来
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                关注最新技术动态，分享开发经验，共同成长。
                订阅我的博客，获取第一手的技术资讯和深度教程。
              </p>
              <Button size="lg" className="group">
                开始阅读
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
