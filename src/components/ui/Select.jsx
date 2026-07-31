import React from "react"
import { ChevronDown } from "lucide-react"

export function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  className = "",
  icon: Icon,
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + className}>
      {label && (
        <label className="text-xs font-semibold text-gray-600
                          uppercase tracking-wider flex items-center gap-1.5">
          {Icon && <Icon size={12} />}
          {label}
        </label>
      )}
      <div className="relative group">
        {/* Subtle gradient border on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500
                        to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-30
                        blur transition-opacity duration-200" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="relative appearance-none w-full rounded-xl
                     border border-gray-200 bg-white/90 backdrop-blur-sm
                     py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700
                     shadow-sm hover:shadow-md hover:border-indigo-300
                     focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                     focus:outline-none transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2
                     -translate-y-1/2 text-indigo-500
                     group-focus-within:rotate-180 transition-transform duration-200"
        />
      </div>
    </div>
  )
}