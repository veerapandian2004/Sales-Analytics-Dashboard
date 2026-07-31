import React, { useState } from "react"
import {
  DollarSign, ShoppingCart, Package, TrendingUp,
  RefreshCw, Plus, Sparkles, BarChart3,
  PieChart, LineChart, MapPin, Filter, Clock,
} from "lucide-react"

import { useSalesSummary }      from "../hooks/useSalesSummary"
import { useSalesTrend }        from "../hooks/useSalesTrend"
import { useKpiStats }          from "../hooks/useKpiStats"
import { useCategoryBreakdown } from "../hooks/useCategoryBreakdown"
import { useRegionBreakdown }   from "../hooks/useRegionBreakdown"

import { StatCard } from "../components/ui/Card"
import { Select }   from "../components/ui/Select"
import { StatSkeleton, TableSkeleton } from "../components/ui/Skeleton"
import ErrorBanner  from "../components/ui/ErrorBanner"
import Modal        from "../components/ui/Modal"

import BarChartCard   from "../components/charts/BarChartCard"
import LineChartCard  from "../components/charts/LineChartCard"
import PieChartCard   from "../components/charts/PieChartCard"
import RegionBarChart from "../components/charts/RegionBarChart"

import AddSaleForm      from "../components/forms/AddSaleForm"
import RecentSalesTable from "../components/RecentSalesTable"

import { formatCurrency, formatNumber, capitalize } from "../utils/formatters"

const GROUP_BY_OPTIONS = [
  { value: "category", label: "Category" },
  { value: "region",   label: "Region"   },
  { value: "product",  label: "Product"  },
  { value: "customer", label: "Customer" },
]

const TREND_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "daily",   label: "Daily"   },
]

const DOT_COLORS = [
  "#6366f1","#8b5cf6","#10b981",
  "#f59e0b","#ef4444","#06b6d4",
]

