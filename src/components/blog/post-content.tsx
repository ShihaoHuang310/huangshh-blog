"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { components } from "@/components/mdx/mdx-components"

interface PostContentProps {
  content: MDXRemoteSerializeResult
  className?: string
}

export function PostContent({ content, className }: PostContentProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <MDXRemote {...content} components={components} />
      </div>
    </motion.div>
  )
}
