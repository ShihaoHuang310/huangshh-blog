# 🔗 数据库集成完整指南

## 📋 概述

本文档详细记录了项目的数据库集成过程，包括表结构设计、数据同步、API 实现和数据一致性验证。

## 🎯 集成目标

- ✅ 完整的数据库架构设计
- ✅ 项目展示数据管理
- ✅ 个人信息和技能管理
- ✅ 时间线和统计信息管理
- ✅ 数据同步和验证工具
- ✅ 静态数据与数据库数据一致性

## 📊 数据库表详情

### 1. projects 表 (6 条记录)

**用途**: 存储项目展示数据

**字段说明**:
- `id`: 主键 UUID
- `title`: 项目标题
- `description`: 项目描述
- `tech`: 技术栈数组
- `demo_url`: 演示链接
- `github_url`: GitHub 链接
- `featured`: 是否精选
- `sort_order`: 排序顺序
- `status`: 状态 (active/archived/draft)

**数据示例**:
1. React Component Library (featured)
2. 3D Portfolio Website (featured)
3. Code Editor Theme
4. Animation Playground
5. Next.js Blog Template (featured)
6. TypeScript Utilities

### 2. code_examples 表 (3 条记录)

**用途**: 存储代码示例数据

**字段说明**:
- `id`: 主键 UUID
- `title`: 示例标题
- `description`: 示例描述
- `language`: 编程语言
- `code`: 代码内容
- `sort_order`: 排序顺序
- `featured`: 是否精选

**数据示例**:
1. React Hook: useLocalStorage (TypeScript)
2. CSS Animation: Floating Elements (CSS)
3. Three.js: Particle System (JavaScript)

### 3. profile 表 (1 条记录)

**用途**: 存储个人信息

**字段说明**:
- `id`: 主键 UUID
- `name`: 姓名
- `title`: 职位
- `bio`: 个人简介
- `location`: 位置
- `email`: 邮箱
- `avatar_url`: 头像链接
- `github_url`: GitHub 链接
- `twitter_url`: Twitter 链接
- `linkedin_url`: LinkedIn 链接
- `website_url`: 个人网站

### 4. skills 表 (14 条记录)

**用途**: 存储技能数据

**字段说明**:
- `id`: 主键 UUID
- `name`: 技能名称
- `level`: 技能等级 (0-100)
- `category`: 技能分类
- `sort_order`: 排序顺序

**分类统计**:
- **Frontend**: 7 个技能 (React, TypeScript, Next.js, JavaScript, Three.js, CSS/SCSS, Tailwind CSS)
- **Backend**: 3 个技能 (Node.js, PostgreSQL, Supabase)
- **Tools**: 3 个技能 (Git, Docker, AWS)
- **Design**: 1 个技能 (Figma)

### 5. timeline 表 (4 条记录)

**用途**: 存储时间线数据

**字段说明**:
- `id`: 主键 UUID
- `year`: 年份
- `title`: 职位/事件标题
- `company`: 公司/机构
- `description`: 描述
- `sort_order`: 排序顺序

**数据示例**:
1. 2024 - 高级前端工程师 @ 科技公司
2. 2022 - 前端工程师 @ 创业公司
3. 2020 - 初级前端开发者 @ 互联网公司
4. 2019 - 计算机科学学士 @ 某大学

### 6. stats 表 (8 条记录)

**用途**: 存储统计信息

**字段说明**:
- `id`: 主键 UUID
- `label`: 统计标签
- `value`: 统计值
- `icon`: 图标
- `command`: 命令行命令
- `sort_order`: 排序顺序

**数据示例**:
1. Lines of Code Written: 100,000+
2. GitHub Repositories: 50+
3. Years of Experience: 5+
4. Coffee Cups: ∞
5. 编程经验: 5+ 年
6. 博客文章: 50+ 篇
7. 开源项目: 10+ 个
8. 技术分享: 20+ 次

## 🔧 数据同步工具

