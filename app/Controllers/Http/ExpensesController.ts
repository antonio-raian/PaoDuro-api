import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'

export default class ExpensesController {
  public async create({ request }: HttpContextContract) {
    const {
      name,
      value,
      date,
      repeatExpense,
      paid,
      paidAt,
      bankAccountId,
      credCardId,
      categoryId,
    } = request.all()

    const rent = new Expense()

    await rent
      .fill({
        name,
        value,
        date,
        repeatExpense,
        paid,
        paidAt,
        bankAccountId,
        credCardId,
        categoryId,
      })
      .save()

    return rent.$isPersisted ? rent : { message: 'Renda não criada!' }
  }
  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await Expense.query()
      .where(search)
      .preload('account')
      .preload('category')
      .preload('credCard')
  }

  public async update({ request }: HttpContextContract) {
    const {
      id,
      name,
      value,
      date,
      repeatExpense,
      paid,
      paidAt,
      bankAccountId,
      credCardId,
      categoryId,
    } = request.all()

    const rent = await Expense.findOrFail(id)

    await rent
      .merge({
        name,
        value,
        date,
        repeatExpense,
        paid,
        paidAt,
        bankAccountId,
        credCardId,
        categoryId,
      })
      .save()

    return rent.$isPersisted ? rent : { message: 'Renda não atualizado!' }
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const rent = await Expense.findOrFail(id)

    await rent.delete()

    return rent.$isDeleted ? rent : { message: 'Renda não desativada!' }
  }
}
