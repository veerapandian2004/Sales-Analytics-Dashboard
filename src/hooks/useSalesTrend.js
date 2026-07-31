import { useQuery } from "@tanstack/react-query"
import { fetchSalesTrend } from "../api/frappeClient"

export function useSalesTrend(period = "monthly") {
  return useQuery({
    queryKey: ["sales-trend", period],
    queryFn: () => fetchSalesTrend(period),
    refetchInterval: 30000,
    staleTime: 20000,
    placeholderData: (prev) => prev,
  })
}