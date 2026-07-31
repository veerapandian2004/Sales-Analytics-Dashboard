import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="relative overflow-hidden rounded-2xl animate-slide-down">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-50
                      via-rose-50 to-pink-50" />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      <div className="relative flex items-center gap-3 border border-red-200
                      text-red-700 rounded-2xl px-5 py-4 text-sm">
        <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center
                        justify-center flex-shrink-0">
          <AlertCircle size={18} className="text-red-600" />
        </div>
        <span className="flex-1 font-medium">{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-red-100 hover:bg-red-200 text-xs font-semibold
                       text-red-700 transition-colors"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorBanner