# 现代博客 - Modern Blog

一个使用 Next.js 15、React 19 和现代前端技术栈构建的美观博客网站，具有丰富的动画效果和优秀的用户体验。

## ✨ 特性

### 🎨 设计与用户体验
- **现代化设计** - 简洁美观的界面设计
- **深色/浅色主题** - 支持主题切换
- **响应式布局** - 适配各种屏幕尺寸
- **优秀的排版** - 清晰的文章阅读体验

### 🚀 动画与交互
- **页面转场动画** - 流畅的页面切换效果
- **滚动动画** - 滚动触发的各种动画效果
- **微交互** - 悬停、点击等细节交互
- **平滑滚动** - 使用 Lenis 实现的平滑滚动
- **磁性按钮** - 鼠标跟随的磁性效果
- **倾斜卡片** - 3D 倾斜悬停效果

### 📝 内容管理
- **MDX 支持** - 支持 Markdown 和 JSX 混合编写
- **语法高亮** - 代码块语法高亮显示
- **文章分类** - 按技术主题分类文章
- **标签系统** - 灵活的文章标签
- **搜索功能** - 全站内容搜索

### 🛠 技术栈
- **Next.js 15** - 最新的 React 框架
- **React 19** - 最新的 React 版本
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 现代化的 CSS 框架
- **Framer Motion** - 强大的动画库
- **Supabase** - 现代化的后端服务
- **Lenis** - 平滑滚动库

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
```

### 环境配置
复制 `.env.local` 文件并配置必要的环境变量：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=现代博客
```

### 数据库设置
1. 在 Supabase 中创建新项目
2. 运行 `supabase/schema.sql` 中的 SQL 脚本
3. 配置环境变量

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。
