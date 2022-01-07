import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'
import { createExpenses, removeExpenses, updateExpenses } from 'App/Services/ExpensesServices'

export default class ExpensesController {
  public async create({ request }: HttpContextContract) {
    const { name, value, date, status, paidAt, bankAccountId, credCardId, categoryId } =
      request.all()

    return await createExpenses({
      name,
      value,
      date,
      status,
      paidAt,
      bankAccountId,
      credCardId,
      categoryId,
    })
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all()

    return await Expense.query()
      .where(search)
      .preload('account')
      .preload('category')
      .preload('credCard')
  }

  public async update({ params, request }: HttpContextContract) {
    return await updateExpenses(params.id, request.all())
  }

  public async destroy({ params }: HttpContextContract) {
    return await removeExpenses(params.id)
  }
}
