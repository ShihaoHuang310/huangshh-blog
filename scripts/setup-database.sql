-- =============================================
-- Supabase 博客数据库表结构
-- =============================================

-- 1. 分类表
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- 十六进制颜色
  icon VARCHAR(50), -- Lucide 图标名称
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 标签表
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7),
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 文章表
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[], -- PostgreSQL 数组类型
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  featured BOOLEAN DEFAULT false,
  reading_time INTEGER, -- 预计阅读时间（分钟）
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[]
);

-- 4. 文章标签关联表
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (article_id, tag_id)
);

-- 5. 评论表
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  author_website VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, spam
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 文章统计表
CREATE TABLE IF NOT EXISTS article_stats (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE PRIMARY KEY,
  views_today INTEGER DEFAULT 0,
  views_week INTEGER DEFAULT 0,
  views_month INTEGER DEFAULT 0,
  views_total INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 系统配置表
CREATE TABLE IF NOT EXISTS site_config (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 索引优化
-- =============================================

-- 文章相关索引
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

-- 评论相关索引
CREATE INDEX IF NOT EXISTS idx_comments_article_status ON comments(article_id, status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- 统计相关索引
CREATE INDEX IF NOT EXISTS idx_article_stats_views ON article_stats(views_total DESC);

-- 标签关联索引
CREATE INDEX IF NOT EXISTS idx_article_tags_article ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag ON article_tags(tag_id);

-- =============================================
-- 触发器和函数
-- =============================================

-- 更新 updated_at 字段的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为各表添加 updated_at 触发器
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 增加文章浏览量的函数
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS void AS $$
BEGIN
    -- 更新文章表的浏览量
    UPDATE articles 
    SET view_count = view_count + 1 
    WHERE id = article_id;
    
    -- 更新或插入统计表
    INSERT INTO article_stats (article_id, views_total, views_today, views_week, views_month, last_viewed_at)
    VALUES (article_id, 1, 1, 1, 1, NOW())
    ON CONFLICT (article_id) 
    DO UPDATE SET 
        views_total = article_stats.views_total + 1,
        views_today = article_stats.views_today + 1,
        views_week = article_stats.views_week + 1,
        views_month = article_stats.views_month + 1,
        last_viewed_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- RLS (Row Level Security) 策略
-- =============================================

-- 启用 RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 文章访问策略
CREATE POLICY "Public can view published articles" ON articles
  FOR SELECT USING (status = 'published');

-- 分类和标签公开访问
CREATE POLICY "Public can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view tags" ON tags
  FOR SELECT USING (true);

-- 评论策略
CREATE POLICY "Public can view approved comments" ON comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can create comments" ON comments
  FOR INSERT WITH CHECK (true);

-- =============================================
-- 初始数据
-- =============================================

-- 插入默认分类
INSERT INTO categories (name, slug, description, color, icon) VALUES
('React', 'react', 'React 相关技术文章', '#61DAFB', 'Code'),
('Vue', 'vue', 'Vue.js 相关技术文章', '#4FC08D', 'Layers'),
('TypeScript', 'typescript', 'TypeScript 开发技巧', '#3178C6', 'FileText'),
('Next.js', 'nextjs', 'Next.js 框架相关', '#000000', 'Zap'),
('JavaScript', 'javascript', 'JavaScript 基础与进阶', '#F7DF1E', 'Code2'),
('CSS', 'css', 'CSS 样式与布局技巧', '#1572B6', 'Palette'),
('Node.js', 'nodejs', 'Node.js 后端开发', '#339933', 'Server'),
('工具', 'tools', '开发工具与效率提升', '#FF6B6B', 'Tool')
ON CONFLICT (slug) DO NOTHING;

-- 插入默认标签
INSERT INTO tags (name, slug, description, color) VALUES
('前端开发', 'frontend', '前端开发相关', '#FF6B6B'),
('后端开发', 'backend', '后端开发相关', '#4ECDC4'),
('全栈开发', 'fullstack', '全栈开发相关', '#45B7D1'),
('性能优化', 'performance', '性能优化技巧', '#96CEB4'),
('最佳实践', 'best-practices', '开发最佳实践', '#FFEAA7'),
('教程', 'tutorial', '技术教程', '#DDA0DD'),
('经验分享', 'experience', '开发经验分享', '#98D8C8')
ON CONFLICT (slug) DO NOTHING;

-- 插入系统配置
INSERT INTO site_config (key, value, description) VALUES
('site_title', '"现代前端开发博客"', '网站标题'),
('site_description', '"分享最新的前端技术、开发经验和最佳实践"', '网站描述'),
('posts_per_page', '10', '每页文章数量'),
('enable_comments', 'true', '是否启用评论功能'),
('analytics_id', '""', 'Google Analytics ID')
ON CONFLICT (key) DO NOTHING;
