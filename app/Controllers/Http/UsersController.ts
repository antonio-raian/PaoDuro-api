import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import moment from 'moment'

export default class UsersController {
  public async create({ request }: HttpContextContract) {
    const { username } = request.all()

    // nome aleatório
    const fullname = username + moment().unix() // pega o valor moment em milissegundos

    const user = new User()
    await user.fill({ username, fullname }).save()

    return user.$isPersisted ? user : { message: 'Usuário não criado!' }
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await User.query().where(search).preload('accounts').preload('cred_cards')
  }

  public async update({ request }: HttpContextContract) {
    const { id, username, fullname, savings } = request.all()

    const user = await User.findOrFail(id)

    await user.merge({ username, fullname, savings }).save()

    return user.$isPersisted ? user : { message: 'Usuário não atualizado!' }
  }
}
