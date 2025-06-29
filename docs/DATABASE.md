# 🗄️ 数据库配置指南

## 📊 数据库架构

项目使用 Supabase (PostgreSQL) 作为数据库，包含以下主要表：

### 1. articles 表

```sql
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reading_time INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  cover_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. categories 表

```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. tags 表

```sql
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔧 Supabase 配置

### 1. 创建项目

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 点击 "New Project"
3. 选择组织和设置项目名称
4. 选择数据库密码和地区
5. 等待项目创建完成

### 2. 获取配置信息

在项目设置中获取以下信息：

- **Project URL**: `https://your-project.supabase.co`
- **Anon Key**: 用于客户端访问
- **Service Role Key**: 用于服务端访问

### 3. 运行数据库脚本

在 Supabase SQL 编辑器中运行 `scripts/setup-database.sql`：

```sql
-- 创建文章表
CREATE TABLE articles (
  -- 表结构见上方
);

-- 创建分类表
CREATE TABLE categories (
  -- 表结构见上方
);

-- 创建标签表
CREATE TABLE tags (
  -- 表结构见上方
);

-- 创建索引
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_featured ON articles(featured);

-- 启用 RLS (Row Level Security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON tags
  FOR SELECT USING (true);
```

## 🔌 API 接口

### ArticleAPI 类

位置：`src/lib/supabase.ts`

#### 主要方法：

```typescript
// 获取精选文章
static async getFeaturedArticles(limit: number = 3): Promise<Article[]>

// 获取最新文章
static async getLatestArticles(limit: number = 6): Promise<Article[]>

// 获取所有文章（支持分页）
static async getAllArticles(page: number = 1, pageSize: number = 6): Promise<{
  articles: Article[]
  total: number
  totalPages: number
  currentPage: number
}>

// 根据 slug 获取文章
static async getArticleBySlug(slug: string): Promise<Article | null>

// 根据分类获取文章
static async getArticlesByCategory(category: string): Promise<Article[]>

// 搜索文章
static async searchArticles(query: string): Promise<Article[]>

// 增加浏览量
static async incrementViewCount(slug: string): Promise<void>
```

## 📝 内容同步

### 1. Markdown 文件同步

```bash
# 同步 content 目录下的文件
yarn sync-content

# 检查连接
yarn sync-content:check

# 监听文件变化
yarn sync-content:watch
```

### 2. 示例数据同步

```bash
# 同步预设的示例文章
yarn sync-mock-posts
```

### 3. 同步脚本说明

#### sync-content.ts
- 扫描 `content/` 目录下的 Markdown 文件
- 解析 frontmatter 和内容
- 自动生成 slug、阅读时间等
- 同步到 Supabase 数据库

#### sync-mock-posts.ts
- 同步预设的示例文章数据
- 包含完整的文章内容和元数据
- 用于快速填充数据库

## 🔍 数据查询示例

### 获取文章列表

```typescript
// 获取分页文章
const result = await ArticleAPI.getAllArticles(1, 6)
console.log(result.articles) // 文章数组
console.log(result.total)    // 总数
console.log(result.totalPages) // 总页数
```

### 获取单篇文章

```typescript
// 根据 slug 获取文章
const article = await ArticleAPI.getArticleBySlug('react-19-new-features')
if (article) {
  console.log(article.title)
  console.log(article.content)
}
```

### 搜索文章

```typescript
// 搜索文章
const results = await ArticleAPI.searchArticles('React')
console.log(results) // 匹配的文章数组
```

## 🛡️ 安全配置

### Row Level Security (RLS)

已启用 RLS 确保数据安全：

```sql
-- 只允许读取已发布的文章
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (status = 'published');
```

### 环境变量

```env
# 客户端密钥（公开）
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 服务端密钥（私密）
SUPABASE_SERVICE_KEY=your_service_key
```

## 📊 性能优化

### 1. 数据库索引

已创建必要的索引提升查询性能：

```sql
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_featured ON articles(featured);
```

### 2. 分页查询

使用 `range()` 方法实现高效分页：

```typescript
const { data } = await supabase
  .from('articles')
  .select('*')
  .range(from, to)
```

### 3. 缓存策略

- 使用 Next.js 的静态生成 (SSG)
- 实现增量静态再生 (ISR)
- 客户端缓存优化

## 🔧 维护操作

### 备份数据库

```bash
# 使用 Supabase CLI
supabase db dump --file backup.sql
```

### 重置数据库

```bash
# 清空所有表
yarn db:reset

# 重新同步内容
yarn sync-content
yarn sync-mock-posts
```

### 监控性能

在 Supabase Dashboard 中监控：
- 查询性能
- 存储使用量
- API 调用次数

---

**下一步**: [内容管理](./CONTENT-MANAGEMENT.md)
