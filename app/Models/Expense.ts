import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BankAccount from './BankAccount'
import Category from './Category'
import CredCard from './CredCard'

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public value: string
  @column()
  public date: string
  @column()
  public repeatExpense: string
  @column()
  public paid: string
  @column()
  public paidAt: string
  @column()
  public active: string

  @column()
  public bankAccountId: string
  @column()
  public credCardId: string
  @column()
  public categoryId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @belongsTo(() => BankAccount)
  public account: BelongsTo<typeof BankAccount>

  @belongsTo(() => CredCard)
  public credCard: BelongsTo<typeof CredCard>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
