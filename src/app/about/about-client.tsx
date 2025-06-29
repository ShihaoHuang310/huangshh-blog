"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, Code, Coffee, Heart, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/three/particle-background"
import { SkillTerminal, CodeStats, LiveCoding } from "@/components/ui/skill-terminal"

const skills = [
  { name: "React", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Next.js", level: 88, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "Three.js", level: 75, category: "Frontend" },
  { name: "CSS/SCSS", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 75, category: "Backend" },
  { name: "Supabase", level: 85, category: "Backend" },
  { name: "Git", level: 88, category: "Tools" },
  { name: "Docker", level: 70, category: "Tools" },
  { name: "AWS", level: 65, category: "Tools" },
  { name: "Figma", level: 80, category: "Design" },
]

const codeStats = [
  { label: "Lines of Code Written", value: "100,000+", command: "git log --oneline | wc -l" },
  { label: "GitHub Repositories", value: "50+", command: "gh repo list --limit 100 | wc -l" },
  { label: "Years of Experience", value: "5+", command: "echo $(($(date +%Y) - 2019))" },
  { label: "Coffee Cups", value: "∞", command: "echo 'while(true) { drink(coffee); code(); }'" },
]

const liveCodeExample = `// Welcome to my world of code
const developer = {
  name: "Frontend Developer",
  location: "Beijing, China",
  languages: ["JavaScript", "TypeScript", "Python"],
  frameworks: ["React", "Next.js", "Vue"],

  currentlyLearning: "WebGL & Three.js",

  getMotivation() {
    return "Building the future, one component at a time";
  },

  lifePhilosophy: "Code with passion, learn with curiosity"
};

console.log(developer.getMotivation());
// Output: "Building the future, one component at a time"`

const timeline = [
  {
    year: "2024",
    title: "高级前端工程师",
    company: "科技公司",
    description: "负责大型 React 应用的架构设计和开发，团队技术栈升级。",
  },
  {
    year: "2022",
    title: "前端工程师",
    company: "创业公司",
    description: "从零开始构建产品前端，使用 Next.js 和 TypeScript。",
  },
  {
    year: "2020",
    title: "初级前端开发者",
    company: "互联网公司",
    description: "学习现代前端技术栈，参与多个项目的开发和维护。",
  },
  {
    year: "2019",
    title: "计算机科学学士",
    company: "某大学",
    description: "主修计算机科学，专注于 Web 开发和软件工程。",
  },
]

const stats = [
  { label: "编程经验", value: "5+ 年", icon: Code },
  { label: "博客文章", value: "50+ 篇", icon: Coffee },
  { label: "开源项目", value: "10+ 个", icon: Github },
  { label: "技术分享", value: "20+ 次", icon: Heart },
]

export function AboutClient() {
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground variant="code" interactive />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-muted-foreground">Loading profile...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Particle Background */}
      <ParticleBackground variant="code" interactive />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center space-x-2 text-sm font-mono text-muted-foreground"
              >
                <Terminal className="w-4 h-4" />
                <span>cat /home/developer/about.md</span>
              </motion.div>

              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Developer"
                  fill
                  className="rounded-full object-cover border-2 border-primary/30"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold font-mono">
                <span className="text-blue-500">class</span>{" "}
                <span className="text-purple-500">Developer</span>{" "}
                <span className="text-green-500">{`{`}</span>
                <br />
                <span className="text-2xl sm:text-3xl ml-8">
                  <span className="text-orange-500">passion</span>
                  <span className="text-gray-500">:</span>{" "}
                  <span className="text-green-400">"frontend"</span>
                  <span className="text-gray-500">;</span>
                </span>
                <br />
                <span className="text-green-500">{`}`}</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed font-mono max-w-2xl mx-auto">
                // 热爱技术分享的前端开发者
                <br />
                // 专注于创建美观且功能强大的用户界面
                <br />
                // 永远在学习新技术的路上
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground font-mono">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>Beijing, China</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span>Since 2019</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm" className="font-mono" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="font-mono" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="font-mono" asChild>
                <Link href="mailto:hello@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Code Stats */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <CodeStats stats={codeStats} />
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Live Coding */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-mono mb-2">
                <span className="text-blue-500">function</span>{" "}
                <span className="text-purple-500">aboutMe</span>
                <span className="text-gray-500">()</span>{" "}
                <span className="text-green-500">{`{`}</span>
              </h2>
              <p className="text-muted-foreground font-mono text-sm">
                // 让代码来介绍我自己
              </p>
            </div>
            <LiveCoding code={liveCodeExample} />
            <div className="mt-4">
              <span className="text-green-500 font-mono text-xl">}</span>
            </div>
          </motion.section>

          {/* Skills Terminal */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-mono mb-2">
                <span className="text-blue-500">const</span>{" "}
                <span className="text-purple-500">skills</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-green-500">{`{`}</span>
              </h2>
              <p className="text-muted-foreground font-mono text-sm">
                // 我的技术技能树
              </p>
            </div>
            <SkillTerminal skills={skills} />
            <div className="mt-4">
              <span className="text-green-500 font-mono text-xl">};</span>
            </div>
          </motion.section>
        </div>

        {/* Journey Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-mono mb-4">
              <span className="text-blue-500">git</span>{" "}
              <span className="text-purple-500">log</span>{" "}
              <span className="text-gray-500">--oneline</span>{" "}
              <span className="text-green-500">--graph</span>
            </h2>
            <p className="text-muted-foreground font-mono">
              // 我的编程历程
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-12 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Git-style line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-5 top-8 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                )}

                {/* Commit dot */}
                <div className="absolute left-2 top-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-background">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Commit content */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold font-mono text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-primary font-mono text-sm">{item.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Git-style commit hash */}
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <span className="text-xs font-mono text-muted-foreground">
                      commit {Math.random().toString(36).substr(2, 7)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="text-center bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm rounded-lg p-8 border border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold font-mono mb-4">
            <span className="text-blue-500">function</span>{" "}
            <span className="text-purple-500">connect</span>
            <span className="text-gray-500">()</span>{" "}
            <span className="text-green-500">{`{`}</span>
          </h2>
          <p className="text-muted-foreground font-mono mb-6 max-w-2xl mx-auto">
            // 如果你对技术有热情，想要交流想法
            <br />
            // 或者只是想说声 "Hello World!"
            <br />
            // 随时联系我！
          </p>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button className="font-mono" asChild>
              <Link href="mailto:hello@example.com">
                <Mail className="mr-2 h-4 w-4" />
                sendEmail()
              </Link>
            </Button>
            <Button variant="outline" className="font-mono" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                viewCode()
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <span className="text-green-500 font-mono text-xl">}</span>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
