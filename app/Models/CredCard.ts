import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from './User'

export default class CredCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public limit: number

  @column()
  public dueDate: string

  @column()
  public color: string

  @column()
  public defaultCard: boolean

  @column()
  public active: boolean

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
