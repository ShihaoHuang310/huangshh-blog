-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  website TEXT,
  social JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_view_count ON posts(view_count);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(active);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts 
  SET view_count = view_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO authors (id, name, email, avatar, bio, website, social) VALUES
(
  '550e8400-e29b-41d4-a716-446655440000',
  '博客作者',
  'author@example.com',
  '/images/avatar.jpg',
  '热爱技术分享的前端开发者，专注于 React、Next.js 和现代前端技术栈。',
  'https://example.com',
  '{"github": "https://github.com/username", "twitter": "https://twitter.com/username", "linkedin": "https://linkedin.com/in/username"}'::jsonb
) ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (name, slug, description, color) VALUES
('React', 'react', 'React 相关技术文章', '#61DAFB'),
('Next.js', 'nextjs', 'Next.js 框架相关内容', '#000000'),
('TypeScript', 'typescript', 'TypeScript 类型系统和最佳实践', '#3178C6'),
('CSS', 'css', 'CSS 样式和布局技巧', '#1572B6'),
('JavaScript', 'javascript', 'JavaScript 语言特性和技巧', '#F7DF1E'),
('性能优化', 'performance', 'Web 性能优化相关技术', '#FF6B6B'),
('工具链', 'tooling', '开发工具和构建工具', '#4ECDC4'),
('设计', 'design', 'UI/UX 设计相关内容', '#FF8A80')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (
  id,
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  published_at,
  reading_time,
  featured,
  author_id
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  '深入理解 React 19 的新特性',
  'react-19-new-features',
  '探索 React 19 带来的革命性变化，包括并发特性、Suspense 改进和新的 Hooks。',
  '# 深入理解 React 19 的新特性

React 19 带来了许多令人兴奋的新特性和改进...

## 并发特性

React 19 进一步完善了并发特性...

## Suspense 改进

新版本的 Suspense 更加强大...

## 新的 Hooks

React 19 引入了几个新的 Hooks...',
  'React',
  ARRAY['React', 'Hooks', '并发', 'Suspense'],
  NOW() - INTERVAL ''5 days'',
  8,
  true,
  '550e8400-e29b-41d4-a716-446655440000'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Next.js 15 完全指南',
  'nextjs-15-complete-guide',
  '从零开始学习 Next.js 15，掌握最新的 App Router、Server Components 和性能优化技巧。',
  '# Next.js 15 完全指南

Next.js 15 是一个重大更新...

## App Router

新的 App Router 提供了更好的开发体验...

## Server Components

服务器组件让我们能够...',
  'Next.js',
  ARRAY['Next.js', 'App Router', 'Server Components', '性能优化'],
  NOW() - INTERVAL ''10 days'',
  12,
  true,
  '550e8400-e29b-41d4-a716-446655440000'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'TypeScript 高级类型系统详解',
  'typescript-advanced-types',
  '深入探讨 TypeScript 的高级类型特性，提升代码质量和开发效率。',
  '# TypeScript 高级类型系统详解

TypeScript 的类型系统非常强大...

## 条件类型

条件类型让我们能够...

## 映射类型

映射类型提供了...',
  'TypeScript',
  ARRAY['TypeScript', '类型系统', '高级特性'],
  NOW() - INTERVAL ''15 days'',
  15,
  true,
  '550e8400-e29b-41d4-a716-446655440000'
)
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Authors are viewable by everyone" ON authors
  FOR SELECT USING (true);

-- Create policy for newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Subscribers can view their own subscription" ON subscribers
  FOR SELECT USING (true);
