"use client"

import * as React from "react"
import { motion } from "framer-motion"

// 代码符号数组
const codeSymbols = [
  '{ }', '< />', '( )', '[ ]', '=>', '&&', '||', '++', '--', '===', '!==',
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'import', 'export', 'class', 'extends', 'async', 'await', 'try', 'catch'
]

// 矩阵雨字符
const matrixChars = [
  '0', '1', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ'
]

interface FloatingCodeProps {
  symbol: string
  delay: number
  duration: number
  x: number
  y: number
}

function FloatingCode({ symbol, delay, duration, x, y }: FloatingCodeProps) {
  return (
    <motion.div
      className="absolute text-blue-400/20 font-mono text-sm pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [-20, -100],
        x: [0, (x % 3) * 10 - 5], // 使用固定的偏移值
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {symbol}
    </motion.div>
  )
}

interface MatrixRainProps {
  char: string
  delay: number
  x: number
}

function MatrixRain({ char, delay, x }: MatrixRainProps) {
  return (
    <motion.div
      className="absolute text-green-400/10 font-mono text-xs pointer-events-none select-none"
      style={{ left: `${x}%`, top: '-10px' }}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 800, // 使用固定值避免 window 对象
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3 + (x % 3), // 使用固定的持续时间
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {char}
    </motion.div>
  )
}

export function BackgroundEffects() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // 延迟挂载以避免水合错误
    const timer = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 简化的浮动代码符号 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingCode
          key={`code-${i}`}
          symbol={codeSymbols[i % codeSymbols.length]}
          delay={i * 2}
          duration={20}
          x={(i * 12) % 100}
          y={(i * 15) % 100}
        />
      ))}

      {/* 简化的矩阵雨效果 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <MatrixRain
          key={`matrix-${i}`}
          char={matrixChars[i % matrixChars.length]}
          delay={i * 0.5}
          x={i * 10}
        />
      ))}

      {/* 网格线动画 */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`grid-h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
            style={{ top: `${20 + i * 20}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`grid-v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
            style={{ left: `${20 + i * 20}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 脉冲圆圈 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border border-blue-500/20"
          style={{
            left: `${30 + i * 20}%`,
            top: `${30 + i * 15}%`,
            width: '100px',
            height: '100px',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 6,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
