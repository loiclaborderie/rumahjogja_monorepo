import PropertyService from '#services/property_service'
import vine from '@vinejs/vine'

export const propertyFilterValidator = vine.compile(
  vine.object({
    search: vine.string().alphaNumeric().trim().optional(),
    sortBy: vine
      .string()
      .exists(async (_db, value) =>
        PropertyService.sortOptions.some((option) => option.id === value)
      )
      .optional(),
    minPrice: vine.number().min(0).optional(),
    maxPrice: vine.number().min(0).optional(),
    minRooms: vine.number().min(1).optional(),
    maxRooms: vine.number().min(1).optional(),
    minBathrooms: vine.number().min(1).optional(),
    maxBathrooms: vine.number().min(1).optional(),
    minFloor: vine.number().min(0).optional(),
    maxFloor: vine.number().min(0).optional(),
    minBuildingSurface: vine.number().min(0).optional(),
    maxBuildingSurface: vine.number().min(0).optional(),
    page: vine.number().min(1).optional(),
  })
)
