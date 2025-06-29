#!/usr/bin/env tsx

/**
 * 内容同步脚本
 * 将 Markdown 文件同步到 Supabase 数据库
 *
 * 使用方法:
 * npm run sync-content              # 同步所有内容
 * npm run sync-content -- --check   # 检查连接
 * npm run sync-content -- --file content/posts/example.md  # 同步单个文件
 */

import { ContentSyncer } from '../lib/content-sync'
import { config } from 'dotenv'
import path from 'path'

// 加载环境变量
config({ path: path.resolve(process.cwd(), '.env.local') })

async function main() {
  const args = process.argv.slice(2)
  const syncer = new ContentSyncer()

  // 检查环境变量
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_KEY
  ) {
    console.error('❌ 缺少必要的环境变量:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL')
    console.error('   SUPABASE_SERVICE_KEY')
    console.error('\n请检查 .env.local 文件配置')
    process.exit(1)
  }

  try {
    // 解析命令行参数
    if (args.includes('--check')) {
      console.log('🔍 检查 Supabase 连接...')
      const isConnected = await syncer.checkConnection()
      if (isConnected) {
        console.log('✅ 连接检查通过')
        process.exit(0)
      } else {
        console.log('❌ 连接检查失败')
        process.exit(1)
      }
    }

    const fileIndex = args.indexOf('--file')
    if (fileIndex !== -1 && args[fileIndex + 1]) {
      // 同步单个文件
      const filePath = args[fileIndex + 1]
      console.log(`📝 同步单个文件: ${filePath}`)

      if (!filePath.endsWith('.md')) {
        console.error('❌ 只支持 .md 文件')
        process.exit(1)
      }

      await syncer.syncSingleArticle(filePath)
      console.log('✅ 文件同步完成')
    } else {
      // 同步所有内容
      console.log('🚀 开始同步所有内容...')
      await syncer.syncAllContent()
    }
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error)
    process.exit(1)
  }
}

// 处理未捕获的异常
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error)
  process.exit(1)
})

// 执行主函数
main()
