import BankAccount from 'App/Models/BankAccount'
import Rents from 'App/Models/Rent'
import { sub } from 'date-fns'
import { updateAccount } from './BankAccountServices'

export const createRents = async ({ name, value, date, bankAccountId }) => {
  const rent = new Rents()

  await rent.fill({ name, value, date, bankAccountId }).save()

  // Atualiza o montante da conta
  const account = await BankAccount.findOrFail(bankAccountId)
  await updateAccount(bankAccountId, { balance: account.balance + value })

  return rent.$isPersisted ? rent : { message: 'Receita não criada!' }
}

export const findRents = async (search) => {
  let final = new Date()
  let initial = sub(final, { days: final.getDate() - 1 })

  if (search.initialDate) {
    initial = new Date(search.initialDate)
    delete search.initialDate
  }
  if (search.finalDate) {
    final = new Date(search.finalDate)
    delete search.finalDate
  }

  return await Rents.query().where((q) => {
    q.where(search).andWhereBetween('date', [initial, final])
  })
}

export const updateRents = async (rentId, newRents) => {
  const rent = await Rents.findOrFail(rentId)

  await rent.merge(newRents).save()

  return rent.$isPersisted ? rent : { message: 'Receita não atualizada!' }
}

export const removeRents = async (id) => {
  const rent = await Rents.findOrFail(id)

  // Atualiza o montante da conta
  const account = await BankAccount.findOrFail(rent.bankAccountId)
  await updateAccount(rent.bankAccountId, { balance: account.balance - rent.value })

  await rent.delete()

  return rent.$isDeleted ? rent : { message: 'Receita não desativada!' }
}
