const BASE_URL = ""

function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name + "=([^;]*)")
  )
  return match ? decodeURIComponent(match[2]) : null
}

async function frappeFetch(url) {
  const csrf = getCookie("X-Frappe-CSRF-Token")

  const response = await fetch(BASE_URL + url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(csrf ? { "X-Frappe-CSRF-Token": csrf } : {}),
    },
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      "[Frappe " + response.status + "] " + (err?.message || response.statusText)
    )
  }

  const data = await response.json()
  return data.message ?? data
}

function buildParams(obj) {
  const p = new URLSearchParams()
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null) p.append(k, v)
  })
  const s = p.toString()
  return s ? "?" + s : ""
}// ─────────────────────────────────────────────
//  Helper — POST request with CSRF token
// ─────────────────────────────────────────────
async function frappePost(url, body = {}) {
  const csrf = getCookie("X-Frappe-CSRF-Token")

  const response = await fetch(BASE_URL + url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "X-Frappe-CSRF-Token": csrf || "",
    },
    body: new URLSearchParams(body).toString(),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      "[Frappe " + response.status + "] " + (err?.message || response.statusText)
    )
  }

  const data = await response.json()
  return data.message ?? data
}

// ─────────────────────────────────────────────
//  CREATE new sales entry
// ─────────────────────────────────────────────
export async function createSalesEntry(payload) {
  return frappePost("/api/method/sales.api.create_sales_entry", payload)
}

// ─────────────────────────────────────────────
//  DELETE sales entry
// ─────────────────────────────────────────────
export async function deleteSalesEntry(name) {
  return frappePost("/api/method/sales.api.delete_sales_entry", { name })
}

// ─────────────────────────────────────────────
//  GET recent sales list
// ─────────────────────────────────────────────
export async function fetchRecentSales(limit = 10) {
  return frappeFetch(
    "/api/method/sales.api.get_recent_sales" +
    buildParams({ limit })
  )
}

export async function fetchSalesSummary(groupBy = "category") {
  return frappeFetch(
    "/api/method/sales.api.get_sales_summary" +
    buildParams({ group_by: groupBy })
  )
}

export async function fetchSalesTrend(period = "monthly") {
  return frappeFetch(
    "/api/method/sales.api.get_sales_trend" +
    buildParams({ period })
  )
}

export async function fetchKpiStats() {
  return frappeFetch("/api/method/sales.api.get_kpi_stats")
}

export async function fetchCategoryBreakdown() {
  return frappeFetch("/api/method/sales.api.get_category_breakdown")
}

export async function fetchRegionBreakdown() {
  return frappeFetch("/api/method/sales.api.get_region_breakdown")
}