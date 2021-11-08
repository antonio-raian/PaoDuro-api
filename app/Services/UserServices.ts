import User from 'App/Models/User'
import moment from 'moment'

export const createUser = async ({ username, password }) => {
  // nome aleatório
  const fullname = username + moment().unix() // pega o valor moment em milissegundos

  const user = new User()
  await user.fill({ username, fullname, password }).save()

  return user
}

export const findUser = async (search) => {
  return await User.query().where(search).preload('accounts').preload('cred_cards')
}

export const updateUser = async (newUser) => {
  const { id, username, fullname, savings, password } = newUser

  const user = await User.findOrFail(id)

  await user.merge({ username, fullname, savings, password }).save()

  return user.$isPersisted ? user : { message: 'Usuário não atualizado!' }
}

export const removeUser = async (id) => {
  const user = await User.findOrFail(id)

  await user.delete()

  return user.$isDeleted ? user : { message: 'Usuário não desativado!' }
}
