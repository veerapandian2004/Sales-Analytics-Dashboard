import { useQuery } from "@tanstack/react-query"
import { fetchRegionBreakdown } from "../api/frappeClient"

export function useRegionBreakdown() {
  return useQuery({
    queryKey: ["region-breakdown"],
    queryFn: fetchRegionBreakdown,
    refetchInterval: 30000,
    staleTime: 20000,
  })
}