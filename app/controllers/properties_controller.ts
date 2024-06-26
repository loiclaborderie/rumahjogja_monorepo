import type { HttpContext } from '@adonisjs/core/http'
import Property from '#models/property'
import PropertyService from '#services/property_service'
import Tag from '#models/tag'
import { propertyValidator } from '#validators/property'
import { DateTime } from 'luxon'
import { PropertiesPresenter } from '../dto/properties_presenter.js'
import { inject } from '@adonisjs/core'
import { propertyFilterValidator } from '#validators/property_filter'
import { PropertyDetailsPresenter } from '../dto/property_details_presenter.js'

@inject()
export default class PropertiesController {
  constructor(private presenter: PropertiesPresenter) {}

  async getAllPropertiesFiltered({ inertia, request }: HttpContext) {
    const validatedFilters = await propertyFilterValidator.validate(request.qs())
    const properties = await PropertyService.getFiltered(validatedFilters)
    return inertia.render('home', {
      properties: this.presenter.toJson(properties),
      queryFilters: validatedFilters,
    })
  }

  async getProperty({ inertia, params }: HttpContext) {
    const property = await Property.query()
      .preload('owner')
      .preload('tags')
      .where('id', params.id)
      .whereNull('sold_at')
      .firstOrFail()
    return inertia.render('propertydetails', {
      property: new PropertyDetailsPresenter().toJson(property),
    })
  }

  async create({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    console.log(auth, auth.user, user)
    const data = await request.validateUsing(propertyValidator)
    const tagIds: number[] = data.tags || []

    const property = await Property.create(data)

    if (tagIds.length) {
      delete data.tags
      const tags = await Tag.query().whereIn('id', tagIds)
      await property.related('tags').saveMany(tags)
    }

    await user.related('properties').save(property)
    return response.redirect().toRoute(`property/${property.id}`, { property })
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const property = await user.related('properties').query().where('id', params.id).firstOrFail()
    await property.delete()
    return response.redirect().toRoute(`my-properties`)
  }

  async edit({ params, response, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const property = await user.related('properties').query().where('id', params.id).firstOrFail()
    let data = await request.validateUsing(propertyValidator)
    console.log('validated', data)
    const isSold = request.only(['isSold']) || false
    console.log('actual data received', data)
    const tagIds: number[] = data.tags || []

    if (tagIds.length) {
      delete data.tags
      const tags = await Tag.query().whereIn('id', tagIds)
      await property.related('tags').saveMany(tags)
    }
    property.merge({ ...data, soldAt: isSold ? DateTime.now() : undefined }).save()
    return response.redirect().toRoute(`property/${property.id}`, { property })
  }

  async showUserProperties({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const properties = await user.related('properties')
    return response.redirect().toRoute(`my-properties`, { properties })
  }
}
