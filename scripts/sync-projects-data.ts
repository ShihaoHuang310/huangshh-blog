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

// 项目数据
const projects = [
  {
    title: 'React Component Library',
    description:
      '一个现代化的 React 组件库，包含 50+ 个高质量组件，支持 TypeScript 和主题定制。',
    tech: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    demo_url: 'https://components.example.com',
    github_url: 'https://github.com/username/react-components',
    featured: true,
    sort_order: 1,
    status: 'active'
  },
  {
    title: '3D Portfolio Website',
    description:
      '使用 Three.js 和 React 构建的交互式 3D 作品集网站，展示创意编程和视觉效果。',
    tech: ['React', 'Three.js', 'GSAP', 'WebGL'],
    demo_url: 'https://portfolio.example.com',
    github_url: 'https://github.com/username/3d-portfolio',
    featured: true,
    sort_order: 2,
    status: 'active'
  },
  {
    title: 'Code Editor Theme',
    description: '为 VS Code 设计的程序员友好主题，优化了语法高亮和可读性。',
    tech: ['VS Code', 'JSON', 'Color Theory'],
    demo_url:
      'https://marketplace.visualstudio.com/items?itemName=username.theme',
    github_url: 'https://github.com/username/vscode-theme',
    featured: false,
    sort_order: 3,
    status: 'active'
  },
  {
    title: 'Animation Playground',
    description:
      '探索 CSS 和 JavaScript 动画的实验性项目，包含各种创意动画效果。',
    tech: ['CSS', 'JavaScript', 'Framer Motion', 'GSAP'],
    demo_url: 'https://animations.example.com',
    github_url: 'https://github.com/username/animation-playground',
    featured: false,
    sort_order: 4,
    status: 'active'
  },
  {
    title: 'Next.js Blog Template',
    description: '现代化的博客模板，支持 MDX、深色模式和 SEO 优化。',
    tech: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    demo_url: 'https://blog-template.example.com',
    github_url: 'https://github.com/username/nextjs-blog',
    featured: true,
    sort_order: 5,
    status: 'active'
  },
  {
    title: 'TypeScript Utilities',
    description: '实用的 TypeScript 工具函数库，提供类型安全的常用功能。',
    tech: ['TypeScript', 'Jest', 'Rollup', 'npm'],
    demo_url: 'https://www.npmjs.com/package/ts-utilities',
    github_url: 'https://github.com/username/ts-utilities',
    featured: false,
    sort_order: 6,
    status: 'active'
  }
]

// 代码示例数据
const codeExamples = [
  {
    title: 'React Hook: useLocalStorage',
    description: '一个类型安全的 localStorage Hook，支持序列化和错误处理。',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue];
}`,
    sort_order: 1,
    featured: true
  },
  {
    title: 'CSS Animation: Floating Elements',
    description: '纯 CSS 实现的浮动动画效果，适用于装饰性元素。',
    language: 'css',
    code: `@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatReverse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.float-element {
  animation: float 3s ease-in-out infinite;
}

.float-element:nth-child(even) {
  animation: floatReverse 3s ease-in-out infinite;
  animation-delay: 1s;
}`,
    sort_order: 2,
    featured: true
  },
  {
    title: 'Three.js: Particle System',
    description: '使用 Three.js 创建的粒子系统，支持鼠标交互和动态效果。',
    language: 'javascript',
    code: `import * as THREE from 'three';

class ParticleSystem {
  constructor(scene, count = 1000) {
    this.scene = scene;
    this.count = count;
    this.init();
  }

  init() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  update() {
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y += 0.002;
  }
}`,
    sort_order: 3,
    featured: true
  }
]

async function syncProjects() {
  console.log('🚀 开始同步项目数据到 Supabase...')

  try {
    // 测试连接
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('❌ 数据库连接失败:', testError.message)
      return
    }

    console.log('✅ Supabase 连接正常')

    // 同步项目数据
    for (const project of projects) {
      console.log(`📝 同步项目: ${project.title}`)

      // 先检查是否已存在
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('title', project.title)
        .single()

      if (existing) {
        // 更新现有记录
        const { error } = await supabase
          .from('projects')
          .update(project)
          .eq('title', project.title)

        if (error) {
          console.error(`❌ 更新失败: ${project.title}`, error.message)
        } else {
          console.log(`✅ 更新成功: ${project.title}`)
        }
      } else {
        // 插入新记录
        const { error } = await supabase.from('projects').insert(project)

        if (error) {
          console.error(`❌ 插入失败: ${project.title}`, error.message)
        } else {
          console.log(`✅ 插入成功: ${project.title}`)
        }
      }
    }

    // 同步代码示例数据
    for (const example of codeExamples) {
      console.log(`📝 同步代码示例: ${example.title}`)

      // 先检查是否已存在
      const { data: existing } = await supabase
        .from('code_examples')
        .select('id')
        .eq('title', example.title)
        .single()

      if (existing) {
        // 更新现有记录
        const { error } = await supabase
          .from('code_examples')
          .update(example)
          .eq('title', example.title)

        if (error) {
          console.error(`❌ 更新失败: ${example.title}`, error.message)
        } else {
          console.log(`✅ 更新成功: ${example.title}`)
        }
      } else {
        // 插入新记录
        const { error } = await supabase.from('code_examples').insert(example)

        if (error) {
          console.error(`❌ 插入失败: ${example.title}`, error.message)
        } else {
          console.log(`✅ 插入成功: ${example.title}`)
        }
      }
    }

    console.log('🎉 所有项目数据同步完成！')
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error)
  }
}

// 运行同步
syncProjects()
