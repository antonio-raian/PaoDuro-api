import User from 'App/Models/User'

export const createUser = async (newUser) => {
  const user = new User()
  await user.fill(newUser).save()

  return user
}

export const findUser = async (search) => {
  return await User.query()
    .where(search)
    .preload('accounts')
    .preload('credCards')
    .preload('categories')
}

export const findCategories = async (searchUser, searchCategory) => {
  const user = await User.query()
    .where(searchUser)
    .preload('categories', (q) => {
      q.where(searchCategory).orderBy('id', 'asc')
    })
  return user[0].categories
}

export const addCategory = async (userId, categoryId) => {
  const user = await User.findByOrFail('id', userId)
  await user.related('categories').attach([categoryId])
}

export const updateUser = async (userId, newUser) => {
  const user = await User.findOrFail(userId)

  await user.merge(newUser).save()

  return user.$isPersisted ? user : { message: 'Usuário não atualizado!' }
}

export const removeUser = async (id) => {
  const user = await User.findOrFail(id)

  await user.delete()

  return user.$isDeleted ? user : { message: 'Usuário não desativado!' }
}
