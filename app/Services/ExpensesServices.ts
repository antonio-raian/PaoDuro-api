import BankAccount from 'App/Models/BankAccount'
import CredCard from 'App/Models/CredCard'
import Expenses from 'App/Models/Expense'
import { sub } from 'date-fns'
import { updateAccount } from './BankAccountServices'
import { updateCredCard } from './CredCardsServices'

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

  let userId
  // Atualiza o montante da conta
  if (bankAccountId) {
    const account = await BankAccount.findOrFail(bankAccountId)
    await updateAccount(bankAccountId, { balance: account.balance - value })
    userId = account.userId
  } else if (credCardId) {
    const cred = await CredCard.findOrFail(credCardId)
    await updateCredCard(credCardId, { balance: cred.balance - value })
    userId = cred.userId
  } else {
    throw { message: 'É preciso informar a fonte da renda para essa despesa!' }
  }

  await expense
    .fill({
      name,
      value,
      date,
      status,
      paidAt,
      userId,
      bankAccountId,
      credCardId,
      categoryId,
    })
    .save()

  return expense.$isPersisted ? expense : { message: 'Despesa não criada!' }
}

export const findExpenses = async (search) => {
  const today = new Date()
  let initial = sub(today, { days: today.getDate() - 1 })
  let final = new Date(today.getFullYear(), today.getMonth() + 1, 1)

  if (search.initialDate) {
    initial = new Date(search.initialDate)
    delete search.initialDate
  }
  if (search.finalDate) {
    final = new Date(search.finalDate)
    delete search.finalDate
  }

  return await Expenses.query()
    .where((q) => {
      q.where(search).andWhereBetween('date', [initial, final])
    })
    .preload('category')
    .orderBy('date', 'desc')
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
    await updateAccount(expense.credCardId, { balance: cred.balance + expense.value })
  }

  await expense.delete()

  return expense.$isDeleted ? expense : { message: 'Despesa não desativada!' }
}