function Dashboard() {
  const [groupBy, setGroupBy]   = useState("category")
  const [period,  setPeriod]    = useState("monthly")
  const [isModalOpen, setModal] = useState(false)

  const summaryQ  = useSalesSummary(groupBy)
  const trendQ    = useSalesTrend(period)
  const kpiQ      = useKpiStats()
  const categoryQ = useCategoryBreakdown()
  const regionQ   = useRegionBreakdown()

  const kpi         = kpiQ.data     ?? {}
  const summaryData = summaryQ.data ?? []
  const trendData   = trendQ.data   ?? []
  const regionData  = regionQ.data  ?? []

  const isRefreshing =
    summaryQ.isFetching || trendQ.isFetching ||
    kpiQ.isFetching || categoryQ.isFetching || regionQ.isFetching

  function handleRefresh() {
    summaryQ.refetch(); trendQ.refetch(); kpiQ.refetch()
    categoryQ.refetch(); regionQ.refetch()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── Decorative background blobs ── */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-300
                      rounded-full mix-blend-multiply filter blur-3xl
                      opacity-20 animate-float pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-indigo-300
                      rounded-full mix-blend-multiply filter blur-3xl
                      opacity-20 animate-float pointer-events-none"
        style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-300
                      rounded-full mix-blend-multiply filter blur-3xl
                      opacity-20 animate-float pointer-events-none"
        style={{ animationDelay: "2s" }} />

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60
                         border-b border-white/60 shadow-sm shadow-indigo-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3 gap-4">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br
                              from-indigo-500 via-purple-500 to-pink-500
                              flex items-center justify-center
                              shadow-lg shadow-purple-300/50 animate-pulse-glow">
                <Sparkles size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight
                               flex items-center gap-2">
                  Sales Analytics
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full
                                   bg-gradient-to-r from-indigo-100 to-purple-100
                                   text-indigo-700">
                    LIVE
                  </span>
                </h1>
                <p className="text-xs text-gray-500 hidden sm:flex items-center gap-1">
                  <Clock size={10} /> Auto refresh every 30s
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                           bg-white/80 backdrop-blur border border-gray-200
                           hover:border-indigo-300 hover:shadow-md
                           text-sm font-semibold text-gray-700
                           transition-all disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={"text-indigo-500 " + (isRefreshing ? "animate-spin" : "")}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={() => setModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                           text-sm font-semibold text-white
                           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                           shadow-lg shadow-purple-300/50
                           hover:shadow-xl hover:shadow-purple-400/60
                           hover:scale-105 transition-all"
              >
                <Plus size={16} strokeWidth={3} />
                <span className="hidden sm:inline">New Sale</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Errors */}
        <div className="space-y-2">
          {kpiQ.isError     && <ErrorBanner message="Failed to load KPI stats"     onRetry={() => kpiQ.refetch()} />}
          {summaryQ.isError && <ErrorBanner message="Failed to load summary data"  onRetry={() => summaryQ.refetch()} />}
          {trendQ.isError   && <ErrorBanner message="Failed to load trend data"    onRetry={() => trendQ.refetch()} />}
        </div>

        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-3xl
                        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                        p-6 sm:p-8 text-white shadow-xl shadow-purple-300/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10
                          rounded-full blur-3xl -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20
                          rounded-full blur-3xl translate-y-20 -translate-x-10" />

          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                Welcome back! 👋
              </h2>
              <p className="text-white/80 text-sm">
                Here is your real-time sales performance overview
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl
                            bg-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold">Live Data</span>
            </div>
          </div>
        </div>

        {/* KPI tiles */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b
                            from-indigo-500 to-purple-500" />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Key Metrics
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiQ.isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
            ) : (
              <>
                <StatCard label="Total Revenue" value={formatCurrency(kpi.total_revenue)}
                  icon={DollarSign} color="blue" />
                <StatCard label="Total Orders" value={formatNumber(kpi.total_orders)}
                  icon={ShoppingCart} color="purple" />
                <StatCard label="Units Sold" value={formatNumber(kpi.total_units)}
                  icon={Package} color="green" />
                <StatCard label="Avg Order Value" value={formatCurrency(kpi.avg_order_value)}
                  icon={TrendingUp} color="orange" />
              </>
            )}
          </div>
        </section>

        {/* Filters */}
        <section>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl
                          border border-white/60 shadow-md shadow-indigo-100/30 p-5">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br
                                from-indigo-500 to-purple-500 flex items-center
                                justify-center shadow-lg shadow-indigo-300/50">
                  <Filter size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Filters</p>
                  <p className="text-xs text-gray-500">Customize your view</p>
                </div>
              </div>

              <Select label="Group By" value={groupBy} onChange={setGroupBy}
                options={GROUP_BY_OPTIONS} disabled={summaryQ.isFetching}
                className="w-44" />
              <Select label="Period" value={period} onChange={setPeriod}
                options={TREND_OPTIONS} disabled={trendQ.isFetching}
                className="w-36" />

              {isRefreshing && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg
                                bg-indigo-50 text-indigo-600 text-xs font-semibold
                                animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  Fetching latest data...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Charts */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b
                            from-purple-500 to-pink-500" />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Analytics Charts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <LineChartCard  data={trendData}   isLoading={trendQ.isLoading}   period={period} />
            <BarChartCard   data={summaryData} isLoading={summaryQ.isLoading} groupBy={groupBy} />
            <PieChartCard   data={summaryData} isLoading={summaryQ.isLoading} groupBy={groupBy} />
            <RegionBarChart data={regionData}  isLoading={regionQ.isLoading} />
          </div>
        </section>

        {/* Recent Sales */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b
                              from-emerald-500 to-teal-500" />
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Recent Sales
              </h2>
            </div>
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         text-xs font-semibold text-indigo-700 bg-indigo-50
                         hover:bg-indigo-100 transition-colors"
            >
              <Plus size={12} /> Add New
            </button>
          </div>
          <RecentSalesTable />
        </section>

        {/* Breakdown table */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b
                            from-orange-500 to-red-500" />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Breakdown by {capitalize(groupBy)}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl
                          border border-white/70 shadow-md shadow-indigo-100/30
                          overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50
                                 border-b border-gray-100">
                    {[capitalize(groupBy),"Revenue","Units","Orders","Avg/Order"].map((h) => (
                      <th key={h}
                        className="px-5 py-4 text-left text-xs font-bold
                                   text-gray-600 uppercase tracking-wider
                                   [&:not(:first-child)]:text-right">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {summaryQ.isLoading ? (
                    <TableSkeleton rows={4} cols={5} />
                  ) : summaryData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    summaryData.map((row, index) => {
                      const avg = row.count > 0 ? row.total / row.count : 0
                      return (
                        <tr key={row.name ?? index}
                          className="border-b border-gray-50 last:border-0
                                     hover:bg-indigo-50/30 transition-colors">
                          <td className="px-5 py-4 font-semibold text-gray-800">
                            <div className="flex items-center gap-3">
                              <span className="w-3 h-3 rounded-full flex-shrink-0
                                               shadow-md"
                                style={{
                                  backgroundColor: DOT_COLORS[index % DOT_COLORS.length],
                                  boxShadow: "0 0 12px " + DOT_COLORS[index % DOT_COLORS.length] + "40",
                                }} />
                              {row.name ?? "—"}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right font-bold text-gray-800">
                            {formatCurrency(row.total)}
                          </td>
                          <td className="px-5 py-4 text-right text-gray-600">
                            {formatNumber(row.qty)}
                          </td>
                          <td className="px-5 py-4 text-right text-gray-600">
                            {formatNumber(row.count)}
                          </td>
                          <td className="px-5 py-4 text-right text-gray-600">
                            {formatCurrency(avg)}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-xs text-gray-400 font-medium">
            Made with <span className="text-red-500">♥</span> using Frappe · React · Recharts · TanStack Query
          </p>
        </footer>

      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModal(false)}
        title="Add New Sale"
        subtitle="Create a new sales entry to your dashboard"
      >
        <AddSaleForm onSuccess={() => setModal(false)} />
      </Modal>
    </div>
  )
}

export default Dashboard