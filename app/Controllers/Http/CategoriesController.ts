import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createCategory,
  findCategory,
  removeCategory,
  updateCategory,
} from 'App/Services/CategoryServices'
import { addCategory, findCategories } from 'App/Services/UserServices'

export default class CategoriesController {
  public async create({ auth, request, response }: HttpContextContract) {
    const { name, iconName } = request.all()
    if (auth.user?.level !== '0') {
      return response
        .status(401)
        .send({ message: 'Você não possui permissão para executar essa ação!' })
    }
    return createCategory({ name, iconName })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return findCategory(search)
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    if (auth.user?.level !== '0') {
      return response
        .status(401)
        .send({ message: 'Você não possui permissão para executar essa ação!' })
    }
    return updateCategory(params.id, request.all())
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    if (auth.user?.level !== '0') {
      return response
        .status(401)
        .send({ message: 'Você não possui permissão para executar essa ação!' })
    }
    const categories = await findCategory({ id: params.id })

    return categories.length && (await removeCategory(categories[0].id))
  }

  public async byUser({ auth, params, request }: HttpContextContract) {
    const searchUser = { id: params.id || auth.user?.id }
    const searchCateg = request.all()

    return await findCategories(searchUser, searchCateg)
  }

  public async addToUser({ auth, params, request }: HttpContextContract) {
    const { categoryId } = request.all()

    return addCategory(params.id || auth.user?.id, categoryId)
  }
}
