"use client"

import { MDXProvider } from "@mdx-js/react"
import { components } from "./mdx-components"

interface MDXContentProviderProps {
  children: React.ReactNode
}

export function MDXContentProvider({ children }: MDXContentProviderProps) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
