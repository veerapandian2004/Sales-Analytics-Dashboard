import React from "react"
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts"
import { BarChart3 } from "lucide-react"
import { Card, CardHeader } from "../ui/Card"
import { ChartSkeleton } from "../ui/Skeleton"
import { formatCurrency, formatAxisCurrency, capitalize } from "../../utils/formatters"

const COLORS = [
  "#6366f1", "#8b5cf6", "#10b981",
  "#f59e0b", "#ef4444", "#06b6d4", "#ec4899",
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-white/60
                    rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-bold text-gray-800 mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500" />
        <p className="text-gray-600">
          Revenue: <span className="font-bold text-indigo-600">
            {formatCurrency(payload[0]?.value)}
          </span>
        </p>
      </div>
    </div>
  )
}

function BarChartCard({ data = [], isLoading, groupBy }) {
  return (
    <Card>
      <CardHeader
        title="Revenue Comparison"
        subtitle={"Grouped by " + capitalize(groupBy)}
        icon={BarChart3}
      />
      {isLoading ? (
        <ChartSkeleton />
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 4 }} barSize={40}>
            <defs>
              {COLORS.map((color, i) => (
                <linearGradient key={i} id={"barGrad" + i} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatAxisCurrency}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={"cell-" + index}
                  fill={"url(#barGrad" + (index % COLORS.length) + ")"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

export default BarChartCard