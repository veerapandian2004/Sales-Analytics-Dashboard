import React, { useState } from "react"
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts"
import { PieChart as PieIcon } from "lucide-react"
import { Card, CardHeader } from "../ui/Card"
import { Skeleton } from "../ui/Skeleton"
import { formatCurrency, capitalize } from "../../utils/formatters"

const COLORS = [
  "#6366f1", "#8b5cf6", "#10b981",
  "#f59e0b", "#ef4444", "#06b6d4",
]

function ActiveShape(props) {
  const {
    cx, cy, innerRadius, outerRadius,
    startAngle, endAngle,
    fill, payload, percent, value,
  } = props
  return (
    <g>
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#1e293b"
        fontSize={14} fontWeight={700}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#6366f1"
        fontSize={13} fontWeight={600}>
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius + 10}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy}
        innerRadius={innerRadius - 6} outerRadius={innerRadius - 3}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  )
}

function PieChartCard({ data = [], isLoading, groupBy }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Card>
      <CardHeader
        title="Revenue Share"
        subtitle={"Distribution by " + capitalize(groupBy)}
        icon={PieIcon}
      />
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Skeleton className="w-44 h-44 rounded-full" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-52 text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={data} dataKey="total" nameKey="name"
                cx="50%" cy="50%" innerRadius={62} outerRadius={95}
                activeIndex={activeIndex} activeShape={<ActiveShape />}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((_, index) => (
                  <Cell key={"pie-" + index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white" strokeWidth={3} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-2">
            {data.map((entry, index) => (
              <button key={entry.name}
                onClick={() => setActiveIndex(index)}
                className={
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs " +
                  "font-semibold transition-all " +
                  (activeIndex === index
                    ? "bg-indigo-50 text-indigo-700 scale-105"
                    : "text-gray-600 hover:bg-gray-50")
                }>
                <span className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default PieChartCard