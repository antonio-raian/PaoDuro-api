import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BankAccount from 'App/Models/BankAccount'

export default class BankAccountsController {
  public async create({ request }: HttpContextContract) {
    const { name, color, balance, defaultAccount, userId } = request.all()

    const account = new BankAccount()

    await account.fill({ name, color, balance, defaultAccount, userId }).save()

    return account.$isPersisted ? account : { message: 'Conta não criada!' }
  }
  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await BankAccount.query().where(search).preload('user')
  }

  public async update({ request }: HttpContextContract) {
    const { id, name, color, balance, defaultAccount, userId } = request.all()

    const account = await BankAccount.findOrFail(id)

    await account.merge({ name, color, balance, defaultAccount, userId }).save()

    return account.$isPersisted ? account : { message: 'Conta não atualizado!' }
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.all()

    const account = await BankAccount.findOrFail(id)

    await account.merge({ active: false }).save()

    return account.$isPersisted ? account : { message: 'Conta não desativada!' }
  }
}
