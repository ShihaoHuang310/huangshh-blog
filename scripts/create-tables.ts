#!/usr/bin/env tsx

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// 加载环境变量
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

console.log('🔍 检查环境变量...')
console.log('Supabase URL:', supabaseUrl ? '✅ 已设置' : '❌ 未设置')
console.log('Service Key:', supabaseServiceKey ? '✅ 已设置' : '❌ 未设置')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少必要的环境变量')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const createTablesSQL = `
-- 项目表
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

-- 代码示例表
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

-- 个人信息表
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

-- 技能表
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 编程历程/时间线表
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

-- 统计信息表
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

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

CREATE INDEX IF NOT EXISTS idx_code_examples_language ON code_examples(language);
CREATE INDEX IF NOT EXISTS idx_code_examples_featured ON code_examples(featured);
CREATE INDEX IF NOT EXISTS idx_code_examples_sort_order ON code_examples(sort_order);

CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_sort_order ON skills(sort_order);

CREATE INDEX IF NOT EXISTS idx_timeline_year ON timeline(year);
CREATE INDEX IF NOT EXISTS idx_timeline_sort_order ON timeline(sort_order);

CREATE INDEX IF NOT EXISTS idx_stats_sort_order ON stats(sort_order);

-- 启用 RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- 删除可能存在的策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public read access" ON code_examples;
DROP POLICY IF EXISTS "Allow public read access" ON profile;
DROP POLICY IF EXISTS "Allow public read access" ON skills;
DROP POLICY IF EXISTS "Allow public read access" ON timeline;
DROP POLICY IF EXISTS "Allow public read access" ON stats;

-- 创建公开读取策略
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
`

async function createTables() {
  console.log('🚀 开始创建数据库表...')

  try {
    // 执行 SQL 创建表
    const { error } = await supabase.rpc('exec_sql', { sql: createTablesSQL })

    if (error) {
      console.error('❌ 创建表失败，尝试使用 SQL 编辑器方式:', error.message)
      console.log('\n📋 请在 Supabase SQL 编辑器中手动执行以下 SQL:')
      console.log('='.repeat(50))
      console.log(createTablesSQL)
      console.log('='.repeat(50))
      return
    }

    console.log('✅ 数据库表创建成功！')
  } catch (error) {
    console.error('❌ 创建表时发生错误:', error)
    console.log('\n📋 请在 Supabase SQL 编辑器中手动执行以下 SQL:')
    console.log('='.repeat(50))
    console.log(createTablesSQL)
    console.log('='.repeat(50))
  }
}

// 运行创建表
createTables()
