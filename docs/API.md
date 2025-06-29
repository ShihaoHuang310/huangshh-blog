# 🔌 API 文档

## 📋 API 概览

项目使用 Supabase 作为后端服务，通过 `ArticleAPI` 类提供统一的数据访问接口。

## 🏗️ 架构设计

```
Frontend (Next.js) → ArticleAPI → Supabase (PostgreSQL)
```

- **Frontend**: Next.js 应用，处理 UI 和用户交互
- **ArticleAPI**: 数据访问层，封装所有数据库操作
- **Supabase**: 后端服务，提供数据库和 API

## 📊 数据模型

### Article 接口

```typescript
interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  published_at: string
  updated_at: string
  reading_time: number
  view_count: number
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  cover_image?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  created_at: string
}
```

### Category 接口

```typescript
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
}
```

### Tag 接口

```typescript
interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}
```

## 🔧 ArticleAPI 方法

### 获取文章

#### getFeaturedArticles()

获取精选文章列表。

```typescript
static async getFeaturedArticles(limit: number = 3): Promise<Article[]>
```

**参数**:
- `limit` (可选): 返回文章数量，默认 3

**返回**: `Article[]` - 精选文章数组

**示例**:
```typescript
const featuredPosts = await ArticleAPI.getFeaturedArticles(5)
```

#### getLatestArticles()

获取最新文章列表。

```typescript
static async getLatestArticles(limit: number = 6): Promise<Article[]>
```

**参数**:
- `limit` (可选): 返回文章数量，默认 6

**返回**: `Article[]` - 最新文章数组

#### getAllArticles()

获取所有文章，支持分页。

```typescript
static async getAllArticles(
  page: number = 1,
  pageSize: number = 6
): Promise<{
  articles: Article[]
  total: number
  totalPages: number
  currentPage: number
}>
```

**参数**:
- `page` (可选): 页码，从 1 开始，默认 1
- `pageSize` (可选): 每页文章数，默认 6

**返回**: 分页结果对象
- `articles`: 当前页文章数组
- `total`: 总文章数
- `totalPages`: 总页数
- `currentPage`: 当前页码

**示例**:
```typescript
const result = await ArticleAPI.getAllArticles(2, 10)
console.log(`第 ${result.currentPage} 页，共 ${result.totalPages} 页`)
console.log(`总共 ${result.total} 篇文章`)
console.log(result.articles) // 当前页文章
```

#### getArticleBySlug()

根据 slug 获取单篇文章。

```typescript
static async getArticleBySlug(slug: string): Promise<Article | null>
```

**参数**:
- `slug`: 文章的 URL slug

**返回**: `Article | null` - 文章对象或 null

**示例**:
```typescript
const article = await ArticleAPI.getArticleBySlug('react-19-new-features')
if (article) {
  console.log(article.title)
}
```

#### getArticlesByCategory()

根据分类获取文章。

```typescript
static async getArticlesByCategory(category: string): Promise<Article[]>
```

**参数**:
- `category`: 分类名称

**返回**: `Article[]` - 该分类下的文章数组

#### searchArticles()

搜索文章。

```typescript
static async searchArticles(query: string): Promise<Article[]>
```

**参数**:
- `query`: 搜索关键词

**返回**: `Article[]` - 匹配的文章数组

**搜索范围**:
- 文章标题
- 文章内容
- 文章摘要
- 标签

### 统计功能

#### incrementViewCount()

增加文章浏览量。

```typescript
static async incrementViewCount(slug: string): Promise<void>
```

**参数**:
- `slug`: 文章的 URL slug

**示例**:
```typescript
await ArticleAPI.incrementViewCount('react-19-new-features')
```

### 分类和标签

#### getAllCategories()

获取所有分类。

```typescript
static async getAllCategories(): Promise<Category[]>
```

#### getAllTags()

获取所有标签。

```typescript
static async getAllTags(): Promise<Tag[]>
```

#### getPopularTags()

获取热门标签。

```typescript
static async getPopularTags(limit: number = 10): Promise<Tag[]>
```

## 🔍 查询示例

### 基础查询

```typescript
// 获取首页精选文章
const featuredPosts = await ArticleAPI.getFeaturedArticles(3)

// 获取文章列表（第一页）
const result = await ArticleAPI.getAllArticles(1, 6)

// 获取单篇文章
const article = await ArticleAPI.getArticleBySlug('my-article')
```

### 高级查询

```typescript
// 分页查询
async function getArticlesWithPagination(page: number) {
  const result = await ArticleAPI.getAllArticles(page, 10)
  return {
    articles: result.articles,
    pagination: {
      current: result.currentPage,
      total: result.totalPages,
      hasNext: result.currentPage < result.totalPages,
      hasPrev: result.currentPage > 1
    }
  }
}

// 搜索功能
async function searchWithFilters(query: string, category?: string) {
  let articles = await ArticleAPI.searchArticles(query)
  
  if (category) {
    articles = articles.filter(article => article.category === category)
  }
  
  return articles
}
```

## 🛡️ 错误处理

### 错误类型

```typescript
// 网络错误
try {
  const articles = await ArticleAPI.getAllArticles()
} catch (error) {
  console.error('获取文章失败:', error)
  // 显示错误提示
}

// 文章不存在
const article = await ArticleAPI.getArticleBySlug('non-existent')
if (!article) {
  // 显示 404 页面
  notFound()
}
```

### 重试机制

```typescript
async function getArticlesWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await ArticleAPI.getAllArticles()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

## 🚀 性能优化

### 缓存策略

```typescript
// Next.js 静态生成
export async function generateStaticParams() {
  const articles = await ArticleAPI.getAllArticles()
  return articles.articles.map(article => ({
    slug: article.slug
  }))
}

// 增量静态再生
export const revalidate = 3600 // 1小时
```

### 数据预取

```typescript
// 预取相关文章
async function getArticleWithRelated(slug: string) {
  const [article, relatedArticles] = await Promise.all([
    ArticleAPI.getArticleBySlug(slug),
    ArticleAPI.getLatestArticles(3)
  ])
  
  return { article, relatedArticles }
}
```

## 🔧 自定义扩展

### 添加新的 API 方法

```typescript
// 在 ArticleAPI 类中添加新方法
static async getArticlesByTag(tag: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .contains('tags', [tag])
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('获取标签文章失败:', error)
    return []
  }

  return data || []
}
```

### 自定义查询

```typescript
// 复杂查询示例
static async getArticlesWithStats(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, color),
      article_stats(view_count, like_count)
    `)
    .eq('status', 'published')

  if (error) throw error
  return data || []
}
```

## 📊 API 监控

### 性能监控

```typescript
// 添加性能监控
static async getAllArticles(page = 1, pageSize = 6) {
  const startTime = Date.now()
  
  try {
    const result = await this.performQuery(page, pageSize)
    const duration = Date.now() - startTime
    
    // 记录性能指标
    console.log(`查询耗时: ${duration}ms`)
    
    return result
  } catch (error) {
    // 记录错误
    console.error('API 调用失败:', error)
    throw error
  }
}
```

### 使用统计

```typescript
// 记录 API 使用情况
static async trackAPIUsage(method: string, params: any) {
  // 发送到分析服务
  analytics.track('api_call', {
    method,
    params,
    timestamp: new Date().toISOString()
  })
}
```

---

**下一步**: [部署指南](./DEPLOYMENT.md)
