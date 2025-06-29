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

async function verifyDataConsistency() {
  console.log('🔍 验证静态数据与数据库数据的一致性...\n')

  let allConsistent = true

  // 验证项目数据
  console.log('📋 验证 Projects 数据:')
  const { data: dbProjects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order')
  
  console.log(`数据库中的项目数量: ${dbProjects?.length || 0}`)
  console.log('应该显示的项目:')
  dbProjects?.forEach((project, index) => {
    console.log(`${index + 1}. ${project.title} (featured: ${project.featured})`)
  })

  // 验证代码示例数据
  console.log('\n💻 验证 Code Examples 数据:')
  const { data: dbCodeExamples } = await supabase
    .from('code_examples')
    .select('*')
    .order('sort_order')
  
  console.log(`数据库中的代码示例数量: ${dbCodeExamples?.length || 0}`)
  console.log('应该显示的代码示例:')
  dbCodeExamples?.forEach((example, index) => {
    console.log(`${index + 1}. ${example.title} (${example.language})`)
  })

  // 验证技能数据
  console.log('\n🛠️ 验证 Skills 数据:')
  const { data: dbSkills } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })
  
  console.log(`数据库中的技能数量: ${dbSkills?.length || 0}`)
  const skillsByCategory = dbSkills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, any[]>)

  console.log('应该显示的技能分类:')
  Object.entries(skillsByCategory || {}).forEach(([category, categorySkills]) => {
    console.log(`${category}: ${categorySkills.length} 个技能`)
    categorySkills.forEach((skill, index) => {
      console.log(`  ${index + 1}. ${skill.name} (${skill.level}%)`)
    })
  })

  // 验证时间线数据
  console.log('\n📅 验证 Timeline 数据:')
  const { data: dbTimeline } = await supabase
    .from('timeline')
    .select('*')
    .order('sort_order')
  
  console.log(`数据库中的时间线数量: ${dbTimeline?.length || 0}`)
  console.log('应该显示的时间线:')
  dbTimeline?.forEach((item, index) => {
    console.log(`${index + 1}. ${item.year} - ${item.title} @ ${item.company}`)
  })

  // 验证统计数据
  console.log('\n📊 验证 Stats 数据:')
  const { data: dbStats } = await supabase
    .from('stats')
    .select('*')
    .order('sort_order')
  
  console.log(`数据库中的统计数量: ${dbStats?.length || 0}`)
  console.log('应该显示的统计:')
  dbStats?.forEach((stat, index) => {
    console.log(`${index + 1}. ${stat.label}: ${stat.value}`)
  })

  console.log('\n✅ 数据一致性验证完成!')
  console.log('\n📝 请检查页面显示是否与上述数据一致:')
  console.log('- Projects 页面应显示 6 个项目和 3 个代码示例')
  console.log('- About 页面应显示 4 个技能分类、4 个时间线项目和 8 个统计项目')
}

// 运行验证
verifyDataConsistency().catch(console.error)
