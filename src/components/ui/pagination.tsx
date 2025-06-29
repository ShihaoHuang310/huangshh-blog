"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Terminal, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  total: number
  pageSize: number
  basePath?: string
}

export function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  basePath = "/posts"
}: PaginationProps) {
  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // 显示的页码数量

    if (totalPages <= showPages) {
      // 如果总页数小于等于显示页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 复杂分页逻辑
      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 当前页在中间
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, total)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Terminal Style Header */}
      <div className="bg-gray-900 rounded-t-lg border border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm font-mono ml-4">pagination.js</span>
        </div>
        <div className="font-mono text-sm space-y-1">
          <div className="text-gray-500">// Pagination Status</div>
          <div className="text-blue-400">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-orange-400">pagination</span>{" "}
            <span className="text-yellow-400">=</span>{" "}
            <span className="text-yellow-400">{"{"}</span>
          </div>
          <div className="ml-4 space-y-1">
            <div>
              <span className="text-orange-400">currentPage</span>
              <span className="text-yellow-400">:</span>{" "}
              <span className="text-green-300">{currentPage}</span>
              <span className="text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-orange-400">totalPages</span>
              <span className="text-yellow-400">:</span>{" "}
              <span className="text-green-300">{totalPages}</span>
              <span className="text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-orange-400">showing</span>
              <span className="text-yellow-400">:</span>{" "}
              <span className="text-green-300">"{startItem}-{endItem} of {total}"</span>
            </div>
          </div>
          <div className="text-yellow-400">{"}"}</div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-gray-800 rounded-b-lg border-x border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex items-center space-x-2">
            {currentPage > 1 ? (
              <Link
                href={`${basePath}?page=${currentPage - 1}`}
                className="group flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors font-mono text-sm"
              >
                <ChevronLeft className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">prev()</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded border border-gray-700 opacity-50 font-mono text-sm cursor-not-allowed">
                <ChevronLeft className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">prev()</span>
              </div>
            )}
          </div>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <div className="flex items-center justify-center w-10 h-10 text-gray-500 font-mono">
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                ) : (
                  <Link
                    href={`${basePath}?page=${page}`}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded border transition-all duration-200 font-mono text-sm",
                      page === currentPage
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
                    )}
                  >
                    {page}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <div className="flex items-center space-x-2">
            {currentPage < totalPages ? (
              <Link
                href={`${basePath}?page=${currentPage + 1}`}
                className="group flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors font-mono text-sm"
              >
                <span className="text-gray-300">next()</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </Link>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded border border-gray-700 opacity-50 font-mono text-sm cursor-not-allowed">
                <span className="text-gray-500">next()</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            )}
          </div>
        </div>

        {/* Terminal Command Line */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 font-mono text-sm">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-gray-500">user@blog:~$</span>
            <span className="text-green-400">
              ls -la posts --page={currentPage} --limit={pageSize}
            </span>
          </div>
          <div className="mt-1 font-mono text-xs text-gray-400">
            Found {total} articles • Showing page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
