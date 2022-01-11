import BankAccount from 'App/Models/BankAccount'
import Savings from 'App/Models/Saving'
import { updateAccount } from './BankAccountServices'

export const createSavings = async ({
  name,
  description,
  endPeriod,
  intendedValue,
  balance,
  priority,
  userId,
  bankAccountId,
}) => {
  const saving = new Savings()

  await saving
    .fill({
      name,
      description,
      endPeriod,
      intendedValue,
      balance,
      priority,
      userId,
      bankAccountId,
    })
    .save()

  return saving.$isPersisted ? saving : { message: 'Pé de Meia não criada!' }
}

export const findSavings = async (search) => {
  return await Savings.query().where(search).preload('account').preload('user')
}

export const updateSavings = async (savingId, newSavings) => {
  const saving = await Savings.findOrFail(savingId)

  await saving.merge(newSavings).save()

  return saving.$isPersisted ? saving : { message: 'Pé de Meia não atualizada!' }
}

export const removeSavings = async (id) => {
  const saving = await Savings.findOrFail(id)

  // Atualiza o montante da conta
  const account = await BankAccount.findOrFail(saving.bankAccountId)
  await updateAccount(saving.bankAccountId, { balance: account.balance + saving.balance })

  await saving.delete()

  return saving.$isDeleted ? saving : { message: 'Pé de Meia não desativada!' }
}
