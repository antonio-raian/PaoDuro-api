import Category from 'App/Models/Category'

export const createCategory = async (newCategory) => {
  const category = new Category()
  await category.fill(newCategory).save()

  return category
}

export const findCategory = async (search) => {
  console.log('Find Categories', search)
  return await Category.query().where(search).orderBy('id', 'asc')
}

export const updateCategory = async (newCategory) => {
  const { id, name, iconName } = newCategory

  const category = await Category.findOrFail(id)

  await category.merge({ name, iconName }).save()

  return category.$isPersisted ? category : { message: 'Categoria não atualizada!' }
}

export const removeCategory = async (id) => {
  const category = await Category.findOrFail(id)

  await category.delete()

  return category.$isDeleted ? category : { message: 'Categoria não desativada!' }
}
