import * as React from "react"
import { Metadata } from "next"
import { ProjectsClient } from "./projects-client"

export const metadata: Metadata = {
  title: "项目展示",
  description: "探索我的开源项目和创意作品，包含前端应用、组件库和实验性项目。",
}

const projects = [
  {
    id: "1",
    title: "React Component Library",
    description: "一个现代化的 React 组件库，包含 50+ 个高质量组件，支持 TypeScript 和主题定制。",
    tech: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
    demo: "https://components.example.com",
    github: "https://github.com/username/react-components",
    featured: true,
  },
  {
    id: "2",
    title: "3D Portfolio Website",
    description: "使用 Three.js 和 React 构建的交互式 3D 作品集网站，展示创意编程和视觉效果。",
    tech: ["React", "Three.js", "GSAP", "WebGL"],
    demo: "https://portfolio.example.com",
    github: "https://github.com/username/3d-portfolio",
    featured: true,
  },
  {
    id: "3",
    title: "Code Editor Theme",
    description: "为 VS Code 设计的程序员友好主题，优化了语法高亮和可读性。",
    tech: ["VS Code", "JSON", "Color Theory"],
    demo: "https://marketplace.visualstudio.com/items?itemName=username.theme",
    github: "https://github.com/username/vscode-theme",
    featured: false,
  },
  {
    id: "4",
    title: "Animation Playground",
    description: "探索 CSS 和 JavaScript 动画的实验性项目，包含各种创意动画效果。",
    tech: ["CSS", "JavaScript", "Framer Motion", "GSAP"],
    demo: "https://animations.example.com",
    github: "https://github.com/username/animation-playground",
    featured: false,
  },
  {
    id: "5",
    title: "Next.js Blog Template",
    description: "现代化的博客模板，支持 MDX、深色模式和 SEO 优化。",
    tech: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    demo: "https://blog-template.example.com",
    github: "https://github.com/username/nextjs-blog",
    featured: true,
  },
  {
    id: "6",
    title: "TypeScript Utilities",
    description: "实用的 TypeScript 工具函数库，提供类型安全的常用功能。",
    tech: ["TypeScript", "Jest", "Rollup", "npm"],
    demo: "https://www.npmjs.com/package/ts-utilities",
    github: "https://github.com/username/ts-utilities",
    featured: false,
  },
]

const codeExamples = [
  {
    title: "React Hook: useLocalStorage",
    description: "一个类型安全的 localStorage Hook，支持序列化和错误处理。",
    language: "typescript",
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue];
}`,
  },
  {
    title: "CSS Animation: Floating Elements",
    description: "纯 CSS 实现的浮动动画效果，适用于装饰性元素。",
    language: "css",
    code: `@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatReverse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.float-element {
  animation: float 3s ease-in-out infinite;
}

.float-element:nth-child(even) {
  animation: floatReverse 3s ease-in-out infinite;
  animation-delay: 1s;
}`,
  },
  {
    title: "Three.js: Particle System",
    description: "使用 Three.js 创建的粒子系统，支持鼠标交互和动态效果。",
    language: "javascript",
    code: `import * as THREE from 'three';

class ParticleSystem {
  constructor(scene, count = 1000) {
    this.scene = scene;
    this.count = count;
    this.init();
  }

  init() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  update() {
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y += 0.002;
  }
}`,
  },
]

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} codeExamples={codeExamples} />
}
