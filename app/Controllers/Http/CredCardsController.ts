import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createCredCard,
  findCredCard,
  removeCredCard,
  updateCredCard,
} from 'App/Services/CredCardsServices'

export default class CredCardsController {
  public async create({ params, auth, request }: HttpContextContract) {
    const { name, color, limit, defaultCard, dueDate } = request.all()

    return await createCredCard({
      name,
      color,
      limit,
      defaultCard,
      dueDate,
      userId: params.id || auth.user?.id,
    })
  }
  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await findCredCard(search)
  }

  public async update({ params, request }: HttpContextContract) {
    return await updateCredCard(params.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
    return await removeCredCard(params.id)
  }
}
