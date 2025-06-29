import * as React from "react"
import { Metadata } from "next"
import { CategoriesClient } from "./categories-client"
import { Category } from "@/types/blog"

// 模拟数据
const mockCategories: (Category & { postCount: number })[] = [
  {
    id: "1",
    name: "React",
    slug: "react",
    description: "React 相关技术文章，包括 Hooks、组件设计、状态管理等内容。",
    color: "#61DAFB",
    postCount: 12,
  },
  {
    id: "2",
    name: "Next.js",
    slug: "nextjs",
    description: "Next.js 框架相关内容，涵盖 SSR、SSG、API Routes 等特性。",
    color: "#000000",
    postCount: 8,
  },
  {
    id: "3",
    name: "TypeScript",
    slug: "typescript",
    description: "TypeScript 类型系统和最佳实践，提升代码质量和开发效率。",
    color: "#3178C6",
    postCount: 10,
  },
  {
    id: "4",
    name: "CSS",
    slug: "css",
    description: "CSS 样式和布局技巧，包括 Flexbox、Grid、动画等现代 CSS 特性。",
    color: "#1572B6",
    postCount: 15,
  },
  {
    id: "5",
    name: "JavaScript",
    slug: "javascript",
    description: "JavaScript 语言特性和技巧，ES6+ 新特性，异步编程等。",
    color: "#F7DF1E",
    postCount: 18,
  },
  {
    id: "6",
    name: "性能优化",
    slug: "performance",
    description: "Web 性能优化相关技术，包括加载优化、渲染优化、代码分割等。",
    color: "#FF6B6B",
    postCount: 6,
  },
  {
    id: "7",
    name: "工具链",
    slug: "tooling",
    description: "开发工具和构建工具，包括 Webpack、Vite、ESLint 等。",
    color: "#4ECDC4",
    postCount: 9,
  },
  {
    id: "8",
    name: "设计",
    slug: "design",
    description: "UI/UX 设计相关内容，设计系统、用户体验、界面设计等。",
    color: "#FF8A80",
    postCount: 5,
  },
]

export const metadata: Metadata = {
  title: "文章分类",
  description: "浏览所有文章分类，找到你感兴趣的技术主题。",
}

export default function CategoriesPage() {
  return <CategoriesClient categories={mockCategories} />
}
