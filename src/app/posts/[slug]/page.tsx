import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PostClient } from "./post-client"
import { BlogPost } from "@/types/blog"

// 模拟数据 - 实际项目中会从 Supabase 获取
const mockPost: BlogPost = {
  id: "1",
  title: "深入理解 React 19 的新特性",
  slug: "react-19-new-features",
  excerpt: "探索 React 19 带来的革命性变化，包括并发特性、Suspense 改进和新的 Hooks。",
  content: `# 深入理解 React 19 的新特性

React 19 是一个重大的版本更新，带来了许多令人兴奋的新特性和改进。在这篇文章中，我们将深入探讨这些变化，了解它们如何影响我们的开发工作流程。

## 并发特性的完善

React 19 进一步完善了并发特性，使得应用程序能够更好地处理复杂的用户交互和数据更新。

### 自动批处理

React 19 扩展了自动批处理的范围，现在几乎所有的状态更新都会被自动批处理，包括：

- 事件处理器中的更新
- Promise 回调中的更新
- setTimeout 中的更新

\`\`\`javascript
// React 19 中，这些更新会被自动批处理
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只会触发一次重新渲染
}
\`\`\`

## Suspense 的改进

React 19 对 Suspense 进行了重大改进，使其更加强大和易用。

### 更好的错误边界

新版本的 Suspense 提供了更好的错误处理机制：

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <ErrorBoundary fallback={<Error />}>
    <AsyncComponent />
  </ErrorBoundary>
</Suspense>
\`\`\`

## 新的 Hooks

React 19 引入了几个新的 Hooks，让状态管理和副作用处理更加简单。

### useOptimistic

这个新的 Hook 允许我们实现乐观更新：

\`\`\`javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text, pending: true });
    await saveTodo(text);
    setTodos(await fetchTodos());
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} className={todo.pending ? 'pending' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## 性能优化

React 19 在性能方面也有显著提升：

- 更快的初始渲染
- 减少的内存占用
- 改进的开发者工具

## 总结

React 19 是一个令人兴奋的版本，它不仅带来了新的特性，还改进了现有功能的性能和易用性。这些改进将帮助开发者构建更快、更可靠的应用程序。

随着这些新特性的引入，我们可以期待 React 生态系统的进一步发展和创新。`,
  category: "React",
  tags: ["React", "Hooks", "并发", "Suspense"],
  publishedAt: "2024-01-15",
  updatedAt: "2024-01-15",
  readingTime: 8,
  viewCount: 1250,
  featured: true,
  author: {
    id: "1",
    name: "博客作者",
    email: "author@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "热爱技术分享的前端开发者，专注于 React、Next.js 和现代前端技术栈。",
    website: "https://example.com",
    social: {
      github: "https://github.com/username",
      twitter: "https://twitter.com/username",
      linkedin: "https://linkedin.com/in/username",
    },
  },
  coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  // 实际项目中会根据 slug 从数据库获取文章信息
  const post = mockPost

  if (!post) {
    return {
      title: "文章未找到",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  // 实际项目中会根据 slug 从数据库获取文章
  // 现在暂时返回模拟数据，但可以根据 slug 返回不同内容
  const post = {
    ...mockPost,
    slug: params.slug,
    title: params.slug === 'react-19-new-features' ? mockPost.title : `文章: ${params.slug.replace(/-/g, ' ')}`
  }

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}
