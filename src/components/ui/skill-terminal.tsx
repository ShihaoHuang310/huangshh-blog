"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Typewriter, TerminalCommand } from "./terminal"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillTerminalProps {
  skills: Skill[]
  className?: string
}

export function SkillTerminal({ skills, className }: SkillTerminalProps) {
  const [currentCommand, setCurrentCommand] = React.useState(0)
  const [showSkills, setShowSkills] = React.useState(false)

  const commands = [
    {
      command: "cat skills.json",
      delay: 1000,
      action: () => setShowSkills(true)
    },
    {
      command: "grep -i 'level.*[8-9]' skills.json",
      delay: 3000,
      action: () => {}
    }
  ]

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentCommand < commands.length) {
        commands[currentCommand].action()
        setCurrentCommand(currentCommand + 1)
      }
    }, commands[currentCommand]?.delay || 1000)

    return () => clearTimeout(timer)
  }, [currentCommand])

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getProgressBar = (level: number) => {
    const filled = Math.floor(level / 10)
    const empty = 10 - filled
    return "█".repeat(filled) + "░".repeat(empty)
  }

  const getLevelColor = (level: number) => {
    if (level >= 90) return "text-green-400"
    if (level >= 70) return "text-blue-400"
    if (level >= 50) return "text-yellow-400"
    return "text-gray-400"
  }

  return (
    <Terminal title="skills.sh" className={className}>
      <div className="space-y-4">
        {/* Command execution */}
        <TerminalCommand
          command="cat skills.json"
          delay={0}
        />

        {/* Skills display */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="text-green-400 text-sm">
                <Typewriter 
                  text='{'
                  speed={100}
                />
              </div>

              {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + categoryIndex * 0.3 }}
                  className="ml-4"
                >
                  <div className="text-blue-400 text-sm mb-2">
                    "{category}": [
                  </div>
                  
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + categoryIndex * 0.3 + skillIndex * 0.1 }}
                      className="ml-4 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                          "{skill.name}":
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-mono ${getLevelColor(skill.level)}`}>
                            {skill.level}%
                          </span>
                          <span className={`font-mono text-xs ${getLevelColor(skill.level)}`}>
                            {getProgressBar(skill.level)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="text-blue-400 text-sm mt-2">
                    ]{categoryIndex < Object.keys(groupedSkills).length - 1 ? ',' : ''}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-green-400 text-sm"
              >
                }
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional commands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <TerminalCommand
            prompt="dev@localhost:~$"
            command="echo 'Always learning, always growing 🚀'"
            output={["Always learning, always growing 🚀"]}
            delay={3500}
          />
        </motion.div>
      </div>
    </Terminal>
  )
}

interface CodeStatsProps {
  stats: Array<{
    label: string
    value: string
    command: string
  }>
  className?: string
}

export function CodeStats({ stats, className }: CodeStatsProps) {
  return (
    <Terminal title="stats.sh" className={className}>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5 }}
          >
            <TerminalCommand
              command={stat.command}
              output={[`${stat.label}: ${stat.value}`]}
              delay={index * 500}
            />
          </motion.div>
        ))}
      </div>
    </Terminal>
  )
}

interface LiveCodingProps {
  code: string
  language?: string
  className?: string
}

export function LiveCoding({ code, language = "javascript", className }: LiveCodingProps) {
  const [displayedCode, setDisplayedCode] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(code.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50 + Math.random() * 50) // Variable typing speed

      return () => clearTimeout(timer)
    }
  }, [currentIndex, code])

  return (
    <Terminal title={`${language}.${language === 'javascript' ? 'js' : language}`} className={className}>
      <div className="font-mono text-sm">
        <pre className="whitespace-pre-wrap">
          <code className="text-gray-300">
            {displayedCode}
            {currentIndex < code.length && (
              <span className="bg-green-400 text-black animate-pulse">█</span>
            )}
          </code>
        </pre>
      </div>
    </Terminal>
  )
}
