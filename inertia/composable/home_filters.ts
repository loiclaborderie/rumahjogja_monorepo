import { propertyFilterValidator } from '#validators/property_filter'
import { Infer } from '@vinejs/vine/types'
import { reactive } from 'vue'

type FilterValues = Infer<typeof propertyFilterValidator>

export function HomeFilters(page = undefined) {
  const defaultValues: FilterValues = {
    sortBy: 'price_asc',
    search: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minRooms: undefined,
    maxRooms: undefined,
    minBathrooms: undefined,
    maxBathrooms: undefined,
    minFloor: undefined,
    maxFloor: undefined,
    minBuildingSurface: undefined,
    maxBuildingSurface: undefined,
    page: page,
  }

  const filters = reactive<FilterValues>(defaultValues)

  const updateFilters = (newFilters: Partial<FilterValues>) => {
    Object.assign(filters, newFilters)
  }

  // const queryParams = computed(() => filters)

  return {
    filters,
    // queryParams,
    updateFilters,
  }
}
