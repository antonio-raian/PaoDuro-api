import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Expenses extends BaseSchema {
  protected tableName = 'expenses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name').notNullable()
      table.float('value').notNullable()
      table.date('date').notNullable()
      table.boolean('repeat_expense').defaultTo(false)
      table.boolean('paid').defaultTo(false)
      table.date('paid_at')
      table.boolean('active').defaultTo(true)

      table.bigInteger('bank_account_id').references('bank_accounts.id').onDelete('cascade')
      table.bigInteger('cred_card_id').references('cred_cards.id').onDelete('cascade')
      table.bigInteger('category_id').references('categories.id').notNullable().onDelete('cascade')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
