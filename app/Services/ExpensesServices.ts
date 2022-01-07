import BankAccount from 'App/Models/BankAccount'
import CredCard from 'App/Models/CredCard'
import Expenses from 'App/Models/Expense'
import { updateAccount } from './BankAccountServices'

export const createExpenses = async ({
  name,
  value,
  date,
  status,
  paidAt,
  bankAccountId,
  credCardId,
  categoryId,
}) => {
  const expense = new Expenses()

  await expense
    .fill({
      name,
      value,
      date,
      status,
      paidAt,
      bankAccountId,
      credCardId,
      categoryId,
    })
    .save()

  // Atualiza o montante da conta
  if (bankAccountId) {
    const account = await BankAccount.findOrFail(bankAccountId)
    await updateAccount(bankAccountId, { balance: account.balance - value })
  }
  if (credCardId) {
    const cred = await CredCard.findOrFail(credCardId)
    await updateAccount(bankAccountId, { balance: cred.limit - value })
  }

  return expense.$isPersisted ? expense : { message: 'Despesa não criada!' }
}

export const findExpenses = async (search) => {
  return await Expenses.query()
    .where(search)
    .preload('account')
    .preload('category')
    .preload('credCard')
}

export const updateExpenses = async (rentId, newExpenses) => {
  const expense = await Expenses.findOrFail(rentId)

  await expense.merge(newExpenses).save()

  return expense.$isPersisted ? expense : { message: 'Despesa não atualizada!' }
}

export const removeExpenses = async (id) => {
  const expense = await Expenses.findOrFail(id)

  // Atualiza o montante da conta
  if (expense.bankAccountId) {
    const account = await BankAccount.findOrFail(expense.bankAccountId)
    await updateAccount(expense.bankAccountId, { balance: account.balance + expense.value })
  }
  if (expense.credCardId) {
    const cred = await CredCard.findOrFail(expense.credCardId)
    await updateAccount(expense.credCardId, { balance: cred.limit + expense.value })
  }

  await expense.delete()

  return expense.$isDeleted ? expense : { message: 'Despesa não desativada!' }
}
