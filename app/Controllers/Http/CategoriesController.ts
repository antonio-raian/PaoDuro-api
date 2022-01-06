import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createCategory,
  findCategory,
  removeCategory,
  updateCategory,
} from 'App/Services/CategoryServices'
import { addCategory, findCategories } from 'App/Services/UserServices'

export default class CategoriesController {
  public async create({ request }: HttpContextContract) {
    const { name, iconName } = request.all()

    return createCategory({ name, iconName })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return findCategory(search)
  }

  public async update({ params, request }: HttpContextContract) {
    return updateCategory(params.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
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
