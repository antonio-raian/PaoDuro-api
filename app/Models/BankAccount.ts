import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from './User'

export default class BankAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public balance: number

  @column({ serializeAs: 'defaultAccount' })
  public defaultAccount: boolean

  @column({ serializeAs: 'userId' })
  public userId: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relatioships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
