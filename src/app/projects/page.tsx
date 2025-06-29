import * as React from "react"
import { Metadata } from "next"
import { ProjectsClient } from "./projects-client"
import { ProjectAPI, CodeExampleAPI } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "项目展示",
  description: "探索我的开源项目和创意作品，包含前端应用、组件库和实验性项目。",
}

// 将数据库数据转换为组件所需格式的辅助函数
function projectToClientFormat(project: any) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    tech: project.tech,
    demo: project.demo_url,
    github: project.github_url,
    featured: project.featured,
  }
}

function codeExampleToClientFormat(example: any) {
  return {
    title: example.title,
    description: example.description,
    language: example.language,
    code: example.code,
  }
}

export default async function ProjectsPage() {
  try {
    // 从数据库获取数据
    const [dbProjects, dbCodeExamples] = await Promise.all([
      ProjectAPI.getAllProjects(),
      CodeExampleAPI.getAllCodeExamples()
    ])

    // 转换数据格式
    const projects = dbProjects.map(projectToClientFormat)
    const codeExamples = dbCodeExamples.map(codeExampleToClientFormat)

    return <ProjectsClient projects={projects} codeExamples={codeExamples} />
  } catch (error) {
    console.error('获取项目数据失败:', error)

    // 如果数据库连接失败，显示错误信息
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">数据加载失败</h1>
          <p className="text-gray-400">请检查数据库连接或稍后重试</p>
        </div>
      </div>
    )
  }
}
