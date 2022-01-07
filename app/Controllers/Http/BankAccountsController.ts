import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createAccount,
  findAccount,
  removeAccount,
  updateAccount,
} from 'App/Services/BankAccountServices'

export default class BankAccountsController {
  public async create({ params, auth, request }: HttpContextContract) {
    const { name, color, balance, defaultAccount } = request.all()

    return createAccount({
      name,
      color,
      balance,
      defaultAccount,
      userId: params.id || auth.user?.id,
    })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()
    return await findAccount(search)
  }

  public async update({ params, request }: HttpContextContract) {
    return await updateAccount(params.id, request.all())
  }

  public async destroy({ request }: HttpContextContract) {
    const users = await findAccount(request.all())

    return users.length && (await removeAccount(users[0].id))
  }
}
