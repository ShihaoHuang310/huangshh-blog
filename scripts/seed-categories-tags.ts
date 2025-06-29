import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// 加载环境变量
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少必要的环境变量')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_KEY:', supabaseServiceKey ? '✅' : '❌')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

const categories = [
  {
    name: 'React',
    slug: 'react',
    description: 'React 相关技术文章，包括 Hooks、组件设计、状态管理等内容。',
    color: '#61DAFB',
    icon: 'code'
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Next.js 框架相关内容，涵盖 SSR、SSG、API Routes 等特性。',
    color: '#000000',
    icon: 'terminal'
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    description: 'TypeScript 类型系统和最佳实践，提升代码质量和开发效率。',
    color: '#3178C6',
    icon: 'file-text'
  },
  {
    name: 'CSS',
    slug: 'css',
    description:
      'CSS 样式和布局技巧，包括 Flexbox、Grid、动画等现代 CSS 特性。',
    color: '#1572B6',
    icon: 'hash'
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    description: 'JavaScript 语言特性和技巧，ES6+ 新特性，异步编程等。',
    color: '#F7DF1E',
    icon: 'zap'
  },
  {
    name: '性能优化',
    slug: 'performance',
    description: 'Web 性能优化相关技术，包括加载优化、渲染优化、代码分割等。',
    color: '#FF6B6B',
    icon: 'cpu'
  },
  {
    name: '工具链',
    slug: 'tooling',
    description: '开发工具和构建工具，包括 Webpack、Vite、ESLint 等。',
    color: '#4ECDC4',
    icon: 'terminal'
  },
  {
    name: '设计',
    slug: 'design',
    description: 'UI/UX 设计相关内容，设计系统、用户体验、界面设计等。',
    color: '#FF8A80',
    icon: 'hash'
  }
]

const tags = [
  {
    name: 'react',
    slug: 'react',
    description: 'React 框架相关',
    color: '#61DAFB'
  },
  {
    name: 'hooks',
    slug: 'hooks',
    description: 'React Hooks',
    color: '#61DAFB'
  },
  {
    name: 'nextjs',
    slug: 'nextjs',
    description: 'Next.js 框架',
    color: '#000000'
  },
  {
    name: 'typescript',
    slug: 'typescript',
    description: 'TypeScript 语言',
    color: '#3178C6'
  },
  {
    name: 'javascript',
    slug: 'javascript',
    description: 'JavaScript 语言',
    color: '#F7DF1E'
  },
  { name: 'css', slug: 'css', description: 'CSS 样式', color: '#1572B6' },
  { name: 'html', slug: 'html', description: 'HTML 标记', color: '#E34F26' },
  {
    name: 'tailwind',
    slug: 'tailwind',
    description: 'Tailwind CSS',
    color: '#06B6D4'
  },
  {
    name: 'performance',
    slug: 'performance',
    description: '性能优化',
    color: '#FF6B6B'
  },
  { name: 'seo', slug: 'seo', description: '搜索引擎优化', color: '#4CAF50' },
  {
    name: 'tutorial',
    slug: 'tutorial',
    description: '教程指南',
    color: '#9C27B0'
  },
  { name: 'tips', slug: 'tips', description: '技巧分享', color: '#FF9800' },
  {
    name: 'best-practices',
    slug: 'best-practices',
    description: '最佳实践',
    color: '#2196F3'
  },
  { name: 'guide', slug: 'guide', description: '指南文档', color: '#795548' },
  {
    name: 'animation',
    slug: 'animation',
    description: '动画效果',
    color: '#E91E63'
  }
]

async function seedCategoriesAndTags() {
  try {
    console.log('🌱 开始添加分类和标签数据...')

    // 添加分类
    console.log('📂 添加分类数据...')
    const { data: categoriesData, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .upsert(categories, { onConflict: 'slug' })
      .select()

    if (categoriesError) {
      console.error('❌ 添加分类失败:', categoriesError)
    } else {
      console.log(`✅ 成功添加 ${categoriesData?.length || 0} 个分类`)
    }

    // 添加标签
    console.log('🏷️ 添加标签数据...')
    const { data: tagsData, error: tagsError } = await supabaseAdmin
      .from('tags')
      .upsert(tags, { onConflict: 'slug' })
      .select()

    if (tagsError) {
      console.error('❌ 添加标签失败:', tagsError)
    } else {
      console.log(`✅ 成功添加 ${tagsData?.length || 0} 个标签`)
    }

    console.log('🎉 分类和标签数据添加完成！')
  } catch (error) {
    console.error('💥 添加数据时发生错误:', error)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  seedCategoriesAndTags()
    .then(() => {
      console.log('✨ 脚本执行完成')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 脚本执行失败:', error)
      process.exit(1)
    })
}

export { seedCategoriesAndTags }
