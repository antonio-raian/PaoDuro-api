import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createUser, findUser, removeUser, updateUser } from 'App/Services/UserServices'

export default class UsersController {
  public async login({ auth, request }: HttpContextContract) {
    const { username, password } = request.all()

    const token = await auth.use('api').attempt(username, password, {
      expiresIn: '10 days',
    })
    return { token }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const { username, password, fullname, photo, savings, level } = request.all()
    const users = await findUser({ username })

    if (auth.user?.level !== '0') {
      return response
        .status(401)
        .send({ message: 'Você não possui permissão para executar essa ação!' })
    }
    if (users.length) return response.status(203).send({ message: 'Cliente existente' })

    return await createUser({ username, password, fullname, photo, savings, level: level || 1 })
  }

  public async show({ auth, request }: HttpContextContract) {
    const search = request.all()
    return await findUser(search)
  }

  public async update({ auth, params, request }: HttpContextContract) {
    console.log(params, request.all())
    return await updateUser(params.id || auth.user?.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
    const users = await findUser({ id: params.id })

    return users.length && (await removeUser(users[0].id))
  }
}
