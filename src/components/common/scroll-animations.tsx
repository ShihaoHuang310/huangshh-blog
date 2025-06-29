"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

// 滚动进度条
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

// 视差滚动容器
interface ParallaxProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function Parallax({ children, offset = 50, className }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

// 滚动触发的淡入动画
interface FadeInScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function FadeInScroll({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "left":
        return { x: 50, opacity: 0 }
      case "right":
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const x = useTransform(scrollYProgress, [0, 1], [50, 0])

  const getAnimatedStyle = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity, y }
      case "left":
      case "right":
        return { opacity, x }
      default:
        return { opacity, y }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialTransform()}
        style={getAnimatedStyle()}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 滚动计数器动画
interface CountUpProps {
  end: number
  duration?: number
  className?: string
}

export function CountUp({ end, duration = 2, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const count = useTransform(scrollYProgress, [0, 1], [0, end])
  const rounded = useTransform(count, (latest) => Math.round(latest))

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  )
}

// 滚动缩放动画
interface ScaleInScrollProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

export function ScaleInScroll({
  children,
  className,
  scale = 0.8,
}: ScaleInScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const scaleValue = useTransform(scrollYProgress, [0, 1], [scale, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale: scaleValue, opacity }}>{children}</motion.div>
    </div>
  )
}

// 滚动旋转动画
interface RotateInScrollProps {
  children: React.ReactNode
  className?: string
  rotation?: number
}

export function RotateInScroll({
  children,
  className,
  rotation = 180,
}: RotateInScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [rotation, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate, opacity }}>{children}</motion.div>
    </div>
  )
}

// 滚动文字打字机效果
interface TypewriterScrollProps {
  text: string
  className?: string
  delay?: number
}

export function TypewriterScroll({
  text,
  className,
  delay = 0,
}: TypewriterScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = React.useState("")
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  })

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0) {
        const length = Math.floor(latest * text.length)
        setDisplayText(text.slice(0, length))
      }
    })

    return unsubscribe
  }, [scrollYProgress, text])

  return (
    <div ref={ref} className={cn("font-mono", className)}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 bg-current ml-1"
      />
    </div>
  )
}
