import * as React from "react"
import { Metadata } from "next"
import { RssClient } from "./rss-client"

export const metadata: Metadata = {
  title: "rss.subscribe() | RSS 订阅",
  description: "订阅 RSS 源，获取最新的技术文章和更新。",
}

export default function RssPage() {
  return <RssClient />
}
