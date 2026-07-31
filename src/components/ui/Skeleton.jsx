import React from "react"

export function Skeleton({ className = "" }) {
  return (
    <div className={
      "shimmer rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 " +
      "to-gray-100 " + className
    } />
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2 h-52 pt-4">
        {[55, 80, 45, 90, 65, 75, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 shimmer rounded-t-lg bg-gradient-to-t
                       from-indigo-100 to-purple-100"
            style={{
              height: h + "%",
              animationDelay: (i * 100) + "ms",
            }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-2 shimmer rounded" />
        ))}
      </div>
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-md
                    border border-white/70">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shimmer rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 shimmer rounded-full" />
          <div className="h-7 w-32 shimmer rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 4, cols = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-gray-50">
          {Array.from({ length: cols }).map((__, j) => (
            <td key={j} className="px-5 py-4">
              <div className="h-4 w-full shimmer rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}