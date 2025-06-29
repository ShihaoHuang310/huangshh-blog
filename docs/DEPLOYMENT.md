# 🚀 部署指南

## 📋 部署概览

本项目支持多种部署方式，推荐使用 Vercel 进行部署，也支持其他平台如 Netlify、Railway 等。

## 🌟 Vercel 部署（推荐）

### 1. 准备工作

确保你已经：
- 完成了本地开发环境搭建
- 代码已推送到 GitHub/GitLab/Bitbucket
- Supabase 数据库已配置完成

### 2. 连接 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入你的 Git 仓库
4. 选择 "Next.js" 框架预设

### 3. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=现代博客

# Email Configuration (可选)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Analytics (可选)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### 4. 构建配置

Vercel 会自动检测 Next.js 项目，但你可以自定义构建设置：

```json
// vercel.json
{
  "buildCommand": "yarn build",
  "outputDirectory": ".next",
  "installCommand": "yarn install",
  "framework": "nextjs"
}
```

### 5. 部署

1. 点击 "Deploy" 开始部署
2. 等待构建完成
3. 访问生成的 URL 查看网站

### 6. 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 🔧 其他部署平台

### Netlify 部署

1. **连接仓库**
   ```bash
   # 在 Netlify 中导入 Git 仓库
   ```

2. **构建设置**
   ```toml
   # netlify.toml
   [build]
     command = "yarn build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

3. **环境变量**
   在 Netlify 设置中添加相同的环境变量

### Railway 部署

1. **连接仓库**
   ```bash
   # 在 Railway 中连接 GitHub 仓库
   ```

2. **配置文件**
   ```toml
   # railway.toml
   [build]
     builder = "nixpacks"
   
   [deploy]
     startCommand = "yarn start"
   ```

### Docker 部署

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json yarn.lock* ./
   RUN yarn --frozen-lockfile
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN yarn build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     blog:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
         - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
         - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
   ```

## 🔒 生产环境配置

### 1. 安全设置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 安全头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // 图片优化
  images: {
    domains: ['images.unsplash.com', 'your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // 压缩
  compress: true,
  
  // 实验性功能
  experimental: {
    optimizeCss: true
  }
}

module.exports = nextConfig
```

### 2. 性能优化

```javascript
// 启用 SWC 压缩
const nextConfig = {
  swcMinify: true,
  
  // 代码分割
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  
  // 静态导出（如果需要）
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

### 3. 环境变量验证

```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

## 📊 监控和分析

### 1. 性能监控

```typescript
// src/lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

### 2. 错误监控

```typescript
// src/lib/error-tracking.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### 3. 日志记录

```typescript
// src/lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // 发送到日志服务
      console.log(message, data)
    }
  },
  error: (message: string, error?: Error) => {
    if (process.env.NODE_ENV === 'production') {
      // 发送到错误追踪服务
      console.error(message, error)
    }
  }
}
```

## 🔄 CI/CD 配置

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Run tests
        run: yarn test
      
      - name: Build project
        run: yarn build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🌐 CDN 和缓存

### 1. 静态资源优化

```javascript
// next.config.js
const nextConfig = {
  // 静态资源 CDN
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.yourdomain.com' 
    : '',
  
  // 缓存配置
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

### 2. API 缓存

```typescript
// 使用 Next.js 缓存
export const revalidate = 3600 // 1小时

// 或使用 ISR
export async function generateStaticParams() {
  const articles = await ArticleAPI.getAllArticles()
  return articles.articles.map(article => ({
    slug: article.slug
  }))
}
```

## 🔍 SEO 优化

### 1. 站点地图

```typescript
// src/app/sitemap.ts
import { ArticleAPI } from '@/lib/supabase'

export default async function sitemap() {
  const articles = await ArticleAPI.getAllArticles()
  
  const articleUrls = articles.articles.map(article => ({
    url: `https://yourdomain.com/posts/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    ...articleUrls
  ]
}
```

### 2. robots.txt

```typescript
// src/app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: 'https://yourdomain.com/sitemap.xml'
  }
}
```

## 📋 部署检查清单

### 部署前检查

- [ ] 所有环境变量已配置
- [ ] 数据库连接正常
- [ ] 构建成功无错误
- [ ] 测试覆盖率达标
- [ ] 性能测试通过
- [ ] 安全扫描通过

### 部署后验证

- [ ] 网站可正常访问
- [ ] 所有页面加载正常
- [ ] 数据库查询正常
- [ ] 图片资源加载正常
- [ ] SEO 元数据正确
- [ ] 分析工具正常工作

---

**相关文档**: [API 文档](./API.md) | [性能优化](./PERFORMANCE.md)
