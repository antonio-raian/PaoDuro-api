import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Expense from './Expense'
import User from './User'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public iconName: string
  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship
  @manyToMany(() => User, {
    pivotTable: 'user_categories',
    localKey: 'id',
    pivotForeignKey: 'category_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public categories: ManyToMany<typeof User>

  @hasMany(() => Expense)
  public accounts: HasMany<typeof Expense>
}
