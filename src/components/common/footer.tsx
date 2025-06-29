"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart, Terminal, Code, Coffee, Zap, ArrowUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  blog: [
    { name: "latest_posts()", href: "/posts" },
    { name: "popular_posts()", href: "/posts?sort=popular" },
    { name: "categories.list()", href: "/categories" },
    { name: "tags.all()", href: "/tags" },
  ],
  about: [
    { name: "about_me()", href: "/about" },
    { name: "contact.info()", href: "/contact" },
    { name: "rss.subscribe()", href: "/rss" },
    { name: "sitemap.xml", href: "/sitemap" },
  ],
  legal: [
    { name: "privacy.policy", href: "/privacy" },
    { name: "terms.service", href: "/terms" },
    { name: "copyright.notice", href: "/copyright" },
  ],
}

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github, color: "hover:text-gray-400" },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter, color: "hover:text-blue-400" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, color: "hover:text-blue-600" },
  { name: "Email", href: "mailto:hello@example.com", icon: Mail, color: "hover:text-green-400" },
]

const techStats = [
  { label: "commits", value: "2,847", icon: Code },
  { label: "coffee_cups", value: "∞", icon: Coffee },
  { label: "bug_fixes", value: "1,234", icon: Zap },
  { label: "uptime", value: "99.9%", icon: Terminal },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const [uptime, setUptime] = React.useState<number>(0)

  React.useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    setUptime(Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)))
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gray-800 rounded-t-lg border border-gray-600">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-700 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-mono text-gray-300">
                <span>footer.tsx</span>
                <span className="text-green-400">●</span>
              </div>
            </div>
            <div className="p-6 font-mono text-green-400 bg-black">
              <div className="flex items-center space-x-2 mb-2">
                <Terminal className="w-4 h-4" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="animate-pulse">cat footer.info</span>
              </div>
              <div className="ml-6 space-y-1 text-sm">
                <div><span className="text-blue-400">const</span> <span className="text-purple-400">footer</span> = <span className="text-yellow-400">{`{`}</span></div>
                <div className="ml-4"><span className="text-orange-400">status</span>: <span className="text-green-300">"online"</span>,</div>
                <div className="ml-4"><span className="text-orange-400">uptime</span>: <span className="text-green-300">"{mounted ? uptime : '365'} days"</span>,</div>
                <div className="ml-4"><span className="text-orange-400">last_updated</span>: <span className="text-green-300">"{mounted && currentTime ? currentTime.toLocaleTimeString() : '12:00:00'}"</span></div>
                <div><span className="text-yellow-400">{`}`}</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl font-mono text-white">
                  <span className="text-blue-400">dev</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-purple-400">blog</span>
                </span>
                <div className="text-xs font-mono text-gray-400">v2.0.1</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-mono">
              // Building the future, one component at a time
              <br />
              // Sharing knowledge through code and creativity
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white font-mono flex items-center">
              <Code className="w-4 h-4 mr-2 text-blue-400" />
              blog.navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.blog.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-mono flex items-center group"
                  >
                    <span className="text-green-400 mr-2">></span>
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* About Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white font-mono flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-green-400" />
              user.profile
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm font-mono flex items-center group"
                  >
                    <span className="text-purple-400 mr-2">></span>
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stats */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white font-mono flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              system.stats
            </h3>
            <div className="space-y-3">
              {techStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-2">
                    <stat.icon className="w-3 h-3 text-orange-400" />
                    <span className="text-xs font-mono text-gray-400">{stat.label}</span>
                  </div>
                  <span className="text-xs font-mono text-white font-bold">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Terminal Bottom */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm font-mono">
                <span className="text-gray-400">©</span>
                <span className="text-white">{currentYear}</span>
                <span className="text-blue-400">dev.blog</span>
                <span className="text-gray-400">--</span>
                <span className="text-green-400">All rights reserved</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
                  {footerLinks.legal.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span className="text-gray-400">Built with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </motion.div>
                  <span className="text-gray-400">and</span>
                  <Coffee className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Command Line */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                  <Terminal className="w-3 h-3" />
                  <span>Last build:</span>
                  <span className="text-green-400">{mounted ? new Date().toLocaleDateString() : '--/--/----'}</span>
                  <span>•</span>
                  <span>Status:</span>
                  <span className="text-green-400 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Online
                  </span>
                </div>

                <motion.button
                  onClick={scrollToTop}
                  className="flex items-center space-x-1 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>scroll_to_top()</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </footer>
  )
}
