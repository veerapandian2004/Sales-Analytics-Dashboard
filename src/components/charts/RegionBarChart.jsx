import React from "react"
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from "recharts"
import { MapPin } from "lucide-react"
import { Card, CardHeader } from "../ui/Card"
import { ChartSkeleton } from "../ui/Skeleton"
import { formatCurrency, formatAxisCurrency } from "../../utils/formatters"

const REGION_COLORS = {
  North: "#6366f1",
  South: "#10b981",
  East:  "#f59e0b",
  West:  "#ef4444",
}
const DEFAULT_COLOR = "#8b5cf6"

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/95 backdrop-blur-xl border border-white/60
                    rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-bold text-gray-800 mb-2">Region: {label}</p>
      <p className="text-gray-600">
        Revenue: <span className="font-bold text-indigo-600">
          {formatCurrency(payload[0]?.value)}
        </span>
      </p>
      <p className="text-gray-600 mt-1">
        Orders: <span className="font-bold">
          {Number(payload[0]?.payload?.total_orders ?? 0).toLocaleString()}
        </span>
      </p>
    </div>
  )
}

function RegionBarChart({ data = [], isLoading }) {
  const chartData = data.map((d) => ({
    ...d, name: d.region, total: d.total_revenue,
  }))
  return (
    <Card>
      <CardHeader title="Revenue by Region"
        subtitle="Geographic distribution" icon={MapPin} />
      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
          No region data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}
            margin={{ top: 25, right: 8, left: 0, bottom: 4 }} barSize={50}>
            <defs>
              {Object.entries(REGION_COLORS).map(([region, color]) => (
                <linearGradient key={region} id={"regionGrad" + region}
                  x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
              axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatAxisCurrency}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />}
              cursor={{ fill: "rgba(99,102,241,0.05)" }} />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="total" position="top"
                formatter={(v) => formatAxisCurrency(v)}
                style={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} />
              {chartData.map((entry) => (
                <Cell key={entry.name}
                  fill={"url(#regionGrad" + entry.name + ")"}
                  stroke={REGION_COLORS[entry.name] || DEFAULT_COLOR}
                  strokeWidth={0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

export default RegionBarChart