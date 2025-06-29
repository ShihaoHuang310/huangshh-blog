"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function Terminal({ children, className, title = "terminal" }: TerminalProps) {
  return (
    <div className={cn(
      "bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-700",
      className
    )}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">{title}</div>
        <div className="w-16"></div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ 
  text, 
  delay = 0, 
  speed = 50, 
  className,
  onComplete 
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [showCursor, setShowCursor] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      } else {
        onComplete?.()
      }
    }, currentIndex === 0 ? delay : speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed, onComplete])

  React.useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="inline-block w-2 h-5 bg-green-400 ml-1 animate-pulse" />
      )}
    </span>
  )
}

interface TerminalCommandProps {
  prompt?: string
  command: string
  output?: string[]
  delay?: number
  className?: string
}

export function TerminalCommand({ 
  prompt = "user@dev:~$", 
  command, 
  output = [], 
  delay = 0,
  className 
}: TerminalCommandProps) {
  const [showCommand, setShowCommand] = React.useState(false)
  const [showOutput, setShowOutput] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowCommand(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleCommandComplete = () => {
    setTimeout(() => {
      setShowOutput(true)
    }, 500)
  }

  return (
    <div className={className}>
      {/* Command Line */}
      <div className="flex items-center">
        <span className="text-yellow-400 mr-2">{prompt}</span>
        {showCommand && (
          <Typewriter 
            text={command}
            speed={100}
            className="text-green-400"
            onComplete={handleCommandComplete}
          />
        )}
      </div>
      
      {/* Output */}
      <AnimatePresence>
        {showOutput && output.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300"
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ 
  code, 
  language = "javascript", 
  className,
  showLineNumbers = true 
}: CodeBlockProps) {
  const lines = code.split('\n')

  return (
    <div className={cn(
      "bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-xs uppercase tracking-wide">
          {language}
        </span>
        <button className="text-gray-400 hover:text-white text-xs">
          Copy
        </button>
      </div>
      
      <pre className="text-sm">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="text-gray-500 mr-4 select-none w-8 text-right">
                {index + 1}
              </span>
            )}
            <code className="text-gray-300 flex-1">
              {line || ' '}
            </code>
          </div>
        ))}
      </pre>
    </div>
  )
}
