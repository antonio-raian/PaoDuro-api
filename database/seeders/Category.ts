import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    await Category.createMany([
      {
        name: 'Alimentação',
        iconName: 'food',
      },
      {
        name: 'Mercado',
        iconName: 'cart',
      },
      {
        name: 'Transporte',
        iconName: 'car',
      },
      {
        name: 'Moradia',
        iconName: 'home',
      },
      {
        name: 'Saúde',
        iconName: 'fitness',
      },
      {
        name: 'Outros',
        iconName: 'color-filter-outlined',
      },
    ])
  }
}
