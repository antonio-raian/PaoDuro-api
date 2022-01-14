import CredCard from 'App/Models/CredCard'

export const createCredCard = async ({
  name,
  color,
  limit,
  balance,
  defaultCard,
  dueDate,
  userId,
}) => {
  const credCard = new CredCard()

  await credCard.fill({ name, color, limit, balance, defaultCard, dueDate, userId }).save()

  return credCard.$isPersisted ? credCard : { message: 'Cartão não criada!' }
}

export const findCredCard = async (search) => {
  return await CredCard.query().where(search).preload('user')
}

export const updateCredCard = async (credId, newCredCard) => {
  const credCard = await CredCard.findOrFail(credId)

  await credCard.merge(newCredCard).save()

  return credCard.$isPersisted ? credCard : { message: 'Cartão não atualizado!' }
}

export const removeCredCard = async (id) => {
  const account = await CredCard.findOrFail(id)

  await account.delete()

  return account.$isDeleted ? account : { message: 'Cartão não desativado!' }
}
