import { useQuery } from "@tanstack/react-query"
import { fetchRecentSales } from "../api/frappeClient"

export function useRecentSales(limit = 10) {
  return useQuery({
    queryKey: ["recent-sales", limit],
    queryFn: () => fetchRecentSales(limit),
    refetchInterval: 30000,
    staleTime: 20000,
  })
}