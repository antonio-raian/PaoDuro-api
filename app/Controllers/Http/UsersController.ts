import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {
  addCategory,
  createUser,
  findCategories,
  findUser,
  removeUser,
  updateUser,
} from 'App/Services/UserServices'

export default class UsersController {
  public async create({ auth, request }: HttpContextContract) {
    const { username, password, fullname, photo, savings } = request.all()
    const users = await findUser({ username })
    let user: User
    if (users.length) user = users[0]
    else user = await createUser({ username, password, fullname, photo, savings })

    console.log(username, password)

    const token = await auth.use('api').attempt(username, password, {
      expiresIn: '10 days',
    })
    return { user, token }
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
