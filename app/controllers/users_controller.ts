import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  async register({ request, response, auth }: HttpContext) {
    let userData = await request.validateUsing(createUserValidator)

    const existingUser = await User.findBy('email', userData.email)
    if (existingUser) {
      return response.badRequest({ message: 'Email already in use' })
    }
    const user = await User.create(userData)
    await auth.use('web').login(user)

    response.redirect().toRoute('home')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    response.redirect().toRoute('home')
  }

  async getUserProperties({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const properties = await user.load('properties')
    return response.redirect().toRoute('my-properties', { properties })
  }
}
