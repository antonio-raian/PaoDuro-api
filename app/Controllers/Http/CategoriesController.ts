import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createCategory,
  findCategory,
  removeCategory,
  updateCategory,
} from 'App/Services/CategoryServices'

export default class CategoriesController {
  public async create({ request }: HttpContextContract) {
    const { name, iconName } = request.all()

    return createCategory({ name, iconName })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return findCategory(search)
  }

  public async update({ request }: HttpContextContract) {
    const { id, name, iconName } = request.all()

    return updateCategory({ id, name, iconName })
  }

  public async destroy({ request }: HttpContextContract) {
    const categories = await findCategory(request.all())

    return categories.length && (await removeCategory(categories[0].id))
  }
}
