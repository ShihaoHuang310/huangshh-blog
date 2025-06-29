import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { SmoothScroll } from "@/components/common/smooth-scroll"
import { PageTransition } from "@/components/common/page-transition"
import { ScrollProgress } from "@/components/common/scroll-animations"
import { BackgroundEffects } from "@/components/common/background-effects"
import { ClientOnly } from "@/components/providers/client-only"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "现代博客 - 分享技术见解",
    template: "%s | 现代博客",
  },
  description: "一个现代化的技术博客，分享前端开发、设计和编程的最新见解。",
  keywords: ["博客", "前端开发", "React", "Next.js", "TypeScript", "技术分享"],
  authors: [{ name: "博客作者" }],
  creator: "博客作者",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yourblog.com",
    title: "现代博客 - 分享技术见解",
    description: "一个现代化的技术博客，分享前端开发、设计和编程的最新见解。",
    siteName: "现代博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "现代博客 - 分享技术见解",
    description: "一个现代化的技术博客，分享前端开发、设计和编程的最新见解。",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ClientOnly>
              <BackgroundEffects />
              <ScrollProgress />
            </ClientOnly>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
