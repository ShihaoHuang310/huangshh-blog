# 🧩 组件文档

## 📋 组件概览

项目采用模块化的组件架构，主要分为以下几类：

- **UI 基础组件**: 可复用的基础 UI 元素
- **博客组件**: 博客特定的功能组件
- **布局组件**: 页面布局相关组件
- **3D 效果组件**: Three.js 相关的视觉效果

## 🎨 UI 基础组件

### Button 组件

位置：`src/components/ui/button.tsx`

```typescript
import { Button } from "@/components/ui/button"

// 基础用法
<Button>点击我</Button>

// 变体
<Button variant="default">默认按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>

// 尺寸
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>

// 作为链接
<Button asChild>
  <Link href="/posts">查看文章</Link>
</Button>
```

### Pagination 组件

位置：`src/components/ui/pagination.tsx`

程序员风格的分页组件，具有终端界面设计。

```typescript
import { Pagination } from "@/components/ui/pagination"

<Pagination
  currentPage={1}
  totalPages={5}
  total={50}
  pageSize={10}
  basePath="/posts"
/>
```

**特性**：
- 终端风格的设计
- 代码语法高亮显示分页状态
- 智能页码显示（省略号处理）
- 命令行风格的状态信息

### Terminal 组件

位置：`src/components/ui/terminal.tsx`

模拟终端界面的组件。

```typescript
import { Terminal, TerminalCommand, CodeBlock } from "@/components/ui/terminal"

<Terminal>
  <TerminalCommand command="cat developer.js" />
  <CodeBlock language="javascript" code={codeExample} />
  <TerminalCommand command="npm run build" />
  <div className="text-green-400">✓ Build completed</div>
</Terminal>
```

## 📝 博客组件

### PostList 组件

位置：`src/components/blog/post-list.tsx`

文章列表展示组件。

```typescript
import { PostList } from "@/components/blog/post-list"

<PostList
  posts={posts}
  viewMode="grid" // 或 "list"
  showPagination={true}
/>
```

### PostCard 组件

文章卡片组件，支持统一高度和内容截断。

**特性**：
- 标题限制1行，超出显示省略号
- 描述限制3行，超出显示省略号
- 统一卡片高度
- 悬停动画效果

### SearchBar 组件

文章搜索组件。

```typescript
import { SearchBar } from "@/components/blog/search-bar"

<SearchBar
  onSearch={(query) => console.log(query)}
  placeholder="搜索文章..."
/>
```

## 🏗️ 布局组件

### Header 组件

位置：`src/components/layout/header.tsx`

网站头部导航组件。

```typescript
import { Header } from "@/components/layout/header"

<Header />
```

### Footer 组件

位置：`src/components/layout/footer.tsx`

网站底部组件。

```typescript
import { Footer } from "@/components/layout/footer"

<Footer />
```

### Sidebar 组件

侧边栏组件，包含分类和标签导航。

```typescript
import { Sidebar } from "@/components/layout/sidebar"

<Sidebar
  categories={categories}
  tags={tags}
  onCategorySelect={(category) => {}}
  onTagSelect={(tag) => {}}
/>
```

## 🌟 3D 效果组件

### ParticleBackground 组件

位置：`src/components/three/particle-background.tsx`

基于 Three.js 的粒子背景效果。

```typescript
import { ParticleBackground } from "@/components/three/particle-background"

<ParticleBackground
  variant="particles" // 或 "waves", "dots"
  color="#3B82F6"
  density={100}
/>
```

**变体**：
- `particles`: 粒子效果
- `waves`: 波浪效果
- `dots`: 点阵效果

## 🎯 客户端组件

### HomeClient 组件

位置：`src/app/home-client.tsx`

首页的客户端组件，包含所有动画和交互逻辑。

```typescript
import { HomeClient } from "@/app/home-client"

<HomeClient featuredPosts={posts} />
```

**功能**：
- 程序员风格的 Hero 区域
- 代码语法展示
- 统计信息面板
- 精选文章展示

### PostsClient 组件

位置：`src/app/posts/posts-client.tsx`

文章列表页的客户端组件。

```typescript
import { PostsClient } from "@/app/posts/posts-client"

<PostsClient
  posts={posts}
  pagination={{
    currentPage: 1,
    totalPages: 5,
    total: 50,
    pageSize: 10
  }}
/>
```

**功能**：
- 文章搜索和筛选
- 网格/列表视图切换
- 分页导航
- 响应式布局

## 🎨 样式系统

### CSS 类命名规范

```css
/* 组件基础样式 */
.card-enhanced {
  /* 增强卡片样式 */
}

.terminal-window {
  /* 终端窗口样式 */
}

.code-highlight {
  /* 代码高亮样式 */
}

/* 工具类 */
.line-clamp-1 {
  /* 单行文本截断 */
}

.line-clamp-3 {
  /* 三行文本截断 */
}
```

### Tailwind 配置

主要的自定义配置：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 主色调配置
        },
        secondary: {
          // 次要色调配置
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  }
}
```

## 🔧 组件开发指南

### 1. 创建新组件

```typescript
// src/components/ui/new-component.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NewComponentProps {
  className?: string
  children?: React.ReactNode
}

export function NewComponent({ className, children }: NewComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

### 2. 组件测试

```typescript
// src/components/ui/__tests__/new-component.test.tsx
import { render, screen } from '@testing-library/react'
import { NewComponent } from '../new-component'

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent>Test content</NewComponent>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
```

### 3. 组件文档

每个组件都应包含：
- TypeScript 接口定义
- 使用示例
- Props 说明
- 样式变体

## 📱 响应式设计

### 断点系统

```css
/* Tailwind 断点 */
sm: 640px   /* 小屏幕 */
md: 768px   /* 中等屏幕 */
lg: 1024px  /* 大屏幕 */
xl: 1280px  /* 超大屏幕 */
2xl: 1536px /* 超超大屏幕 */
```

### 响应式组件示例

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 移动端1列，平板2列，桌面3列 */}
</div>
```

## 🎭 动画系统

### Framer Motion 配置

```typescript
import { motion } from "framer-motion"

// 基础动画
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>

// 列表动画
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

### 预设动画

```typescript
// src/lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

## 🔍 组件调试

### 开发工具

```typescript
// 组件调试信息
if (process.env.NODE_ENV === 'development') {
  console.log('Component props:', props)
}

// 性能监控
import { Profiler } from 'react'

<Profiler id="ComponentName" onRender={onRenderCallback}>
  <Component />
</Profiler>
```

### 错误边界

```typescript
// src/components/error-boundary.tsx
import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

---

**下一步**: [样式指南](./STYLING.md)
