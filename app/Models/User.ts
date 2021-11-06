import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BankAccount from './BankAccount'
import Category from './Category'
import CredCard from './CredCard'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public fullname: string

  @column()
  public savings: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship
  @hasMany(() => BankAccount)
  public accounts: HasMany<typeof BankAccount>

  @hasMany(() => CredCard)
  public cred_cards: HasMany<typeof CredCard>

  @manyToMany(() => Category, {
    pivotTable: 'user_categories',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
  })
  public categories: ManyToMany<typeof Category>
}
