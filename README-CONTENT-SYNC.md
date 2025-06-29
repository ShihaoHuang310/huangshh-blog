# 📝 博客内容管理系统使用指南

这是一个基于 Next.js 15 + Supabase 的现代博客平台，支持 Markdown 文件到数据库的自动同步。

## 🚀 快速开始

### 1. 环境配置

确保你的 `.env.local` 文件包含以下配置：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zztvvmywybxdsnowzetc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dHZ2bXl3eWJ4ZHNub3d6ZXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjY1ODUsImV4cCI6MjA2NjcwMjU4NX0.drt9J1tRg65tyUsVSck0nWL_ekJ8tK8Cx4mH2f8MfkA
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dHZ2bXl3eWJ4ZHNub3d6ZXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTEyNjU4NSwiZXhwIjoyMDY2NzAyNTg1fQ.uAlyyD3NyQ58OohaxfjTPIgzbn5z5W6x_ZDPWi_4u5A
```

### 2. 数据库初始化

在 Supabase Dashboard 的 SQL Editor 中执行 `scripts/setup-database.sql` 文件中的所有 SQL 语句。

### 3. 安装依赖

```bash
npm install
```

### 4. 测试连接

```bash
npm run sync-content:check
```

如果看到 "✅ Supabase 连接正常"，说明配置成功。

## 📁 项目结构

```
blog-next/
├── content/                    # 内容目录
│   ├── posts/                 # Markdown 文章
│   │   ├── 2024-01-15-react-19-features.md
│   │   ├── 2024-01-10-typescript-5-guide.md
│   │   └── 2024-01-05-nextjs-performance.md
│   └── categories/            # 分类配置
│       ├── react.json
│       ├── typescript.json
│       └── nextjs.json
├── lib/
│   ├── supabase.ts           # Supabase 客户端和 API
│   └── content-sync.ts       # 内容同步逻辑
├── scripts/
│   ├── setup-database.sql    # 数据库初始化脚本
│   └── sync-content.ts       # 同步脚本
└── src/app/
    ├── page.tsx              # 首页（使用真实数据）
    └── posts/
        ├── page.tsx          # 文章列表页
        └── [slug]/
            └── page.tsx      # 文章详情页
```

## ✍️ 写作工作流程

### 1. 创建新文章

在 `content/posts/` 目录下创建新的 Markdown 文件：

```bash
touch content/posts/2024-01-20-my-new-article.md
```

### 2. 编写文章内容

使用以下格式编写文章：

```markdown
---
title: "文章标题"
excerpt: "文章摘要，会显示在列表页"
category: "react"  # 必须是已存在的分类 slug
tags: ["React", "JavaScript", "前端开发"]
coverImage: "https://images.unsplash.com/photo-xxx"
publishedAt: "2024-01-20T10:00:00Z"
featured: true  # 是否为精选文章
seoTitle: "SEO 标题（可选）"
seoDescription: "SEO 描述（可选）"
seoKeywords: ["关键词1", "关键词2"]
---

# 文章正文

这里是文章的正文内容，支持完整的 Markdown 语法。

## 二级标题

### 三级标题

- 列表项 1
- 列表项 2

\`\`\`javascript
// 代码块
const example = "Hello World";
\`\`\`

更多内容...
```

### 3. 同步到数据库

```bash
# 同步所有内容
npm run sync-content

# 或者只同步单个文件
npm run sync-content -- --file content/posts/2024-01-20-my-new-article.md
```

### 4. 查看结果

访问 http://localhost:3006 查看你的文章是否正确显示。

## 🎯 可用命令

```bash
# 开发服务器
npm run dev

# 检查 Supabase 连接
npm run sync-content:check

# 同步所有内容到数据库
npm run sync-content

# 同步单个文件
npm run sync-content -- --file content/posts/example.md

# 监听文件变化并自动同步（开发中）
npm run sync-content:watch
```

## 📊 数据库结构

### 主要表

- **articles**: 文章主表
- **categories**: 分类表
- **tags**: 标签表
- **article_tags**: 文章标签关联表
- **comments**: 评论表（预留）
- **article_stats**: 文章统计表

### 重要字段

#### articles 表
- `slug`: URL 友好的文章标识符
- `status`: 文章状态（draft/published/archived）
- `featured`: 是否为精选文章
- `reading_time`: 预计阅读时间（自动计算）
- `view_count`: 浏览次数
- `seo_*`: SEO 相关字段

## 🔧 高级功能

### 1. 分类管理

在 `content/categories/` 目录下创建 JSON 文件：

```json
{
  "name": "分类名称",
  "slug": "category-slug",
  "description": "分类描述",
  "color": "#FF6B6B",
  "icon": "Code"
}
```

### 2. 自动化同步

可以设置 Git Hooks 实现自动同步：

```bash
# .git/hooks/post-commit
#!/bin/sh
if git diff --name-only HEAD~1 HEAD | grep -q "^content/"; then
  npm run sync-content
fi
```

### 3. 批量操作

```bash
# 同步所有分类
npm run sync-content -- --categories-only

# 重新计算所有统计数据
npm run sync-content -- --update-stats-only
```

## 🚨 注意事项

### 1. 文件命名规范

- 文章文件名格式：`YYYY-MM-DD-article-slug.md`
- slug 必须唯一，用于生成 URL
- 使用小写字母和连字符

### 2. 图片处理

- 推荐使用 Unsplash 等外部图片服务
- 确保图片 URL 可公开访问
- 建议尺寸：封面图 1200x600px

### 3. SEO 优化

- 每篇文章都应该有 `seoTitle` 和 `seoDescription`
- 标题长度控制在 60 字符以内
- 描述长度控制在 160 字符以内

### 4. 性能考虑

- 文章内容会被完整存储在数据库中
- 大量文章时考虑分页加载
- 图片使用 CDN 加速

## 🐛 故障排除

### 同步失败

```bash
# 检查环境变量
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_KEY

# 检查数据库连接
npm run sync-content:check

# 查看详细错误信息
npm run sync-content 2>&1 | tee sync.log
```

### 文章不显示

1. 检查文章的 `status` 字段是否为 `published`
2. 确认 `publishedAt` 时间不是未来时间
3. 验证 Markdown 前置元数据格式是否正确

### 图片不显示

1. 确认图片 URL 可以直接访问
2. 检查 CORS 设置
3. 使用 HTTPS 图片链接

## 📈 扩展功能

### 1. 评论系统

数据库已预留 `comments` 表，可以扩展评论功能。

### 2. 搜索功能

可以使用 Supabase 的全文搜索功能：

```sql
SELECT * FROM articles 
WHERE to_tsvector('chinese', title || ' ' || content) 
@@ plainto_tsquery('chinese', '搜索关键词');
```

### 3. 标签云

利用 `tags` 表的 `article_count` 字段实现标签云。

### 4. 相关文章推荐

基于标签和分类实现相关文章推荐算法。

## 🎉 总结

这个系统提供了：

✅ **简单的写作体验**: 使用熟悉的 Markdown 格式  
✅ **自动化同步**: 一键同步到数据库  
✅ **SEO 友好**: 完整的 SEO 元数据支持  
✅ **高性能**: 基于 Next.js 15 和 Supabase  
✅ **可扩展**: 模块化设计，易于扩展功能  

现在你可以专注于内容创作，技术细节都已经自动化处理！

---

**需要帮助？** 查看项目的 GitHub Issues 或联系开发团队。
