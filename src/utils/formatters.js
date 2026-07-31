export function formatCurrency(value) {
  if (value === null || value === undefined) return "—"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value) {
  if (value === null || value === undefined) return "—"
  return new Intl.NumberFormat("en-US").format(value)
}

export function formatAxisCurrency(value) {
  if (value >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M"
  if (value >= 1000) return "$" + (value / 1000).toFixed(0) + "k"
  return "$" + value
}

export function capitalize(str) {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}