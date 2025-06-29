import * as React from "react"
import { Metadata } from "next"
import { TagsClient } from "./tags-client"
import { TagAPI } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "tags.all() | 标签云",
  description: "探索所有文章标签，发现更多有趣的技术内容。",
}

export default async function TagsPage() {
  try {
    // 优化：使用快速版本，避免慢查询
    const tags = await TagAPI.getAllTagsFast()

    return <TagsClient tags={tags} />
  } catch (error) {
    console.error('获取标签数据失败:', error)

    // 如果数据库连接失败，显示错误信息
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">tags.all() 加载失败</h1>
          <p className="text-gray-400">请检查数据库连接或稍后重试</p>
        </div>
      </div>
    )
  }
}
