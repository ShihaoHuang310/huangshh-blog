import * as React from "react"
import { Metadata } from "next"
import { AboutClient } from "./about-client"

export const metadata: Metadata = {
  title: "关于我",
  description: "了解博客作者的技术背景、工作经历和个人兴趣。",
}



export default function AboutPage() {
  return <AboutClient />
}
