# 🚀 快速开始指南

## 1️⃣ 数据库设置（一次性）

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目：`zztvvmywybxdsnowzetc`
3. 点击左侧 "SQL Editor"
4. 点击 "New query"
5. 复制 `scripts/setup-database.sql` 的全部内容并粘贴
6. 点击 "Run" 执行

## 2️⃣ 测试连接

```bash
npm run sync-content:check
```

看到 "✅ Supabase 连接正常" 就成功了！

## 3️⃣ 同步现有内容

```bash
npm run sync-content
```

## 4️⃣ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3006 查看效果！

---

## 📝 日常写作流程

### 创建新文章

```bash
# 1. 创建文件
touch content/posts/2024-01-20-my-article.md

# 2. 编写内容（参考现有文章格式）
code content/posts/2024-01-20-my-article.md

# 3. 同步到数据库
npm run sync-content

# 4. 查看效果
# 访问 http://localhost:3006
```

### 文章格式模板

```markdown
---
title: "你的文章标题"
excerpt: "文章摘要，显示在列表页"
category: "react"  # react, typescript, nextjs 等
tags: ["React", "JavaScript"]
coverImage: "https://images.unsplash.com/photo-xxx"
publishedAt: "2024-01-20T10:00:00Z"
featured: false  # true 为精选文章
---

# 文章正文

这里写你的文章内容...
```

---

## 🎯 常用命令

```bash
# 检查连接
npm run sync-content:check

# 同步所有内容
npm run sync-content

# 同步单个文件
npm run sync-content -- --file content/posts/example.md

# 开发服务器
npm run dev
```

---

## ✅ 完成！

现在你可以：
- ✍️ 用 Markdown 写文章
- 🔄 一键同步到数据库  
- 🌐 在网站上查看效果
- 📱 响应式设计自动适配

**详细文档**: 查看 `README-CONTENT-SYNC.md`
