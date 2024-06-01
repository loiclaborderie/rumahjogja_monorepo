import type { PropertySortValues } from './sort_values.ts'
export interface PropertySortOptions {
  id: PropertySortValues
  field: string
  direction: 'asc' | 'desc'
}
