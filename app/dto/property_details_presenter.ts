import type Property from '#models/property'

export class PropertyDetailsPresenter {
  toJson(property: Property) {
    return {
      id: property.id,
      name: property.name,
      description: property.description,
      price: property.price,
      location: property.location,
      soldAt: property.soldAt?.toString() || undefined,
      bathroomNumber: property.bathroomNumber,
      bedroomNumber: property.roomNumber,
      floorNumber: property.floorNumber,
      buildingSurface: property.buildingSurface,
      landSurface: property.landSurface,
      createdAt: property.createdAt.toString(),
      updatedAt: property.updatedAt.toString(),
      owner: {
        id: property.owner.id,
        name: property.owner.fullName,
        email: property.owner.email,
        phone: property.owner.phone,
      },
      tags: property.tags.map((tag) => {
        return {
          id: tag.id,
          name: tag.name,
        }
      }),
    }
  }
}
