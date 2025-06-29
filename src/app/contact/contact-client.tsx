"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Terminal, Mail, Github, Twitter, Linkedin, MapPin, Clock, Coffee, Code, Send, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactClient() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单提交逻辑
    console.log('Form submitted:', formData)
  }

  const contactMethods = [
    {
      id: "email",
      label: "Email",
      value: "developer@example.com",
      icon: Mail,
      color: "text-red-400",
      command: "echo 'developer@example.com' | mail",
      description: "最佳联系方式，通常24小时内回复"
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/developer",
      icon: Github,
      color: "text-gray-400",
      command: "git clone https://github.com/developer",
      description: "查看我的开源项目和代码"
    },
    {
      id: "twitter",
      label: "Twitter",
      value: "@developer",
      icon: Twitter,
      color: "text-blue-400",
      command: "curl -X GET 'https://twitter.com/developer'",
      description: "技术分享和日常动态"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/developer",
      icon: Linkedin,
      color: "text-blue-600",
      command: "wget https://linkedin.com/in/developer",
      description: "专业背景和工作经历"
    }
  ]

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
              <div className="text-sm font-mono text-gray-400">contact.info()</div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500">developer@localhost:~$</span>
                <span className="text-green-400">whoami && pwd</span>
              </div>
              
              <div className="ml-6 space-y-2 text-sm">
                <div className="text-blue-400">Frontend Developer</div>
                <div className="text-gray-300">/home/developer/contact</div>
                <div className="text-gray-500"># 欢迎联系我讨论技术问题或合作机会</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm font-mono text-gray-400">contact_methods.json</div>
                <div className="w-16"></div>
              </div>
              
              {/* Contact Methods */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-gray-500 font-mono">developer@localhost:~$</span>
                  <span className="text-green-400 font-mono">cat contact_methods.json</span>
                </div>
                
                <div className="ml-6 space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-800 rounded border border-gray-600 p-4 hover:border-blue-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <method.icon className={`w-5 h-5 ${method.color}`} />
                          <div>
                            <div className="font-mono text-white">{method.label}</div>
                            <div className="text-xs font-mono text-gray-400">{method.command}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(method.value, method.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {copied === method.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="mb-2">
                        <code className="text-blue-400 bg-gray-900 px-2 py-1 rounded text-sm">
                          {method.value}
                        </code>
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        {method.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Info */}
            <motion.div
              className="mt-6 bg-gray-900 rounded-lg border border-gray-700 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-500 font-mono">developer@localhost:~$</span>
                <span className="text-green-400 font-mono">status --verbose</span>
              </div>
              
              <div className="ml-6 space-y-3 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Status: </span>
                  <span className="text-green-400">Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Location: </span>
                  <span className="text-blue-400">Beijing, China</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Timezone: </span>
                  <span className="text-yellow-400">UTC+8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">Coffee Level: </span>
                  <span className="text-orange-400">High ☕</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Currently: </span>
                  <span className="text-purple-400">Coding</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm font-mono text-gray-400">send_message.sh</div>
                <div className="w-16"></div>
              </div>
              
              {/* Contact Form */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-gray-500 font-mono">developer@localhost:~$</span>
                  <span className="text-green-400 font-mono">./send_message.sh</span>
                </div>
                
                <form onSubmit={handleSubmit} className="ml-6 space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      # Your name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="echo 'Your Name'"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      # Email address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="your.email@domain.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      # Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Brief description of your message"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      # Message content
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="cat << EOF
Your message here...
Feel free to discuss:
- Technical questions
- Collaboration opportunities  
- Project ideas
- Code reviews
EOF"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    ./send_message.sh --execute
                  </Button>
                </form>
                
                <div className="mt-6 ml-6 p-3 bg-gray-800 rounded border border-gray-600">
                  <div className="text-xs font-mono text-gray-400">
                    <div className="text-green-400 mb-1"># Response time:</div>
                    <div>• Email: Usually within 24 hours</div>
                    <div>• Complex questions: 2-3 days</div>
                    <div>• Collaboration: 1 week for detailed discussion</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
