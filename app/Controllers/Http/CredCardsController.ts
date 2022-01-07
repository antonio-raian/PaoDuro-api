import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CredCard from 'App/Models/CredCard'

export default class CredCardsController {
  public async create({ params, auth, request }: HttpContextContract) {
    const { name, color, limit, defaultCard, dueDate } = request.all()

    const credCard = new CredCard()

    await credCard
      .fill({ name, color, limit, defaultCard, dueDate, userId: params.id || auth.user?.id })
      .save()

    return credCard.$isPersisted ? credCard : { message: 'Cartão não criada!' }
  }
  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await CredCard.query().where(search).preload('user')
  }

  public async update({ request }: HttpContextContract) {
    const { id, name, color, limit, defaultCard, dueDate, userId } = request.all()

    const credCard = await CredCard.findOrFail(id)

    await credCard.merge({ name, color, limit, defaultCard, dueDate, userId }).save()

    return credCard.$isPersisted ? credCard : { message: 'Cartão não atualizado!' }
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const credCard = await CredCard.findOrFail(id)

    await credCard.merge({ active: false }).save()

    return credCard.$isPersisted ? credCard : { message: 'Cartão não desativada!' }
  }
}
