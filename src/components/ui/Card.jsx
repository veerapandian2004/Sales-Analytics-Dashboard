import React from "react"

export function Card({ children, className = "", padding = true, gradient = false }) {
  return (
    <div
      className={
        "relative rounded-2xl overflow-hidden card-hover " +
        (gradient
          ? "bg-white/90 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-100/40 "
          : "bg-white/80 backdrop-blur-xl border border-white/70 shadow-md shadow-indigo-100/30 ") +
        (padding ? "p-6 " : "") +
        className
      }
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500
                          to-purple-500 flex items-center justify-center
                          shadow-lg shadow-indigo-300/50">
            <Icon size={18} className="text-white" />
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-gray-800 leading-tight tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  )
}

/**
 * StatCard — gradient KPI tile with animated icon
 */
export function StatCard({ label, value, icon: Icon, color = "blue", trend }) {
  const colorMap = {
    blue: {
      bg:       "from-blue-500 to-indigo-600",
      shadow:   "shadow-blue-300/50",
      glow:     "bg-blue-400/20",
      accent:   "text-blue-600",
    },
    green: {
      bg:       "from-emerald-500 to-teal-600",
      shadow:   "shadow-emerald-300/50",
      glow:     "bg-emerald-400/20",
      accent:   "text-emerald-600",
    },
    purple: {
      bg:       "from-purple-500 to-pink-600",
      shadow:   "shadow-purple-300/50",
      glow:     "bg-purple-400/20",
      accent:   "text-purple-600",
    },
    orange: {
      bg:       "from-orange-500 to-red-600",
      shadow:   "shadow-orange-300/50",
      glow:     "bg-orange-400/20",
      accent:   "text-orange-600",
    },
  }
  const c = colorMap[color] || colorMap.blue

  return (
    <Card className="group relative overflow-hidden">
      {/* Decorative background blob */}
      <div className={
        "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl " +
        "opacity-40 group-hover:opacity-60 transition-opacity " + c.glow
      } />

      <div className="relative flex items-center gap-4">
        {/* Icon with gradient background */}
        {Icon && (
          <div className={
            "relative w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center " +
            "justify-center shadow-lg group-hover:scale-110 transition-transform " +
            "duration-300 " + c.bg + " " + c.shadow
          }>
            <Icon size={24} className="text-white" strokeWidth={2.5} />
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr
                            from-white/40 to-transparent opacity-60" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase
                        tracking-wider truncate">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate tracking-tight">
            {value}
          </p>
          {trend && (
            <p className={"text-xs font-semibold mt-1 " + c.accent}>
              {trend}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}