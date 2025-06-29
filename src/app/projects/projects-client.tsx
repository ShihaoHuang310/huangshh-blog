"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Code, Folder, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard, CodeCard } from "@/components/ui/code-card"
import { ParticleBackground } from "@/components/three/particle-background"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
  featured: boolean
}

interface CodeExample {
  title: string
  description: string
  language: string
  code: string
}

interface ProjectsClientProps {
  projects: Project[]
  codeExamples: CodeExample[]
}

export function ProjectsClient({ projects, codeExamples }: ProjectsClientProps) {
  const [filter, setFilter] = React.useState<"all" | "featured">("all")
  const [activeTab, setActiveTab] = React.useState<"projects" | "code">("projects")
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProjects = filter === "featured"
    ? projects.filter(p => p.featured)
    : projects

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
          <p className="font-mono text-muted-foreground">Loading projects...</p>
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
              <Folder className="w-4 h-4" />
              <span>~/projects</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold font-mono">
              <span className="text-blue-500">const</span>{" "}
              <span className="text-purple-500">projects</span>{" "}
              <span className="text-gray-500">=</span>{" "}
              <span className="text-green-500">[</span>
              <br />
              <span className="text-2xl sm:text-3xl ml-8">
                <span className="text-orange-500">creativity</span>
                <span className="text-gray-500">,</span>{" "}
                <span className="text-green-400">code</span>
                <span className="text-gray-500">,</span>{" "}
                <span className="text-blue-400">innovation</span>
              </span>
              <br />
              <span className="text-green-500">];</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed font-mono max-w-2xl mx-auto">
              // 探索我的开源项目和创意实验
              <br />
              // 每个项目都是学习和创新的结果
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-2 rounded-md font-mono text-sm transition-all duration-200 ${
                  activeTab === "projects"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Folder className="w-4 h-4 inline mr-2" />
                Projects
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-6 py-2 rounded-md font-mono text-sm transition-all duration-200 ${
                  activeTab === "code"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Code
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-12">
            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="flex space-x-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="font-mono"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All ({projects.length})
                </Button>
                <Button
                  variant={filter === "featured" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("featured")}
                  className="font-mono"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Featured ({projects.filter(p => p.featured).length})
                </Button>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    demo={project.demo}
                    github={project.github}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === "code" && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold font-mono mb-4">
                <span className="text-blue-500">function</span>{" "}
                <span className="text-purple-500">showCode</span>
                <span className="text-gray-500">()</span>{" "}
                <span className="text-green-500">{`{`}</span>
              </h2>
              <p className="text-muted-foreground font-mono mb-6">
                // 一些有用的代码片段和实用工具
                <br />
                // 支持语法高亮、代码折叠和全屏查看
              </p>

              {/* Code Features */}
              <div className="flex items-center justify-center space-x-6 text-sm font-mono text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Syntax Highlighting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Collapsible Code</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Fullscreen View</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Copy to Clipboard</span>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {codeExamples.map((example, index) => (
                <motion.div
                  key={example.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <CodeCard
                    title={example.title}
                    description={example.description}
                    code={example.code}
                    language={example.language}
                    variant="editor"
                    collapsible={true}
                    defaultCollapsed={index > 1} // 默认折叠第3个及以后的代码
                    maxHeight={400}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <span className="text-green-500 font-mono text-xl">}</span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
