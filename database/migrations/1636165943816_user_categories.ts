import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserCategories extends BaseSchema {
  protected tableName = 'user_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.bigInteger('user_id').references('users.id').notNullable().onDelete('cascade')
      table.bigInteger('category_id').references('categories.id').notNullable().onDelete('cascade')
      table.unique(['user_id', 'category_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
