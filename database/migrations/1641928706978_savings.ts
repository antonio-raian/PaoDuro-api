import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Savings extends BaseSchema {
  protected tableName = 'savings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name').notNullable()
      table.text('description')
      table.date('end_period').notNullable()
      table.float('intended_value').notNullable()
      table.float('balance').defaultTo(0)
      table.float('priority').defaultTo(100)
      table.boolean('active').defaultTo(true)

      table.bigInteger('user_id').references('users.id').notNullable().onDelete('cascade')
      table.bigInteger('bank_account_id').references('bank_accounts.id').onDelete('cascade')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