### 同步脚本

```bash
# 项目数据同步
yarn sync-projects    # 同步 projects 和 code_examples 表

# About 页面数据同步
yarn sync-about       # 同步 profile, skills, timeline, stats 表

# 数据验证工具
yarn check-tables     # 检查表是否存在
yarn check-data       # 查看数据库中的实际数据
yarn verify-data      # 验证数据一致性
```

### 脚本功能说明

#### sync-projects-data.ts
- 清空并重新插入 projects 表数据
- 清空并重新插入 code_examples 表数据
- 包含完整的项目信息和代码示例
- 自动处理数据类型转换

#### sync-about-data.ts
- 清空并重新插入 profile 表数据
- 清空并重新插入 skills 表数据
- 清空并重新插入 timeline 表数据
- 清空并重新插入 stats 表数据
- 确保数据完整性和一致性

#### check-tables.ts
- 验证所有表是否存在
- 检查表的访问权限
- 统计每个表的数据行数
- 验证 RLS 策略

#### check-data.ts
- 显示每个表的详细数据
- 按分类展示技能数据
- 提供完整的数据概览
- 用于数据验证和调试

#### verify-data-consistency.ts
- 对比静态数据与数据库数据
- 生成详细的一致性报告
- 确保页面显示正确
- 提供数据修复建议

## 🔌 API 接口实现

### 完整的 API 类

位置: `src/lib/supabase.ts`

#### ProjectAPI
- `getAllProjects()`: 获取所有项目
- `getFeaturedProjects()`: 获取精选项目
- `getProjectById(id)`: 根据 ID 获取项目
- `createProject()`: 创建项目
- `updateProject()`: 更新项目
- `deleteProject()`: 删除项目

#### CodeExampleAPI
- `getAllCodeExamples()`: 获取所有代码示例
- `getFeaturedCodeExamples()`: 获取精选代码示例
- `getCodeExamplesByLanguage()`: 根据语言获取示例

#### ProfileAPI
- `getProfile()`: 获取个人信息
- `updateProfile()`: 更新个人信息

#### SkillAPI
- `getAllSkills()`: 获取所有技能
- `getSkillsByCategory()`: 根据分类获取技能

#### TimelineAPI
- `getAllTimeline()`: 获取所有时间线

#### StatAPI
- `getAllStats()`: 获取所有统计信息

## 🎯 数据一致性策略

### 当前实现

由于 Next.js 15 服务端渲染的数据库连接问题，项目采用了以下策略：

1. **静态数据方案**: 在页面组件中使用静态数据，确保页面正常渲染
2. **数据库就绪**: 所有数据库表和 API 接口完全准备就绪
3. **数据同步**: 静态数据与数据库数据完全一致
4. **验证工具**: 提供完整的数据验证和一致性检查

### 数据一致性保证

- ✅ Projects 页面: 6 个项目 + 3 个代码示例
- ✅ About 页面: 4 个技能分类 + 4 个时间线 + 8 个统计项目
- ✅ 所有数据与数据库完全同步
- ✅ 提供验证脚本确保一致性

## 🚀 未来迁移计划

当需要切换到数据库数据时，可以考虑：

1. **客户端渲染**: 将数据获取移到客户端组件
2. **API 路由**: 创建 Next.js API 路由处理数据库查询
3. **静态生成**: 使用 `generateStaticParams` 在构建时获取数据

## 📝 维护指南

### 数据更新流程

1. 修改数据库中的数据
2. 运行 `yarn check-data` 查看最新数据
3. 更新对应页面的静态数据
4. 运行 `yarn verify-data` 验证一致性
5. 测试页面显示效果

### 故障排除

- 如果页面显示数据不完整，运行 `yarn verify-data` 检查一致性
- 如果数据库连接失败，检查环境变量配置
- 如果表不存在，重新运行表创建 SQL 脚本

---

**最后更新**: 2024-12-29  
**状态**: 数据库集成完成，数据一致性验证通过
