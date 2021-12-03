import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createAccount,
  findAccount,
  removeAccount,
  updateAccount,
} from 'App/Services/BankAccountServices'

export default class BankAccountsController {
  public async create({ request }: HttpContextContract) {
    const { name, color, balance, defaultAccount, userId } = request.all()

    return createAccount({ name, color, balance, defaultAccount, userId })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()
    return await findAccount(search)
  }

  public async update({ request }: HttpContextContract) {
    return await updateAccount(request.all())
  }

  public async destroy({ request }: HttpContextContract) {
    const users = await findAccount(request.all())

    return users.length && (await removeAccount(users[0].id))
  }
}
