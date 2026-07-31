import { useQuery } from "@tanstack/react-query"
import { fetchCategoryBreakdown } from "../api/frappeClient"

export function useCategoryBreakdown() {
  return useQuery({
    queryKey: ["category-breakdown"],
    queryFn: fetchCategoryBreakdown,
    refetchInterval: 30000,
    staleTime: 20000,
  })
}