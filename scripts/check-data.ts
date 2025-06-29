#!/usr/bin/env tsx

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// 加载环境变量
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少必要的环境变量')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkData() {
  console.log('🔍 检查数据库中的实际数据...\n')

  // 检查项目数据
  console.log('📋 Projects 数据:')
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order')
  
  console.log(`总数: ${projects?.length || 0}`)
  projects?.forEach((project, index) => {
    console.log(`${index + 1}. ${project.title} (featured: ${project.featured})`)
  })

  // 检查代码示例数据
  console.log('\n💻 Code Examples 数据:')
  const { data: codeExamples } = await supabase
    .from('code_examples')
    .select('*')
    .order('sort_order')
  
  console.log(`总数: ${codeExamples?.length || 0}`)
  codeExamples?.forEach((example, index) => {
    console.log(`${index + 1}. ${example.title} (${example.language})`)
  })

  // 检查技能数据
  console.log('\n🛠️ Skills 数据:')
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
  
  console.log(`总数: ${skills?.length || 0}`)
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, any[]>)

  Object.entries(skillsByCategory || {}).forEach(([category, categorySkills]) => {
    console.log(`\n${category}:`)
    categorySkills.forEach((skill, index) => {
      console.log(`  ${index + 1}. ${skill.name} (${skill.level}%)`)
    })
  })

  // 检查时间线数据
  console.log('\n📅 Timeline 数据:')
  const { data: timeline } = await supabase
    .from('timeline')
    .select('*')
    .order('sort_order')
  
  console.log(`总数: ${timeline?.length || 0}`)
  timeline?.forEach((item, index) => {
    console.log(`${index + 1}. ${item.year} - ${item.title} @ ${item.company}`)
  })

  // 检查统计数据
  console.log('\n📊 Stats 数据:')
  const { data: stats } = await supabase
    .from('stats')
    .select('*')
    .order('sort_order')
  
  console.log(`总数: ${stats?.length || 0}`)
  stats?.forEach((stat, index) => {
    console.log(`${index + 1}. ${stat.label}: ${stat.value}`)
  })

  // 检查个人信息
  console.log('\n👤 Profile 数据:')
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .single()
  
  if (profile) {
    console.log(`姓名: ${profile.name}`)
    console.log(`职位: ${profile.title}`)
    console.log(`位置: ${profile.location}`)
  }
}

// 运行检查
checkData().catch(console.error)
