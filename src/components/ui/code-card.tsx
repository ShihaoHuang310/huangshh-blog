"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, ExternalLink, Github, Play, ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeCardProps {
  title: string
  description: string
  code?: string
  language?: string
  demo?: string
  github?: string
  className?: string
  variant?: "default" | "terminal" | "editor"
  collapsible?: boolean
  defaultCollapsed?: boolean
  maxHeight?: number
}

export function CodeCard({
  title,
  description,
  code,
  language = "javascript",
  demo,
  github,
  className,
  variant = "default",
  collapsible = true,
  defaultCollapsed = false,
  maxHeight = 300
}: CodeCardProps) {
  const [copied, setCopied] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 简单的语法高亮函数
  const highlightCode = (code: string, language: string) => {
    const keywords = {
      javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'async', 'await', 'try', 'catch'],
      typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'async', 'await', 'try', 'catch', 'interface', 'type', 'enum'],
      react: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'async', 'await', 'useState', 'useEffect', 'useCallback', 'useMemo'],
      css: ['color', 'background', 'margin', 'padding', 'border', 'width', 'height', 'display', 'flex', 'grid']
    }

    let highlightedCode = code
    const langKeywords = keywords[language as keyof typeof keywords] || keywords.javascript

    // 高亮关键字
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g')
      highlightedCode = highlightedCode.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`)
    })

    // 高亮字符串
    highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
    highlightedCode = highlightedCode.replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
    highlightedCode = highlightedCode.replace(/`([^`]*)`/g, '<span class="text-green-400">`$1`</span>')

    // 高亮注释
    highlightedCode = highlightedCode.replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
    highlightedCode = highlightedCode.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500">$&</span>')

    // 高亮数字
    highlightedCode = highlightedCode.replace(/\b\d+\b/g, '<span class="text-orange-400">$&</span>')

    return highlightedCode
  }

  const cardVariants = {
    default: "bg-card border border-border",
    terminal: "bg-gradient-to-br from-gray-900 to-black border border-gray-700",
    editor: "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600"
  }

  return (
    <motion.div
      className={cn(
        "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative",
        cardVariants[variant],
        isFullscreen && "fixed inset-4 z-50 max-w-none max-h-none",
        className
      )}
      whileHover={!isFullscreen ? { y: -5 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      layout
    >
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b flex items-center justify-between",
        variant === "terminal" ? "bg-gray-800 border-gray-700" : "border-border"
      )}>
        <div className="flex items-center space-x-2">
          {variant === "terminal" && (
            <>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </>
          )}
          <h3 className={cn(
            "font-semibold",
            variant === "terminal" ? "text-gray-300 font-mono" :
            variant === "editor" ? "text-gray-100 font-mono" :
            "text-foreground font-mono"
          )}>
            {title}
          </h3>
          <span className={cn(
            "text-xs px-2 py-1 rounded font-mono",
            variant === "terminal" ? "bg-gray-700 text-gray-400" :
            variant === "editor" ? "bg-gray-700 text-gray-300" :
            "bg-muted text-muted-foreground"
          )}>
            {language}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {collapsible && code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          )}
          {code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 p-0"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
          {code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
          {demo && (
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <a href={demo} target="_blank" rel="noopener noreferrer">
                <Play className="h-4 w-4" />
              </a>
            </Button>
          )}
          {github && (
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-4", isFullscreen && "flex-1 overflow-hidden")}>
        <p className={cn(
          "text-sm mb-4",
          variant === "terminal" ? "text-gray-400" : "text-muted-foreground"
        )}>
          {description}
        </p>

        <AnimatePresence>
          {code && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                maxHeight: isFullscreen ? "none" : maxHeight
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "rounded-md p-4 font-mono text-sm relative border code-scrollbar",
                  variant === "terminal"
                    ? "bg-black text-green-400 border-green-800"
                    : variant === "editor"
                    ? "bg-gray-900 text-gray-100 border-gray-700"
                    : "bg-muted text-foreground border-border",
                  isFullscreen ? "h-full overflow-auto" : "overflow-auto",
                  !isFullscreen && `max-h-[${maxHeight}px]`
                )}
                style={!isFullscreen ? { maxHeight: `${maxHeight}px` } : {}}
              >
                {/* Line numbers */}
                <div className="flex">
                  <div className={cn(
                    "select-none pr-4 text-right border-r mr-4",
                    variant === "terminal" ? "text-green-600 border-green-800" : "text-muted-foreground border-border"
                  )}>
                    {code.split('\n').map((_, index) => (
                      <div key={index} className="leading-6">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <pre className="whitespace-pre leading-6">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: highlightCode(code, language)
                        }}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {code && isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "rounded-md p-3 font-mono text-sm border-2 border-dashed cursor-pointer",
              variant === "terminal" ? "border-gray-600 text-gray-500" : "border-border text-muted-foreground"
            )}
            onClick={() => setIsCollapsed(false)}
          >
            <div className="flex items-center justify-center space-x-2">
              <ChevronDown className="w-4 h-4" />
              <span>Click to expand code ({code.split('\n').length} lines)</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}

      {/* Copy notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg z-10"
          >
            ✓ Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  image?: string
  demo?: string
  github?: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  tech,
  image,
  demo,
  github,
  className
}: ProjectCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col",
        className
      )}
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      {image && (
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-white font-mono text-lg line-clamp-1">
              {title}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1" title={title}>{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1" title={description}>{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-mono"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-auto">
          {demo && (
            <Button size="sm" asChild>
              <a href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
          {github && (
            <Button variant="outline" size="sm" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface SkillBadgeProps {
  skill: string
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  className?: string
}

export function SkillBadge({ skill, level = "intermediate", className }: SkillBadgeProps) {
  const levelColors = {
    beginner: "bg-green-500/10 text-green-500 border-green-500/20",
    intermediate: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    advanced: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    expert: "bg-orange-500/10 text-orange-500 border-orange-500/20"
  }

  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-mono border",
        levelColors[level],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {skill}
    </motion.span>
  )
}
