import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BankAccounts extends BaseSchema {
  protected tableName = 'bank_accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name').notNullable()
      table.string('color').defaultTo('#F0F0F0')
      table.float('balance').defaultTo(0)
      table.boolean('default_account').defaultTo(false)
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
