import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CredCards extends BaseSchema {
  protected tableName = 'cred_cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name').notNullable()
      table.float('limit').defaultTo(0)
      table.string('due_date').notNullable()
      table.string('color').defaultTo('gray')
      table.boolean('default_card').defaultTo(false)
      table.boolean('active').defaultTo(true)

      table.bigInteger('user_id').references('users.id').notNullable().onDelete('cascade')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
