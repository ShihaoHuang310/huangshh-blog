# 🚀 快速开始指南

## 📋 环境要求

- Node.js 18.0 或更高版本
- Yarn 包管理器
- Git

## 🛠️ 安装步骤

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd blog-next
```

### 2. 安装依赖

```bash
yarn install
```

### 3. 环境变量配置

复制环境变量模板：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置以下变量：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=现代博客

# Email Configuration (可选)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Analytics (可选)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### 4. 数据库设置

#### 4.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取项目 URL 和 API 密钥

#### 4.2 创建数据库表

在 Supabase SQL 编辑器中**分别执行**以下 SQL 语句：

```sql
-- 1. 创建 projects 表
CREATE TABLE IF NOT EXISTS projects (
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

-- 2. 创建 code_examples 表
CREATE TABLE IF NOT EXISTS code_examples (
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

-- 3. 创建 profile 表
CREATE TABLE IF NOT EXISTS profile (
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

-- 4. 创建 skills 表
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 创建 timeline 表
CREATE TABLE IF NOT EXISTS timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 创建 stats 表
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  command TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 启用 RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- 8. 创建访问策略
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (status = 'active');
CREATE POLICY "Allow public read access" ON code_examples FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON stats FOR SELECT USING (true);
```

#### 4.3 验证数据库表

```bash
# 检查数据库表是否创建成功
yarn check-tables
```

### 5. 数据同步

#### 5.1 同步项目数据

```bash
# 同步项目展示数据到数据库
yarn sync-projects
```

#### 5.2 同步 About 页面数据

```bash
# 同步个人信息、技能、时间线、统计数据
yarn sync-about
```

#### 5.3 同步 Markdown 文件

```bash
# 同步 content 目录下的 Markdown 文件到数据库
yarn sync-content
```

#### 5.4 同步示例数据

```bash
# 同步预设的示例文章数据
yarn sync-mock-posts
```

#### 5.5 验证数据同步

```bash
# 查看数据库中的数据
yarn check-data

# 验证数据一致性
yarn verify-data
```

### 6. 启动开发服务器

```bash
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📁 项目结构说明

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── home-client.tsx    # 首页客户端组件
│   ├── posts/             # 文章相关页面
│   │   ├── page.tsx       # 文章列表
│   │   ├── posts-client.tsx
│   │   └── [slug]/        # 文章详情
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   ├── ui/               # 基础 UI 组件
│   ├── blog/             # 博客组件
│   └── three/            # 3D 效果组件
├── lib/                  # 工具库
│   ├── supabase.ts       # 数据库配置
│   └── utils.ts          # 工具函数
└── types/                # 类型定义
```

## 🔧 常用命令

```bash
# 开发
yarn dev                    # 启动开发服务器
yarn build                  # 构建生产版本
yarn start                  # 启动生产服务器
yarn lint                   # 代码检查

# 数据同步
yarn sync-projects          # 同步项目数据
yarn sync-about            # 同步 About 页面数据
yarn sync-content          # 同步 Markdown 内容
yarn sync-mock-posts       # 同步示例数据

# 数据验证
yarn check-tables          # 检查数据库表状态
yarn check-data            # 查看数据库数据
yarn verify-data           # 验证数据一致性

# 数据库管理
yarn sync-content:check    # 检查数据库连接
yarn sync-content:watch    # 监听文件变化并同步
```

## 🎯 下一步

1. **自定义内容**: 编辑 `content/` 目录下的 Markdown 文件
2. **修改样式**: 查看 [样式指南](./STYLING.md)
3. **添加组件**: 查看 [组件文档](./COMPONENTS.md)
4. **部署项目**: 查看 [部署指南](./DEPLOYMENT.md)

## ❗ 常见问题

### 数据库连接失败
- 检查 Supabase URL 和密钥是否正确
- 确认数据库表已创建
- 运行 `yarn check-tables` 验证表状态
- 运行 `yarn sync-content:check` 验证连接

### 数据显示不完整
- 运行 `yarn check-data` 查看数据库中的实际数据
- 运行 `yarn verify-data` 验证数据一致性
- 重新同步数据：`yarn sync-projects` 和 `yarn sync-about`

### 样式不生效
- 确认 Tailwind CSS 配置正确
- 检查 `globals.css` 是否正确导入
- 重启开发服务器

### 文章不显示
- 确认文章已同步到数据库
- 检查文章状态是否为 `published`
- 运行 `yarn sync-content` 重新同步

### 项目页面数据不完整
- 确认数据库表已创建：`yarn check-tables`
- 重新同步项目数据：`yarn sync-projects`
- 验证数据一致性：`yarn verify-data`
- 验证文章格式是否正确

## 📞 获取帮助

如果遇到问题，请：

1. 查看 [常见问题](./FAQ.md)
2. 检查 [更新日志](./CHANGELOG.md)
3. 提交 Issue

---

**下一步**: [数据库配置](./DATABASE.md)
