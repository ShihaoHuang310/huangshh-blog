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

#### 4.2 运行数据库脚本

```bash
# 在 Supabase SQL 编辑器中运行
# 复制 scripts/setup-database.sql 的内容并执行
```

#### 4.3 验证数据库连接

```bash
yarn sync-content:check
```

### 5. 内容同步

#### 5.1 同步 Markdown 文件

```bash
# 同步 content 目录下的 Markdown 文件到数据库
yarn sync-content
```

#### 5.2 同步示例数据

```bash
# 同步预设的示例文章数据
yarn sync-mock-posts
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

# 内容管理
yarn sync-content           # 同步 Markdown 内容
yarn sync-content:check     # 检查数据库连接
yarn sync-content:watch     # 监听文件变化并同步
yarn sync-mock-posts        # 同步示例数据

# 数据库
yarn db:reset              # 重置数据库（如果需要）
yarn db:seed               # 填充示例数据
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
- 运行 `yarn sync-content:check` 验证连接

### 样式不生效
- 确认 Tailwind CSS 配置正确
- 检查 `globals.css` 是否正确导入
- 重启开发服务器

### 文章不显示
- 确认文章已同步到数据库
- 检查文章状态是否为 `published`
- 验证文章格式是否正确

## 📞 获取帮助

如果遇到问题，请：

1. 查看 [常见问题](./FAQ.md)
2. 检查 [更新日志](./CHANGELOG.md)
3. 提交 Issue

---

**下一步**: [数据库配置](./DATABASE.md)
