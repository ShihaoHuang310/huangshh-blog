#!/usr/bin/env tsx

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// 加载环境变量
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 缺少必要的环境变量')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkTables() {
  console.log('🔍 检查数据库表...')

  const tables = ['projects', 'code_examples', 'profile', 'skills', 'timeline', 'stats']

  for (const table of tables) {
    try {
      console.log(`\n📋 检查表: ${table}`)
      
      // 尝试查询表结构
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.error(`❌ 表 ${table} 不存在或无法访问:`, error.message)
      } else {
        console.log(`✅ 表 ${table} 存在`)
        
        // 检查数据数量
        const { count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })

        console.log(`   📊 数据行数: ${count || 0}`)
      }
    } catch (err) {
      console.error(`❌ 检查表 ${table} 时发生错误:`, err)
    }
  }

  console.log('\n🔍 检查 RLS 策略...')
  
  // 检查 RLS 策略
  try {
    const { data: policies, error } = await supabase
      .rpc('get_policies')

    if (error) {
      console.log('⚠️ 无法获取 RLS 策略信息 (这是正常的)')
    } else {
      console.log('✅ RLS 策略检查完成')
    }
  } catch (err) {
    console.log('⚠️ RLS 策略检查跳过')
  }
}

// 运行检查
checkTables()
