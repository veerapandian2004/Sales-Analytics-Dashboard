import React from "react"
import { Trash2, ShoppingBag } from "lucide-react"
import { useRecentSales } from "../hooks/useRecentSales"
import { useDeleteSale } from "../hooks/useCreateSale"
import { TableSkeleton } from "./ui/Skeleton"
import { formatCurrency } from "../utils/formatters"

const CATEGORY_STYLES = {
  Electronics: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200",
  Grocery:     "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200",
  Clothing:    "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200",
  Other:       "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200",
}

const REGION_STYLES = {
  North: "bg-blue-50 text-blue-600",
  South: "bg-emerald-50 text-emerald-600",
  East:  "bg-orange-50 text-orange-600",
  West:  "bg-red-50 text-red-600",
}

function RecentSalesTable() {
  const { data = [], isLoading } = useRecentSales(10)
  const deleteMutation = useDeleteSale()

  async function handleDelete(name) {
    if (!confirm("Delete this sale entry?")) return
    try {
      await deleteMutation.mutateAsync(name)
    } catch (err) {
      alert("Delete failed: " + err.message)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border
                    border-white/70 shadow-md shadow-indigo-100/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 via-purple-50
                           to-pink-50 border-b border-gray-100">
              {["Date","Product","Category","Region","Qty","Amount","Customer",""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3.5 text-left text-xs font-bold
                             text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableSkeleton rows={5} cols={8} />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-16">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br
                                    from-indigo-100 to-purple-100
                                    flex items-center justify-center animate-float">
                      <ShoppingBag size={28} className="text-indigo-400" />
                    </div>
                    <p className="text-sm font-medium">No sales entries yet</p>
                    <p className="text-xs">Click "+ New Sale" to add one</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.name}
                  className="border-b border-gray-50 last:border-0
                             hover:bg-indigo-50/30 transition-colors"
                  style={{ animationDelay: (index * 50) + "ms" }}
                >
                  <td className="px-4 py-3.5 text-gray-600 font-medium">
                    {row.sales_date}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800">
                    {row.product}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={
                      "inline-block px-2.5 py-1 rounded-full text-xs font-semibold border " +
                      (CATEGORY_STYLES[row.category] || CATEGORY_STYLES.Other)
                    }>
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {row.region && (
                      <span className={
                        "inline-block px-2 py-0.5 rounded-md text-xs font-semibold " +
                        (REGION_STYLES[row.region] || "bg-gray-100 text-gray-600")
                      }>
                        {row.region}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-medium">
                    {row.quantity || 0}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-gray-800">
                      {formatCurrency(row.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">
                    {row.customer || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(row.name)}
                      disabled={deleteMutation.isPending}
                      className="w-8 h-8 rounded-lg text-gray-400
                                 hover:text-red-600 hover:bg-red-50
                                 flex items-center justify-center
                                 transition-all hover:scale-110 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentSalesTable