# 🗄️ 数据库配置指南

## 📊 数据库架构

项目使用 Supabase (PostgreSQL) 作为数据库，包含以下主要表：

## 📊 数据库状态

### 当前实现状态
- ✅ **文章系统**: 完整实现，包含文章、分类、标签
- ✅ **内容同步**: Markdown 到数据库的自动同步
- ✅ **项目展示**: 完整实现，包含项目和代码示例
- ✅ **个人信息**: 完整实现，包含技能、时间线、统计
- ✅ **数据验证**: 完整的数据一致性检查工具
- ⏳ **用户系统**: 计划中
- ⏳ **评论系统**: 计划中

### 数据库表统计
- **articles**: 文章数据
- **categories**: 文章分类
- **tags**: 文章标签
- **projects**: 项目数据 (6 条记录)
- **code_examples**: 代码示例 (3 条记录)
- **profile**: 个人信息 (1 条记录)
- **skills**: 技能数据 (14 条记录)
- **timeline**: 时间线 (4 条记录)
- **stats**: 统计信息 (8 条记录)

## 📋 数据表结构

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

### 4. projects 表

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. code_examples 表

```sql
CREATE TABLE code_examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. profile 表

```sql
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  email TEXT,
  avatar_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. skills 表

```sql
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. timeline 表

```sql
CREATE TABLE timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 9. stats 表

```sql
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  command TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
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

-- 创建项目相关表
CREATE TABLE projects (
  -- 表结构见上方
);

CREATE TABLE code_examples (
  -- 表结构见上方
);

CREATE TABLE profile (
  -- 表结构见上方
);

CREATE TABLE skills (
  -- 表结构见上方
);

CREATE TABLE timeline (
  -- 表结构见上方
);

CREATE TABLE stats (
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
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow public read access" ON code_examples
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON profile
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON timeline
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON stats
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

### ProjectAPI 类

```typescript
// 获取所有项目
static async getAllProjects(): Promise<Project[]>

// 获取精选项目
static async getFeaturedProjects(): Promise<Project[]>

// 根据 ID 获取项目
static async getProjectById(id: string): Promise<Project | null>

// 创建项目
static async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project>

// 更新项目
static async updateProject(id: string, updates: Partial<Project>): Promise<Project>

// 删除项目
static async deleteProject(id: string): Promise<void>
```

### CodeExampleAPI 类

```typescript
// 获取所有代码示例
static async getAllCodeExamples(): Promise<CodeExample[]>

// 获取精选代码示例
static async getFeaturedCodeExamples(): Promise<CodeExample[]>

// 根据语言获取代码示例
static async getCodeExamplesByLanguage(language: string): Promise<CodeExample[]>

// 创建代码示例
static async createCodeExample(example: Omit<CodeExample, 'id' | 'created_at' | 'updated_at'>): Promise<CodeExample>
```

### ProfileAPI 类

```typescript
// 获取个人信息
static async getProfile(): Promise<Profile | null>

// 更新个人信息
static async updateProfile(updates: Partial<Profile>): Promise<Profile>
```

### SkillAPI 类

```typescript
// 获取所有技能
static async getAllSkills(): Promise<Skill[]>

// 根据分类获取技能
static async getSkillsByCategory(category: string): Promise<Skill[]>

// 创建技能
static async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill>
```

### TimelineAPI 类

```typescript
// 获取所有时间线
static async getAllTimeline(): Promise<Timeline[]>

// 创建时间线项目
static async createTimelineItem(item: Omit<Timeline, 'id' | 'created_at' | 'updated_at'>): Promise<Timeline>
```

### StatAPI 类

```typescript
// 获取所有统计
static async getAllStats(): Promise<Stat[]>

// 更新统计
static async updateStat(id: string, updates: Partial<Stat>): Promise<Stat>
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

### 2. 项目数据同步

```bash
# 同步项目数据
yarn sync-projects

# 同步 About 页面数据
yarn sync-about

# 检查数据库表状态
yarn check-tables

# 检查数据库数据
yarn check-data

# 验证数据一致性
yarn verify-data
```

### 3. 示例数据同步

```bash
# 同步预设的示例文章
yarn sync-mock-posts
```

### 4. 同步脚本说明

#### sync-content.ts
- 扫描 `content/` 目录下的 Markdown 文件
- 解析 frontmatter 和内容
- 自动生成 slug、阅读时间等
- 同步到 Supabase 数据库

#### sync-projects-data.ts
- 同步项目数据到 projects 表
- 同步代码示例到 code_examples 表
- 包含完整的项目信息和代码示例

#### sync-about-data.ts
- 同步个人信息到 profile 表
- 同步技能数据到 skills 表
- 同步时间线到 timeline 表
- 同步统计信息到 stats 表

#### check-tables.ts
- 检查数据库表是否存在
- 验证表结构和权限
- 统计数据行数

#### check-data.ts
- 显示数据库中的实际数据
- 按分类展示详细信息
- 用于数据验证

#### verify-data-consistency.ts
- 验证静态数据与数据库数据的一致性
- 生成详细的数据对比报告
- 确保页面显示正确

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
