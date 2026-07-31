import React from "react"
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts"
import { LineChart as LineIcon } from "lucide-react"
import { Card, CardHeader } from "../ui/Card"
import { ChartSkeleton } from "../ui/Skeleton"
import { formatCurrency, formatAxisCurrency } from "../../utils/formatters"

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

function LineChartCard({ data = [], isLoading, period }) {
  const avg = data.length > 0
    ? data.reduce((s, d) => s + (Number(d.total) || 0), 0) / data.length : 0

  return (
    <Card className="md:col-span-2">
      <CardHeader
        title="Revenue Trend"
        subtitle={(period === "monthly" ? "Monthly" : "Daily") + " performance over time"}
        icon={LineIcon}
      />
      {isLoading ? (
        <ChartSkeleton />
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
          No trend data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="50%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#6366f1" />
                <stop offset="50%"  stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="period"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false} tickLine={false}
              interval="preserveStartEnd" />
            <YAxis tickFormatter={formatAxisCurrency}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<CustomTooltip />} />
            {avg > 0 && (
              <ReferenceLine y={avg} stroke="#f59e0b"
                strokeDasharray="5 4" strokeWidth={1.5}
                label={{
                  value: "Avg", position: "insideTopRight",
                  fontSize: 11, fill: "#f59e0b", fontWeight: 700,
                }} />
            )}
            <Area type="monotone" dataKey="total"
              stroke="url(#strokeGrad)" strokeWidth={3}
              fill="url(#areaGrad)" dot={false}
              activeDot={{
                r: 6, fill: "#8b5cf6", stroke: "white",
                strokeWidth: 3, style: { filter: "drop-shadow(0 4px 6px rgba(139,92,246,0.4))" }
              }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

export default LineChartCard