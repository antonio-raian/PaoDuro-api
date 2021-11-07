import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createUser, findUser, removeUser, updateUser } from 'App/Services/UserServices'

export default class UsersController {
  public async create({ auth, request }: HttpContextContract) {
    const { username } = request.all()
    const users = await findUser({ username })
    let user
    if (users.length) user = users[0]
    else user = await createUser({ username })
    const token = await auth.use('api').generate(user)
    return token
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()
    return await findUser(search)
  }

  public async update({ request }: HttpContextContract) {
    return await updateUser(request.all())
  }

  public async destroy({ request }: HttpContextContract) {
    const users = await findUser(request.all())

    return users.length && (await removeUser(users[0].id))
  }
}
