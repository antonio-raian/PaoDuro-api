import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createSavings,
  findSavings,
  removeSavings,
  updateSavings,
} from 'App/Services/SavingsServices'

export default class SavingsController {
  public async create({ auth, params, request }: HttpContextContract) {
    const { name, description, endPeriod, intendedValue, balance, priority, bankAccountId } =
      request.all()

    return await createSavings({
      name,
      description,
      endPeriod,
      intendedValue,
      balance,
      priority,
      userId: params.id || auth.user?.id,
      bankAccountId,
    })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await findSavings(search)
  }

  public async update({ params, request }: HttpContextContract) {
    return await updateSavings(params.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
    return await removeSavings(params.id)
  }
}
