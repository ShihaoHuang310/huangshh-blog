# 🎨 样式指南

## 📋 样式系统概览

项目采用 Tailwind CSS + shadcn/ui 的现代样式解决方案，结合程序员主题的设计语言。

## 🎯 设计原则

### 1. 程序员主题
- 终端风格的界面设计
- 代码语法高亮配色
- 命令行风格的交互元素
- 毛玻璃效果和动画

### 2. 响应式设计
- 移动端优先的设计理念
- 流畅的断点过渡
- 适配不同屏幕尺寸

### 3. 一致性
- 统一的组件设计语言
- 一致的间距和字体规范
- 标准化的颜色系统

## 🌈 颜色系统

### 主色调

```css
:root {
  /* 主色调 - 蓝色系 */
  --primary: 217 91% 60%;           /* #3B82F6 */
  --primary-foreground: 0 0% 98%;   /* #FAFAFA */
  
  /* 次要色调 - 紫色系 */
  --secondary: 262 83% 58%;         /* #8B5CF6 */
  --secondary-foreground: 0 0% 98%; /* #FAFAFA */
  
  /* 强调色 - 绿色系 */
  --accent: 142 76% 36%;            /* #10B981 */
  --accent-foreground: 0 0% 98%;    /* #FAFAFA */
}
```

### 语义化颜色

```css
:root {
  /* 背景色 */
  --background: 0 0% 100%;          /* #FFFFFF */
  --foreground: 240 10% 3.9%;       /* #0A0A0A */
  
  /* 卡片和表面 */
  --card: 0 0% 100%;                /* #FFFFFF */
  --card-foreground: 240 10% 3.9%;  /* #0A0A0A */
  
  /* 边框和分割线 */
  --border: 240 5.9% 90%;           /* #E5E7EB */
  --input: 240 5.9% 90%;            /* #E5E7EB */
  
  /* 文本颜色 */
  --muted: 240 4.8% 95.9%;          /* #F3F4F6 */
  --muted-foreground: 240 3.8% 46.1%; /* #6B7280 */
}
```

### 暗色主题

```css
.dark {
  /* 背景色 */
  --background: 240 10% 3.9%;       /* #0A0A0A */
  --foreground: 0 0% 98%;           /* #FAFAFA */
  
  /* 卡片和表面 */
  --card: 240 10% 3.9%;             /* #0A0A0A */
  --card-foreground: 0 0% 98%;      /* #FAFAFA */
  
  /* 边框和分割线 */
  --border: 240 3.7% 15.9%;         /* #27272A */
  --input: 240 3.7% 15.9%;          /* #27272A */
}
```

### 代码语法高亮色

```css
:root {
  /* 代码高亮颜色 */
  --code-blue: 217 91% 60%;         /* 关键字 */
  --code-purple: 262 83% 58%;       /* 变量名 */
  --code-orange: 25 95% 53%;        /* 属性名 */
  --code-green: 142 76% 36%;        /* 字符串 */
  --code-yellow: 45 93% 47%;        /* 操作符 */
  --code-gray: 240 3.8% 46.1%;      /* 注释 */
}
```

## 📝 字体系统

### 字体族

```css
:root {
  /* 主字体 - 无衬线 */
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* 等宽字体 - 代码 */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* 标题字体 */
  --font-heading: 'Inter', system-ui, sans-serif;
}
```

### 字体大小

```css
/* Tailwind 字体大小扩展 */
.text-xs    { font-size: 0.75rem; }   /* 12px */
.text-sm    { font-size: 0.875rem; }  /* 14px */
.text-base  { font-size: 1rem; }      /* 16px */
.text-lg    { font-size: 1.125rem; }  /* 18px */
.text-xl    { font-size: 1.25rem; }   /* 20px */
.text-2xl   { font-size: 1.5rem; }    /* 24px */
.text-3xl   { font-size: 1.875rem; }  /* 30px */
.text-4xl   { font-size: 2.25rem; }   /* 36px */
.text-5xl   { font-size: 3rem; }      /* 48px */
.text-6xl   { font-size: 3.75rem; }   /* 60px */
```

## 📐 间距系统

### 基础间距

```css
/* Tailwind 间距系统 */
.p-1   { padding: 0.25rem; }    /* 4px */
.p-2   { padding: 0.5rem; }     /* 8px */
.p-3   { padding: 0.75rem; }    /* 12px */
.p-4   { padding: 1rem; }       /* 16px */
.p-6   { padding: 1.5rem; }     /* 24px */
.p-8   { padding: 2rem; }       /* 32px */
.p-12  { padding: 3rem; }       /* 48px */
.p-16  { padding: 4rem; }       /* 64px */
.p-20  { padding: 5rem; }       /* 80px */
```

### 组件间距规范

```css
/* 页面级间距 */
.page-container {
  @apply container mx-auto px-4 sm:px-6 lg:px-8;
}

/* 区块间距 */
.section-spacing {
  @apply py-12 md:py-16 lg:py-20;
}

/* 组件间距 */
.component-spacing {
  @apply space-y-6 md:space-y-8;
}
```

## 🎭 组件样式

### 卡片组件

```css
/* 基础卡片 */
.card-base {
  @apply bg-card text-card-foreground rounded-lg border shadow-sm;
}

/* 增强卡片 */
.card-enhanced {
  @apply card-base hover:shadow-md transition-shadow duration-300;
  @apply border-border/50 hover:border-primary/20;
}

/* 终端风格卡片 */
.card-terminal {
  @apply bg-gray-900 border-gray-700 rounded-lg;
  @apply shadow-lg shadow-black/25;
}
```

