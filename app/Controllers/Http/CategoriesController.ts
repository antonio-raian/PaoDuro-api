import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async create({ request }: HttpContextContract) {
    const { name, iconName } = request.all()

    const category = new Category()

    await category.fill({ name, iconName }).save()

    return category.$isPersisted ? category : { message: 'Categoria não criada!' }
  }

  public async store({}: HttpContextContract) {}

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await Category.query().where(search)
  }

  public async update({ request }: HttpContextContract) {
    const { id, name, iconName } = request.all()

    const category = await Category.findOrFail(id)

    await category.merge({ name, iconName }).save()

    return category.$isPersisted ? category : { message: 'Categoria não atualizado!' }
  }

  public async edit({ request }: HttpContextContract) {
    const { id } = request.all()

    const category = await Category.findOrFail(id)

    await category.merge({ active: false }).save()

    return category.$isPersisted ? category : { message: 'Categoria não desativada!' }
  }

  public async destroy({}: HttpContextContract) {}
}
