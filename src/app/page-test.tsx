import * as React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          现代前端开发博客
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          分享最新的前端技术、开发经验和最佳实践
        </p>
        <Link href="/posts" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          浏览文章
        </Link>
      </div>
    </div>
  )
}