### 按钮样式

```css
/* 主要按钮 */
.btn-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

/* 轮廓按钮 */
.btn-outline {
  @apply border border-input bg-background hover:bg-accent hover:text-accent-foreground;
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

/* 程序员风格按钮 */
.btn-terminal {
  @apply bg-gray-800 text-gray-300 hover:bg-gray-700;
  @apply border border-gray-600 font-mono text-sm;
  @apply px-3 py-2 rounded transition-colors;
}
```

### 输入框样式

```css
/* 基础输入框 */
.input-base {
  @apply flex h-10 w-full rounded-md border border-input;
  @apply bg-background px-3 py-2 text-sm ring-offset-background;
  @apply placeholder:text-muted-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-ring focus-visible:ring-offset-2;
}

/* 搜索框 */
.input-search {
  @apply input-base pl-10;
}
```

## 🎨 特殊效果

### 毛玻璃效果

```css
.glass-effect {
  @apply bg-white/10 backdrop-blur-md border border-white/20;
  @apply shadow-lg shadow-black/25;
}

.glass-effect-dark {
  @apply bg-black/20 backdrop-blur-md border border-white/10;
  @apply shadow-lg shadow-black/50;
}
```

### 代码高亮

```css
.code-highlight {
  @apply bg-gray-900 text-gray-100 rounded-lg p-4;
  @apply font-mono text-sm overflow-x-auto;
}

.code-highlight .keyword {
  @apply text-blue-400;
}

.code-highlight .string {
  @apply text-green-300;
}

.code-highlight .comment {
  @apply text-gray-500;
}

.code-highlight .variable {
  @apply text-purple-400;
}

.code-highlight .operator {
  @apply text-yellow-400;
}
```

### 终端效果

```css
.terminal-window {
  @apply bg-gray-900 rounded-lg border border-gray-700;
  @apply shadow-2xl shadow-black/50;
}

.terminal-header {
  @apply flex items-center space-x-2 p-4 border-b border-gray-700;
}

.terminal-dot {
  @apply w-3 h-3 rounded-full;
}

.terminal-dot-red {
  @apply terminal-dot bg-red-500;
}

.terminal-dot-yellow {
  @apply terminal-dot bg-yellow-500;
}

.terminal-dot-green {
  @apply terminal-dot bg-green-500;
}

.terminal-content {
  @apply p-4 font-mono text-sm;
}

.terminal-prompt {
  @apply text-green-400;
}

.terminal-command {
  @apply text-gray-300;
}
```

## 📱 响应式设计

### 断点系统

```css
/* Tailwind 断点 */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

### 响应式组件

```css
/* 响应式网格 */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* 响应式文字 */
.responsive-text {
  @apply text-2xl md:text-3xl lg:text-4xl xl:text-5xl;
}

/* 响应式间距 */
.responsive-spacing {
  @apply py-8 md:py-12 lg:py-16 xl:py-20;
}
```

## 🎯 文本处理

### 文本截断

```css
/* 单行截断 */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: 1.5;
  max-height: 1.5em;
}

/* 三行截断 */
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.5;
  max-height: 4.5em;
}

/* 自定义行数截断 */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.5;
  max-height: 3em;
}
```

### 文本样式

```css
/* 代码文本 */
.text-code {
  @apply font-mono text-sm bg-muted px-1.5 py-0.5 rounded;
}

/* 强调文本 */
.text-emphasis {
  @apply font-semibold text-primary;
}

/* 次要文本 */
.text-secondary {
  @apply text-muted-foreground text-sm;
}
```

## 🎬 动画系统

### 基础动画

```css
/* 淡入动画 */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 滑入动画 */
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放动画 */
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 悬停效果

```css
/* 卡片悬停 */
.hover-lift {
  @apply transition-transform duration-300 hover:scale-105;
}

/* 按钮悬停 */
.hover-glow {
  @apply transition-shadow duration-300;
  @apply hover:shadow-lg hover:shadow-primary/25;
}

/* 文本悬停 */
.hover-text {
  @apply transition-colors duration-200 hover:text-primary;
}
```

## 🛠️ 自定义工具类

### 布局工具

```css
/* 居中容器 */
.center-container {
  @apply flex items-center justify-center min-h-screen;
}

/* 全宽容器 */
.full-width {
  @apply w-full max-w-none;
}

/* 内容容器 */
.content-container {
  @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### 状态工具

```css
/* 加载状态 */
.loading {
  @apply opacity-50 pointer-events-none;
}

/* 禁用状态 */
.disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* 活跃状态 */
.active {
  @apply bg-primary text-primary-foreground;
}
```

## 📋 样式检查清单

### 开发时检查

- [ ] 使用语义化的 CSS 类名
- [ ] 遵循响应式设计原则
- [ ] 保持颜色系统一致性
- [ ] 使用标准间距规范
- [ ] 添加适当的动画效果

### 代码审查检查

- [ ] 避免内联样式
- [ ] 使用 Tailwind 工具类
- [ ] 保持组件样式模块化
- [ ] 确保暗色主题兼容
- [ ] 验证无障碍访问性

---

**相关文档**: [组件文档](./COMPONENTS.md) | [部署指南](./DEPLOYMENT.md)
