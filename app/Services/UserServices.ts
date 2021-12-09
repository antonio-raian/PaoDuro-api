import User from 'App/Models/User'

export const createUser = async (newUser) => {
  const user = new User()
  await user.fill(newUser).save()

  return user
}

export const findUser = async (search) => {
  return await User.query().where(search).preload('accounts').preload('cred_cards')
}

export const updateUser = async (newUser) => {
  const { id, username, fullname, photo, savings, password } = newUser

  const user = await User.findOrFail(id)

  await user.merge({ username, fullname, savings, password, photo }).save()

  return user.$isPersisted ? user : { message: 'Usuário não atualizado!' }
}

export const removeUser = async (id) => {
  const user = await User.findOrFail(id)

  await user.delete()

  return user.$isDeleted ? user : { message: 'Usuário não desativado!' }
}
