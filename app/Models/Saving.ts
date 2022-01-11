import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BankAccount from './BankAccount'
import User from './User'

export default class Saving extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public description: string
  @column({ serializeAs: 'endPeriod' })
  public endPeriod: Date
  @column({ serializeAs: 'intendedValue' })
  public intendedValue: number
  @column()
  public balance: number
  @column()
  public priority: number
  @column()
  public active: boolean

  @column({ serializeAs: 'userId' })
  public userId: number
  @column({ serializeAs: 'bankAccountId' })
  public bankAccountId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relatioships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => BankAccount)
  public account: BelongsTo<typeof BankAccount>
}
