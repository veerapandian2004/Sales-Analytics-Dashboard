import React, { useEffect } from "react"
import { X } from "lucide-react"

function Modal({ isOpen, onClose, title, subtitle, children }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 animate-fade-in-up"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30
                      via-purple-900/40 to-pink-900/30 backdrop-blur-md" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl
                        shadow-purple-500/20 border border-white/60 overflow-hidden">

          {/* Gradient header */}
          <div className="relative bg-gradient-to-r from-indigo-500
                          via-purple-500 to-pink-500 px-6 py-5">
            {/* Decorative circles */}
            <div className="absolute top-0 right-20 w-24 h-24 bg-white/10
                            rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24
                            bg-yellow-300/20 rounded-full blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs text-white/80 mt-0.5">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30
                           flex items-center justify-center text-white
                           transition-all duration-200 hover:rotate-90"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal