#!/usr/bin/env tsx

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// 加载环境变量
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

console.log('🔍 检查环境变量...')
console.log('Supabase URL:', supabaseUrl ? '✅ 已设置' : '❌ 未设置')
console.log('Service Key:', supabaseServiceKey ? '✅ 已设置' : '❌ 未设置')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少必要的环境变量')
  console.error('请确保 .env.local 文件中包含以下变量:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// 个人信息数据
const profile = {
  name: 'Frontend Developer',
  title: '高级前端工程师',
  bio: '热爱技术分享的前端开发者，专注于现代 Web 技术栈，致力于构建优秀的用户体验。',
  location: 'Beijing, China',
  email: 'developer@example.com',
  avatar_url:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  github_url: 'https://github.com/username',
  twitter_url: 'https://twitter.com/username',
  linkedin_url: 'https://linkedin.com/in/username',
  website_url: 'https://example.com'
}

// 技能数据
const skills = [
  { name: 'React', level: 95, category: 'Frontend', sort_order: 1 },
  { name: 'TypeScript', level: 90, category: 'Frontend', sort_order: 2 },
  { name: 'Next.js', level: 88, category: 'Frontend', sort_order: 3 },
  { name: 'JavaScript', level: 92, category: 'Frontend', sort_order: 4 },
  { name: 'Three.js', level: 75, category: 'Frontend', sort_order: 5 },
  { name: 'CSS/SCSS', level: 85, category: 'Frontend', sort_order: 6 },
  { name: 'Tailwind CSS', level: 90, category: 'Frontend', sort_order: 7 },
  { name: 'Node.js', level: 80, category: 'Backend', sort_order: 8 },
  { name: 'PostgreSQL', level: 75, category: 'Backend', sort_order: 9 },
  { name: 'Supabase', level: 85, category: 'Backend', sort_order: 10 },
  { name: 'Git', level: 88, category: 'Tools', sort_order: 11 },
  { name: 'Docker', level: 70, category: 'Tools', sort_order: 12 },
  { name: 'AWS', level: 65, category: 'Tools', sort_order: 13 },
  { name: 'Figma', level: 80, category: 'Design', sort_order: 14 }
]

// 编程历程数据
const timeline = [
  {
    year: '2024',
    title: '高级前端工程师',
    company: '科技公司',
    description: '负责大型 React 应用的架构设计和开发，团队技术栈升级。',
    sort_order: 1
  },
  {
    year: '2022',
    title: '前端工程师',
    company: '创业公司',
    description: '从零开始构建产品前端，使用 Next.js 和 TypeScript。',
    sort_order: 2
  },
  {
    year: '2020',
    title: '初级前端开发者',
    company: '互联网公司',
    description: '学习现代前端技术栈，参与多个项目的开发和维护。',
    sort_order: 3
  },
  {
    year: '2019',
    title: '计算机科学学士',
    company: '门头沟学院',
    description: '主修计算机科学，专注于 Web 开发和软件工程。',
    sort_order: 4
  }
]

// 统计信息数据
const stats = [
  {
    label: 'Lines of Code Written',
    value: '100,000+',
    icon: 'Code',
    command: 'git log --oneline | wc -l',
    sort_order: 1
  },
  {
    label: 'GitHub Repositories',
    value: '50+',
    icon: 'Github',
    command: 'gh repo list --limit 100 | wc -l',
    sort_order: 2
  },
  {
    label: 'Years of Experience',
    value: '5+',
    icon: 'Calendar',
    command: 'echo $(($(date +%Y) - 2019))',
    sort_order: 3
  },
  {
    label: 'Coffee Cups',
    value: '∞',
    icon: 'Coffee',
    command: "echo 'while(true) { drink(coffee); code(); }'",
    sort_order: 4
  },
  {
    label: '编程经验',
    value: '5+ 年',
    icon: 'Code',
    command: "echo 'Experience since 2019'",
    sort_order: 5
  },
  {
    label: '博客文章',
    value: '50+ 篇',
    icon: 'Coffee',
    command: "find ./content -name '*.md' | wc -l",
    sort_order: 6
  },
  {
    label: '开源项目',
    value: '10+ 个',
    icon: 'Github',
    command: 'gh repo list --public | wc -l',
    sort_order: 7
  },
  {
    label: '技术分享',
    value: '20+ 次',
    icon: 'Heart',
    command: "echo 'Sharing knowledge with community'",
    sort_order: 8
  }
]

async function syncAboutData() {
  console.log('🚀 开始同步 About 页面数据到 Supabase...')

  try {
    // 测试连接
    const { data: testData, error: testError } = await supabase
      .from('profile')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('❌ 数据库连接失败:', testError.message)
      return
    }

    console.log('✅ Supabase 连接正常')

    // 同步个人信息
    console.log('📝 同步个人信息...')

    // 先检查是否已存在
    const { data: existingProfile } = await supabase
      .from('profile')
      .select('id')
      .eq('name', profile.name)
      .single()

    if (existingProfile) {
      // 更新现有记录
      const { error: profileError } = await supabase
        .from('profile')
        .update(profile)
        .eq('name', profile.name)

      if (profileError) {
        console.error('❌ 个人信息更新失败:', profileError.message)
      } else {
        console.log('✅ 个人信息更新成功')
      }
    } else {
      // 插入新记录
      const { error: profileError } = await supabase
        .from('profile')
        .insert(profile)

      if (profileError) {
        console.error('❌ 个人信息插入失败:', profileError.message)
      } else {
        console.log('✅ 个人信息插入成功')
      }
    }

    // 同步技能数据
    for (const skill of skills) {
      console.log(`📝 同步技能: ${skill.name}`)

      // 先检查是否已存在
      const { data: existing } = await supabase
        .from('skills')
        .select('id')
        .eq('name', skill.name)
        .single()

      if (existing) {
        // 更新现有记录
        const { error } = await supabase
          .from('skills')
          .update(skill)
          .eq('name', skill.name)

        if (error) {
          console.error(`❌ 更新失败: ${skill.name}`, error.message)
        } else {
          console.log(`✅ 更新成功: ${skill.name}`)
        }
      } else {
        // 插入新记录
        const { error } = await supabase.from('skills').insert(skill)

        if (error) {
          console.error(`❌ 插入失败: ${skill.name}`, error.message)
        } else {
          console.log(`✅ 插入成功: ${skill.name}`)
        }
      }
    }

    // 同步时间线数据
    for (const item of timeline) {
      console.log(`📝 同步时间线: ${item.year} - ${item.title}`)

      // 先检查是否已存在
      const { data: existing } = await supabase
        .from('timeline')
        .select('id')
        .eq('year', item.year)
        .eq('title', item.title)
        .single()

      if (existing) {
        // 更新现有记录
        const { error } = await supabase
          .from('timeline')
          .update(item)
          .eq('year', item.year)
          .eq('title', item.title)

        if (error) {
          console.error(`❌ 更新失败: ${item.title}`, error.message)
        } else {
          console.log(`✅ 更新成功: ${item.title}`)
        }
      } else {
        // 插入新记录
        const { error } = await supabase.from('timeline').insert(item)

        if (error) {
          console.error(`❌ 插入失败: ${item.title}`, error.message)
        } else {
          console.log(`✅ 插入成功: ${item.title}`)
        }
      }
    }

    // 同步统计信息数据
    for (const stat of stats) {
      console.log(`📝 同步统计信息: ${stat.label}`)

      // 先检查是否已存在
      const { data: existing } = await supabase
        .from('stats')
        .select('id')
        .eq('label', stat.label)
        .single()

      if (existing) {
        // 更新现有记录
        const { error } = await supabase
          .from('stats')
          .update(stat)
          .eq('label', stat.label)

        if (error) {
          console.error(`❌ 更新失败: ${stat.label}`, error.message)
        } else {
          console.log(`✅ 更新成功: ${stat.label}`)
        }
      } else {
        // 插入新记录
        const { error } = await supabase.from('stats').insert(stat)

        if (error) {
          console.error(`❌ 插入失败: ${stat.label}`, error.message)
        } else {
          console.log(`✅ 插入成功: ${stat.label}`)
        }
      }
    }

    console.log('🎉 所有 About 页面数据同步完成！')
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error)
  }
}

// 运行同步
syncAboutData()
