import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { z } from 'zod'

export enum SortFilterType {
  RECENT = 'recent',
  NEW = 'new',
}

export const FilterSchema = z.object({
  search: z.string().optional(),
  sort: z.enum(['recent', 'new']).optional(),
})

export type Filter = z.infer<typeof FilterSchema>

const useFiltersStore = defineStore('filters', () => {
  const filters = ref<Filter>({
    search: '',
    sort: SortFilterType.RECENT,
  })

  return {
    filters,
  }
})

export const useFiltersStoreRefs = () => storeToRefs(useFiltersStore())
