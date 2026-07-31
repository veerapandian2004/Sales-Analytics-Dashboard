import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSalesEntry, deleteSalesEntry } from "../api/frappeClient"

/**
 * Hook to CREATE a new sales entry
 * Automatically refreshes all charts on success
 */
export function useCreateSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createSalesEntry(payload),
    onSuccess: () => {
      // invalidate all sales-related queries so charts refresh
      queryClient.invalidateQueries({ queryKey: ["sales-summary"] })
      queryClient.invalidateQueries({ queryKey: ["sales-trend"] })
      queryClient.invalidateQueries({ queryKey: ["kpi-stats"] })
      queryClient.invalidateQueries({ queryKey: ["region-breakdown"] })
      queryClient.invalidateQueries({ queryKey: ["category-breakdown"] })
      queryClient.invalidateQueries({ queryKey: ["recent-sales"] })
    },
  })
}

/**
 * Hook to DELETE a sales entry
 */
export function useDeleteSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name) => deleteSalesEntry(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-summary"] })
      queryClient.invalidateQueries({ queryKey: ["sales-trend"] })
      queryClient.invalidateQueries({ queryKey: ["kpi-stats"] })
      queryClient.invalidateQueries({ queryKey: ["region-breakdown"] })
      queryClient.invalidateQueries({ queryKey: ["recent-sales"] })
    },
  })
}