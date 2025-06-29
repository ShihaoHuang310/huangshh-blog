import * as React from "react"
import { Metadata } from "next"
import { CategoriesClient } from "./categories-client"
import { CategoryAPI } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "categories.list() | 分类列表",
  description: "浏览所有文章分类，探索程序员的技术世界。",
}

export default async function CategoriesPage() {
  try {
    // 优化：使用快速版本，避免慢查询
    const categories = await CategoryAPI.getAllCategoriesFast()

    return <CategoriesClient categories={categories} />
  } catch (error) {
    console.error('获取分类数据失败:', error)

    // 如果数据库连接失败，显示错误信息
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">categories.list() 加载失败</h1>
          <p className="text-gray-400">请检查数据库连接或稍后重试</p>
        </div>
      </div>
    )
  }
}

