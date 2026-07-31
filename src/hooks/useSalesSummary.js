import { useQuery } from "@tanstack/react-query"
import { fetchSalesSummary } from "../api/frappeClient"

export function useSalesSummary(groupBy = "category") {
  return useQuery({
    queryKey: ["sales-summary", groupBy],
    queryFn: () => fetchSalesSummary(groupBy),
    refetchInterval: 30000,
    staleTime: 20000,
    placeholderData: (prev) => prev,
  })
}