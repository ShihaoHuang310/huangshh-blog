# 现代前端博客项目文档

## 📖 项目概述

这是一个基于 Next.js 15 + TypeScript + Supabase 的现代前端博客项目，具有程序员风格的设计和完整的内容管理功能。

## 🚀 技术栈

- **前端框架**: Next.js 15 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **UI 组件**: shadcn/ui
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **数据库**: Supabase (PostgreSQL)
- **3D 效果**: Three.js
- **包管理器**: Yarn

## 🏗️ 项目结构

```
blog-next/
├── docs/                          # 项目文档
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 首页
│   │   ├── home-client.tsx       # 首页客户端组件
│   │   └── posts/                # 文章相关页面
│   │       ├── page.tsx          # 文章列表页
│   │       ├── posts-client.tsx  # 文章列表客户端组件
│   │       └── [slug]/           # 文章详情页
│   ├── components/               # 组件目录
│   │   ├── ui/                   # UI 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── pagination.tsx    # 分页组件
│   │   │   └── terminal.tsx
│   │   ├── blog/                 # 博客相关组件
│   │   └── three/                # 3D 效果组件
│   ├── lib/                      # 工具库
│   │   ├── supabase.ts          # Supabase 配置和 API
│   │   └── utils.ts             # 工具函数
│   └── types/                    # TypeScript 类型定义
├── scripts/                      # 脚本文件
│   ├── sync-content.ts          # 内容同步脚本
│   └── sync-mock-posts.ts       # Mock 数据同步脚本
├── content/                      # Markdown 文章内容
└── public/                       # 静态资源
```

## 🎨 设计特色

### 程序员主题设计
- 终端风格的交互界面
- 代码语法高亮的配色方案
- 命令行风格的导航和分页
- 毛玻璃效果和动画过渡

### 响应式布局
- 移动端优先的设计理念
- 适配不同屏幕尺寸
- 暗色主题支持

## 📚 功能特性

### 1. 首页功能
- 程序员风格的 Hero 区域
- 代码语法展示
- 模拟终端界面
- 精选文章展示
- 统计信息面板

### 2. 文章系统
- 文章列表页面（支持分页）
- 文章详情页面
- 分类和标签系统
- 搜索和筛选功能
- 阅读时间和浏览量统计

### 3. 内容管理
- Markdown 文件支持
- 自动内容同步
- 数据库存储
- SEO 优化

### 4. 用户体验
- 流畅的动画效果
- 程序员风格的分页
- 响应式设计
- 加载状态处理

## 🔧 开发指南

请查看以下详细文档：

### 📚 核心文档
- [📖 项目概览](./README.md) - 项目介绍和总览
- [🚀 快速开始](./QUICK-START.md) - 项目安装和运行指南
- [📝 更新日志](./CHANGELOG.md) - 项目版本更新记录

### 🛠️ 技术文档
- [🗄️ 数据库配置](./DATABASE.md) - Supabase 数据库设置和管理
- [🔌 API 文档](./API.md) - API 接口详细说明
- [📝 内容管理](./CONTENT-MANAGEMENT.md) - Markdown 文章内容管理

### 🎨 设计文档
- [🧩 组件文档](./COMPONENTS.md) - UI 组件使用说明
- [🎨 样式指南](./STYLING.md) - 样式系统和主题配置

### 🚀 部署文档
- [🚀 部署指南](./DEPLOYMENT.md) - 生产环境部署说明

## 🚀 快速开始

1. 克隆项目并安装依赖
2. 配置环境变量
3. 设置 Supabase 数据库
4. 同步内容到数据库
5. 启动开发服务器

详细步骤请查看 [快速开始文档](./QUICK-START.md)。

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**项目维护者**: [您的名字]  
**最后更新**: 2024-12-29
