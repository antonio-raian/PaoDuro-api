import BankAccount from 'App/Models/BankAccount'

export const createAccount = async ({ name, color, balance, defaultAccount, userId }) => {
  const account = new BankAccount()

  await account.fill({ name, color, balance, defaultAccount, userId }).save()

  return account
}

export const findAccount = async (search) => {
  return await BankAccount.query().where(search).preload('user')
}

export const updateAccount = async (newAccount) => {
  const { id, name, color, balance, defaultAccount } = newAccount

  const account = await BankAccount.findOrFail(id)

  await account.merge({ name, color, balance, defaultAccount }).save()

  return account.$isPersisted ? account : { message: 'Conta Bancária não atualizada!' }
}

export const removeAccount = async (id) => {
  const account = await BankAccount.findOrFail(id)

  await account.delete()

  return account.$isDeleted ? account : { message: 'Conta Bancária não desativada!' }
}
