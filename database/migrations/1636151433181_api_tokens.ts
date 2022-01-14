import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    ;(await !this.schema.hasTable(this.tableName))
      ? this.schema.createTable(this.tableName, (table) => {
          table.bigIncrements('id').primary()
          table
            .bigInteger('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
          table.string('name').notNullable()
          table.string('type').notNullable()
          table.string('token', 64).notNullable().unique()

          /**
           * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
           */
          table.timestamp('expires_at', { useTz: true }).nullable()
          table.timestamp('created_at', { useTz: true }).notNullable()
        })
      : this.schema.alterTable(this.tableName, (table) => {})
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
  }
}
