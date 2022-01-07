import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createRents, findRents, removeRents, updateRents } from 'App/Services/RentsServices'

export default class RentsController {
  public async create({ request }: HttpContextContract) {
    const { name, value, date, bankAccountId } = request.all()

    return await createRents({ name, value, date, bankAccountId })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await findRents(search)
  }

  public async update({ params, request }: HttpContextContract) {
    return await updateRents(params.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
    return await removeRents(params.id)
  }
}
