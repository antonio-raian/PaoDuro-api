import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rents extends BaseSchema {
  protected tableName = 'rents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name').notNullable()
      table.float('value').notNullable()
      table.date('date').notNullable()

      table
        .bigInteger('bank_account_id')
        .references('bank_accounts.id')
        .notNullable()
        .onDelete('cascade')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
