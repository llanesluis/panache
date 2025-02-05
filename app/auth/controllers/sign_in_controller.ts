import User from '#common/models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignInController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_in')
  }

  async handle({ auth, request, response, session, i18n }: HttpContext) {
    const username = request.input('username')
    const password = request.input('password')
    const nextPath = request.input('next')

    try {
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/')
    } catch {
      session.flash('errors.auth', i18n.t('auth.invalid_credentials'))
      let redirectPath = `/auth/sign_in`
      if (nextPath) {
        redirectPath += `?next=${nextPath}`
      }
      return response.redirect().toPath(redirectPath)
    }
  }
}
