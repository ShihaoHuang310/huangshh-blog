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

// Mock 数据
const mockPosts = [
  {
    title: '深入理解 React 19 的新特性',
    slug: 'react-19-new-features',
    excerpt:
      '探索 React 19 带来的革命性变化，包括并发特性、Suspense 改进和新的 Hooks。',
    content: `# 深入理解 React 19 的新特性

React 19 是一个重大的版本更新，带来了许多令人兴奋的新特性和改进。在这篇文章中，我们将深入探讨这些变化，了解它们如何影响我们的开发工作流程。

## 并发特性的完善

React 19 进一步完善了并发特性，使得应用程序能够更好地处理复杂的用户交互和数据更新。

### 自动批处理

React 19 扩展了自动批处理的范围，现在几乎所有的状态更新都会被自动批处理。

## 新的 Hooks

React 19 引入了几个新的 Hooks，让状态管理和副作用处理更加简单。

## 性能优化

React 19 在性能方面也有显著提升：
- 更快的初始渲染
- 减少的内存占用
- 改进的开发者工具`,
    category: 'React',
    tags: ['React', 'Hooks', '并发', 'Suspense'],
    published_at: '2024-01-15',
    updated_at: '2024-01-15',
    reading_time: 8,
    view_count: 1250,
    featured: true,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  {
    title: 'Next.js 15 完全指南',
    slug: 'nextjs-15-complete-guide',
    excerpt:
      '从零开始学习 Next.js 15，掌握最新的 App Router、Server Components 和性能优化技巧。',
    content: `# Next.js 15 完全指南

Next.js 15 带来了许多激动人心的新特性，让我们一起探索这些改进。

## App Router

新的 App Router 提供了更强大的路由功能。

## Server Components

Server Components 让我们能够在服务器端渲染组件，提升性能。

## 性能优化

Next.js 15 在性能方面有显著提升。`,
    category: 'Next.js',
    tags: ['Next.js', 'App Router', 'Server Components', '性能优化'],
    published_at: '2024-01-10',
    updated_at: '2024-01-10',
    reading_time: 12,
    view_count: 980,
    featured: true,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
  },
  {
    title: 'TypeScript 高级类型系统详解',
    slug: 'typescript-advanced-types',
    excerpt: '深入探讨 TypeScript 的高级类型特性，提升代码质量和开发效率。',
    content: `# TypeScript 高级类型系统详解

TypeScript 的类型系统非常强大，让我们深入了解其高级特性。

## 泛型

泛型是 TypeScript 中最重要的特性之一。

## 条件类型

条件类型让我们能够根据条件选择不同的类型。

## 映射类型

映射类型允许我们基于现有类型创建新类型。`,
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统', '高级特性'],
    published_at: '2024-01-05',
    updated_at: '2024-01-05',
    reading_time: 15,
    view_count: 756,
    featured: false,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
  },
  {
    title: 'CSS Grid 布局完全指南',
    slug: 'css-grid-complete-guide',
    excerpt: '掌握 CSS Grid 布局的所有特性，创建复杂而灵活的网页布局。',
    content: `# CSS Grid 布局完全指南

CSS Grid 是现代网页布局的强大工具。

## 基础概念

Grid 容器和 Grid 项目是 CSS Grid 的基础概念。

## 网格线和网格区域

了解如何使用网格线和网格区域来创建布局。

## 响应式设计

使用 CSS Grid 创建响应式布局。`,
    category: 'CSS',
    tags: ['CSS', 'Grid', '布局', '响应式'],
    published_at: '2024-01-01',
    updated_at: '2024-01-01',
    reading_time: 10,
    view_count: 642,
    featured: false,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  },
  {
    title: 'JavaScript 性能优化技巧',
    slug: 'javascript-performance-tips',
    excerpt: '学习实用的 JavaScript 性能优化技巧，让你的应用运行更快。',
    content: `# JavaScript 性能优化技巧

性能优化是前端开发中的重要话题。

## 代码分割

使用代码分割来减少初始加载时间。

## 懒加载

实现懒加载来提升用户体验。

## 内存管理

避免内存泄漏，优化内存使用。`,
    category: 'JavaScript',
    tags: ['JavaScript', '性能优化', '最佳实践'],
    published_at: '2023-12-28',
    updated_at: '2023-12-28',
    reading_time: 7,
    view_count: 523,
    featured: false,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop'
  },
  {
    title: '现代前端工具链详解',
    slug: 'modern-frontend-toolchain',
    excerpt: '了解现代前端开发中的各种工具，提升开发效率和代码质量。',
    content: `# 现代前端工具链详解

现代前端开发离不开各种工具的支持。

## 构建工具

Vite、Webpack 等构建工具的对比和选择。

## 代码质量工具

ESLint、Prettier 等工具的配置和使用。

## 测试工具

Jest、Vitest 等测试框架的使用。`,
    category: '工具链',
    tags: ['工具链', 'Vite', 'ESLint', 'Prettier'],
    published_at: '2023-12-25',
    updated_at: '2023-12-25',
    reading_time: 9,
    view_count: 445,
    featured: false,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'
  },
  {
    title: 'Vue 3 Composition API 深度解析',
    slug: 'vue3-composition-api-deep-dive',
    excerpt: '深入了解 Vue 3 的 Composition API，掌握现代 Vue 开发模式。',
    content: `# Vue 3 Composition API 深度解析

Vue 3 的 Composition API 带来了全新的开发体验。

## setup 函数

setup 函数是 Composition API 的入口点。

## 响应式系统

ref、reactive 等响应式 API 的使用。

## 生命周期钩子

在 Composition API 中使用生命周期钩子。`,
    category: 'Vue',
    tags: ['Vue', 'Composition API', 'Vue 3'],
    published_at: '2024-01-20',
    updated_at: '2024-01-20',
    reading_time: 6,
    view_count: 2100,
    featured: true,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'
  },
  {
    title: 'Tailwind CSS 最佳实践',
    slug: 'tailwind-css-best-practices',
    excerpt: '学习 Tailwind CSS 的最佳实践，构建可维护的样式系统。',
    content: `# Tailwind CSS 最佳实践

Tailwind CSS 是一个功能强大的 CSS 框架。

## 组件化

使用 Tailwind CSS 创建可复用的组件。

## 自定义配置

配置 Tailwind CSS 以满足项目需求。

## 性能优化

优化 Tailwind CSS 的构建输出。`,
    category: 'CSS',
    tags: ['CSS', 'Tailwind', '最佳实践'],
    published_at: '2024-01-18',
    updated_at: '2024-01-18',
    reading_time: 4,
    view_count: 890,
    featured: false,
    status: 'published',
    cover_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
  }
]

async function syncMockPosts() {
  console.log('🚀 开始同步 Mock 数据到 Supabase...')

  try {
    // 检查连接
    const { data: testData, error: testError } = await supabase
      .from('articles')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('❌ Supabase 连接失败:', testError)
      return
    }

    console.log('✅ Supabase 连接正常')

    // 同步每篇文章
    for (const post of mockPosts) {
      console.log(`📝 同步文章: ${post.title}`)

      // 检查文章是否已存在
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', post.slug)
        .single()

      if (existing) {
        console.log(`⚠️  文章已存在，跳过: ${post.slug}`)
        continue
      }

      // 插入文章
      const { error } = await supabase.from('articles').insert([post])

      if (error) {
        console.error(`❌ 同步失败: ${post.title}`, error)
      } else {
        console.log(`✅ 同步成功: ${post.title}`)
      }
    }

    console.log('🎉 所有 Mock 数据同步完成！')
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error)
  }
}

// 运行同步
syncMockPosts()
