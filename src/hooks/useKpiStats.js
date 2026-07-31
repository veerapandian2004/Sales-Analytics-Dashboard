import { useQuery } from "@tanstack/react-query"
import { fetchKpiStats } from "../api/frappeClient"

export function useKpiStats() {
  return useQuery({
    queryKey: ["kpi-stats"],
    queryFn: fetchKpiStats,
    refetchInterval: 30000,
    staleTime: 20000,
  })
}