# 📝 内容管理指南

## 📁 内容结构

### Markdown 文件格式

在 `content/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
excerpt: "文章摘要，简短描述文章内容"
category: "分类名称"
tags: ["标签1", "标签2", "标签3"]
publishedAt: "2024-01-15"
featured: true
coverImage: "https://example.com/image.jpg"
seoTitle: "SEO 标题（可选）"
seoDescription: "SEO 描述（可选）"
seoKeywords: ["关键词1", "关键词2"]
---

# 文章标题

这里是文章的正文内容，支持完整的 Markdown 语法。

## 二级标题

### 三级标题

- 列表项 1
- 列表项 2
- 列表项 3

```javascript
// 代码块示例
const example = "Hello World";
console.log(example);
```

> 引用文本示例

**粗体文本** 和 *斜体文本*

[链接示例](https://example.com)
```

### 必需字段

- `title`: 文章标题
- `excerpt`: 文章摘要
- `category`: 文章分类
- `publishedAt`: 发布日期

### 可选字段

- `tags`: 标签数组
- `featured`: 是否为精选文章
- `coverImage`: 封面图片 URL
- `seoTitle`: SEO 标题
- `seoDescription`: SEO 描述
- `seoKeywords`: SEO 关键词

## 🔄 内容同步

### 1. 自动同步

```bash
# 同步所有 Markdown 文件到数据库
yarn sync-content

# 检查数据库连接
yarn sync-content:check

# 监听文件变化并自动同步
yarn sync-content:watch
```

### 2. 同步过程

1. **扫描文件**: 遍历 `content/posts/` 目录
2. **解析内容**: 提取 frontmatter 和正文
3. **生成数据**: 自动生成 slug、阅读时间等
4. **数据库操作**: 插入或更新数据库记录

### 3. 同步规则

- 文件名作为 slug（去除 `.md` 扩展名）
- 自动计算阅读时间（基于字数）
- 重复同步会更新现有记录
- 删除文件不会自动删除数据库记录

## 📊 内容管理功能

### 1. 文章状态

```typescript
type ArticleStatus = 'draft' | 'published' | 'archived'
```

- `draft`: 草稿状态，不会在前端显示
- `published`: 已发布，正常显示
- `archived`: 已归档，不会在列表中显示

### 2. 分类管理

支持的分类示例：
- React
- Next.js
- TypeScript
- JavaScript
- CSS
- Vue
- 工具链

### 3. 标签系统

- 支持多标签
- 自动生成标签页面
- 标签云展示

### 4. 精选文章

设置 `featured: true` 的文章会：
- 在首页精选区域显示
- 获得特殊的视觉标识
- 优先展示给用户

## 🖼️ 图片管理

### 1. 封面图片

推荐尺寸：1200x600px

```markdown
---
coverImage: "https://images.unsplash.com/photo-xxx"
---
```

### 2. 文章内图片

```markdown
![图片描述](https://example.com/image.jpg)

<!-- 或使用 HTML -->
<img src="https://example.com/image.jpg" alt="图片描述" width="800" height="400" />
```

### 3. 图片优化建议

- 使用 WebP 格式
- 压缩图片大小
- 提供 alt 文本
- 使用 CDN 加速

## 📈 SEO 优化

### 1. 元数据配置

```markdown
---
seoTitle: "优化的页面标题 - 网站名称"
seoDescription: "页面描述，控制在 160 字符以内"
seoKeywords: ["关键词1", "关键词2", "关键词3"]
---
```

### 2. URL 结构

- 文章 URL: `/posts/[slug]`
- 分类 URL: `/category/[category]`
- 标签 URL: `/tag/[tag]`

### 3. 结构化数据

自动生成 JSON-LD 结构化数据：

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章标题",
  "description": "文章描述",
  "author": {
    "@type": "Person",
    "name": "作者名称"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15"
}
```

## 🔧 高级功能

### 1. 代码高亮

支持多种编程语言：

```markdown
```javascript
const example = "Hello World";
```

```python
def hello_world():
    print("Hello World")
```

```css
.example {
  color: #333;
  font-size: 16px;
}
```
```

### 2. 数学公式

支持 LaTeX 数学公式：

```markdown
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 3. 表格支持

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

### 4. 任务列表

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务
```

## 📝 内容创建工作流

### 1. 创建新文章

```bash
# 1. 在 content/posts/ 目录创建新的 .md 文件
touch content/posts/new-article.md

# 2. 编写文章内容
# 3. 同步到数据库
yarn sync-content

# 4. 预览效果
yarn dev
```

### 2. 批量导入

```bash
# 将多个 Markdown 文件放入 content/posts/
# 然后批量同步
yarn sync-content
```

### 3. 内容更新

```bash
# 修改 Markdown 文件后重新同步
yarn sync-content

# 或使用监听模式
yarn sync-content:watch
```

## 🔍 内容搜索

### 1. 全文搜索

支持搜索：
- 文章标题
- 文章内容
- 标签
- 分类

### 2. 筛选功能

- 按分类筛选
- 按标签筛选
- 按发布时间排序
- 按阅读量排序

## 📊 统计信息

### 1. 阅读统计

- 文章阅读量
- 阅读时间估算
- 热门文章排行

### 2. 内容统计

- 总文章数
- 分类统计
- 标签使用频率

## 🛠️ 故障排除

### 常见问题

1. **同步失败**
   ```bash
   # 检查数据库连接
   yarn sync-content:check
   
   # 查看错误日志
   yarn sync-content --verbose
   ```

2. **文章不显示**
   - 检查文章状态是否为 `published`
   - 确认 frontmatter 格式正确
   - 验证数据库中是否有记录

3. **图片不显示**
   - 检查图片 URL 是否有效
   - 确认图片服务器支持跨域访问
   - 验证图片格式是否支持

### 调试命令

```bash
# 详细日志模式
yarn sync-content --verbose

# 强制重新同步
yarn sync-content --force

# 只同步特定文件
yarn sync-content --file content/posts/example.md
```

---

**下一步**: [组件文档](./COMPONENTS.md)
