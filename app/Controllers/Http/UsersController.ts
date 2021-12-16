import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  addCategory,
  createUser,
  findCategories,
  findUser,
  removeUser,
  updateUser,
} from 'App/Services/UserServices'

export default class UsersController {
  public async login({ auth, request }: HttpContextContract) {
    const { username, password } = request.all()

    const token = await auth.use('api').attempt(username, password, {
      expiresIn: '10 days',
    })
    return { token }
  }

  public async create({ request }: HttpContextContract) {
    const { username, password, fullname, photo, savings } = request.all()
    const users = await findUser({ username })

    if (users.length) return { statusCode: 203, message: 'Cliente existente' }

    return await createUser({ username, password, fullname, photo, savings })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()
    return await findUser(search)
  }

  public async getCategories({ auth, request }: HttpContextContract) {
    const searchUser = { id: auth.user?.id }
    const searchCateg = request.all()
    return await findCategories(searchUser, searchCateg)
  }

  public async addCategory({ auth, request }: HttpContextContract) {
    const { categoryId } = request.all()

    return addCategory(auth.user?.id, categoryId)
  }

  public async update({ request }: HttpContextContract) {
    return await updateUser(request.all())
  }

  public async destroy({ request }: HttpContextContract) {
    const users = await findUser(request.all())

    return users.length && (await removeUser(users[0].id))
  }
}
