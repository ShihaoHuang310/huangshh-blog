import * as React from "react"
import { Metadata } from "next"
import { AboutClient } from "./about-client"
import { ProfileAPI, SkillAPI, TimelineAPI, StatAPI } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "关于我",
  description: "了解博客作者的技术背景、工作经历和个人兴趣。",
}

export default async function AboutPage() {
  try {
    // 从数据库获取数据
    const [profile, skills, timeline, stats] = await Promise.all([
      ProfileAPI.getProfile(),
      SkillAPI.getAllSkills(),
      TimelineAPI.getAllTimeline(),
      StatAPI.getAllStats()
    ])

    return (
      <AboutClient
        profile={profile}
        skills={skills}
        timeline={timeline}
        stats={stats}
      />
    )
  } catch (error) {
    console.error('获取 About 数据失败:', error)

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
