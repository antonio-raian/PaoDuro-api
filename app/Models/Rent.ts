import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BankAccount from './BankAccount'
import User from './User'

export default class Rent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public value: number
  @column()
  public date: DateTime

  @column({ serializeAs: 'bankAccountId' })
  public bankAccountId: number

  @column({ serializeAs: 'userId' })
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship
  @belongsTo(() => BankAccount)
  public bankAccount: BelongsTo<typeof BankAccount>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
