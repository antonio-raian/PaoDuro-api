import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rent from 'App/Models/Rent'

export default class RentsController {
  public async create({ request }: HttpContextContract) {
    const { name, value, date, bankAccountId } = request.all()

    const rent = new Rent()

    await rent.fill({ name, value, date, bankAccountId }).save()

    return rent.$isPersisted ? rent : { message: 'Renda não criada!' }
  }
  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await Rent.query().where(search)
  }

  public async update({ request }: HttpContextContract) {
    const { id, name, value, date, bankAccountId } = request.all()

    const rent = await Rent.findOrFail(id)

    await rent.merge({ name, value, date, bankAccountId }).save()

    return rent.$isPersisted ? rent : { message: 'Renda não atualizado!' }
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const rent = await Rent.findOrFail(id)

    await rent.delete()

    return rent.$isDeleted ? rent : { message: 'Renda não desativada!' }
  }
}
