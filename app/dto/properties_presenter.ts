import type Property from '#models/property'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { PropertyPresenter } from './property_presenter.js'
import { inject } from '@adonisjs/core'

@inject()
export class PropertiesPresenter {
  constructor(private propertyPresenter: PropertyPresenter) {}
  toJson(properties: ModelPaginatorContract<Property>) {
    return {
      data: properties.all().map((data) => this.propertyPresenter.toJson(data)),
      page: {
        current: properties.currentPage,
        perPage: properties.perPage,
        total: properties.total,
      },
    }
  }
}
