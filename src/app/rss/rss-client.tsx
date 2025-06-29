"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Rss, Copy, Check, Download, ExternalLink, Terminal, Code, Zap, Bell, Wifi, Radio, Antenna } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RssClient() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const [baseUrl, setBaseUrl] = React.useState('')

  React.useEffect(() => {
    setMounted(true)
    setBaseUrl(window.location.origin)
  }, [])

  const rssFeeds = [
    {
      id: "main",
      title: "main.rss",
      url: `${baseUrl}/rss.xml`,
      description: "所有最新发布的技术文章和更新",
      icon: Rss,
      color: "text-orange-400",
      command: "curl -s https://blog.dev/rss.xml",
      size: "2.4KB",
      lastUpdate: "2024-12-29"
    },
    {
      id: "frontend",
      title: "frontend.rss",
      url: `${baseUrl}/rss/frontend.xml`,
      description: "前端技术、框架和最佳实践",
      icon: Code,
      color: "text-blue-400",
      command: "wget https://blog.dev/rss/frontend.xml",
      size: "1.8KB",
      lastUpdate: "2024-12-28"
    },
    {
      id: "tutorials",
      title: "tutorials.rss",
      url: `${baseUrl}/rss/tutorials.xml`,
      description: "详细的技术教程和实战指南",
      icon: Zap,
      color: "text-green-400",
      command: "fetch('https://blog.dev/rss/tutorials.xml')",
      size: "3.1KB",
      lastUpdate: "2024-12-27"
    },
    {
      id: "projects",
      title: "projects.rss",
      url: `${baseUrl}/rss/projects.xml`,
      description: "开源项目和代码示例更新",
      icon: Terminal,
      color: "text-purple-400",
      command: "rsync -av https://blog.dev/rss/projects.xml",
      size: "1.2KB",
      lastUpdate: "2024-12-26"
    }
  ]

  // 避免水合错误
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-2xl font-mono text-gray-400">Loading RSS feeds...</div>
          </div>
        </div>
      </div>
    )
  }

  const rssReaders = [
    { name: "Feedly", url: "https://feedly.com", icon: "🟢" },
    { name: "Inoreader", url: "https://inoreader.com", icon: "🔵" },
    { name: "NewsBlur", url: "https://newsblur.com", icon: "🟡" },
    { name: "The Old Reader", url: "https://theoldreader.com", icon: "🟠" },
    { name: "Feedbin", url: "https://feedbin.com", icon: "🔴" },
    { name: "NetNewsWire", url: "https://netnewswire.com", icon: "⚪" }
  ]

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-400">rss.subscribe()</div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">ls -la rss/</span>
              </div>
              
              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">
                  total {rssFeeds.length} feeds available
                </div>
                <div className="text-gray-300">
                  <span className="text-green-400">-rw-r--r--</span> 
                  <span className="ml-2">rss/</span>
                  <span className="ml-8 text-gray-500">RSS feed directory</span>
                </div>
                {rssFeeds.map((feed) => (
                  <div key={feed.id} className="text-gray-300">
                    <span className="text-blue-400">-rw-r--r--</span>
                    <span className="ml-2 text-orange-400">{feed.title}</span>
                    <span className="ml-4 text-gray-500">{feed.size}</span>
                    <span className="ml-4 text-gray-500">{feed.lastUpdate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RSS Feeds */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {rssFeeds.map((feed, index) => (
              <motion.div
                key={feed.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-200"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-400">{feed.title}</div>
                  <div className="flex items-center space-x-1">
                    <Wifi className="w-3 h-3 text-green-400" />
                    <div className="text-xs text-green-400">live</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded bg-gray-800 border border-gray-600 ${feed.color}`}
                      >
                        <feed.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold font-mono text-white">
                          {feed.title}
                        </h3>
                        <div className="text-xs font-mono text-gray-500">
                          {feed.size} • {feed.lastUpdate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Radio className="w-4 h-4 text-orange-400" />
                      <Antenna className="w-4 h-4 text-orange-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded p-3 border border-gray-600 mb-4">
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      <span className="text-green-400">$</span> cat description.txt
                    </div>
                    <p className="text-sm text-gray-300 font-mono">
                      {feed.description}
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded p-3 border border-gray-600 mb-4">
                    <div className="text-xs font-mono text-gray-400 mb-2">
                      <span className="text-green-400">$</span> {feed.command}
                    </div>
                    <div className="text-xs font-mono text-blue-400 break-all bg-gray-900 p-2 rounded border border-gray-700">
                      {feed.url}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(feed.url, feed.id)}
                      className="flex-1 bg-gray-800 border-gray-600 text-white hover:bg-gray-700 font-mono"
                    >
                      {copied === feed.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-400" />
                          copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          copy url
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    >
                      <a href={feed.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RSS Readers Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-400">recommended_readers.json</div>
              <div className="w-16"></div>
            </div>

            {/* RSS Readers */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500 font-mono">developer@localhost:~$</span>
                <span className="text-green-400 font-mono">cat recommended_readers.json</span>
              </div>

              <div className="ml-6">
                <div className="text-sm font-mono text-gray-400 mb-4">
                  # Popular RSS readers to subscribe with
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {rssReaders.map((reader, index) => (
                    <motion.div
                      key={reader.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <a
                        href={reader.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500/50 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{reader.icon}</div>
                          <div className="flex-1">
                            <div className="font-mono text-white group-hover:text-blue-400 transition-colors">
                              {reader.name}
                            </div>
                            <div className="text-xs font-mono text-gray-500">
                              {reader.url.replace('https://', '')}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-600">
                  <div className="text-sm font-mono text-gray-400 mb-2">
                    <span className="text-green-400"># Usage:</span>
                  </div>
                  <div className="text-sm font-mono text-gray-300 space-y-1">
                    <div>1. Copy any RSS feed URL above</div>
                    <div>2. Open your preferred RSS reader</div>
                    <div>3. Add new feed/subscription</div>
                    <div>4. Paste the URL and subscribe</div>
                    <div className="text-yellow-400 mt-2"># Enjoy automated content updates! 🚀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
