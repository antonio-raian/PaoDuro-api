/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/', 'UsersController.create')
  Route.get('/', 'UsersController.show')
  Route.put('/', 'UsersController.update')
}).prefix('/user')
// .middleware(['auth'])

Route.group(() => {
  Route.post('/', 'BankAccountsController.create')
  Route.get('/', 'BankAccountsController.show')
  Route.put('/', 'BankAccountsController.update')
  Route.delete('/:id', 'BankAccountsController.destroy')
}).prefix('/account')

Route.group(() => {
  Route.post('/', 'CredCardsController.create')
  Route.get('/', 'CredCardsController.show')
  Route.put('/', 'CredCardsController.update')
  Route.delete('/:id', 'CredCardsController.destroy')
}).prefix('/credCard')

Route.group(() => {
  Route.post('/', 'RentsController.create')
  Route.get('/', 'RentsController.show')
  Route.put('/', 'RentsController.update')
  Route.delete('/:id', 'RentsController.destroy')
}).prefix('/rent')

Route.group(() => {
  Route.post('/', 'ExpensesController.create')
  Route.get('/', 'ExpensesController.show')
  Route.put('/', 'ExpensesController.update')
  Route.delete('/:id', 'ExpensesController.destroy')
}).prefix('/expense')

Route.group(() => {
  Route.post('/', 'CategoriesController.create')
  Route.get('/', 'CategoriesController.show')
  Route.put('/', 'CategoriesController.update')
  Route.delete('/:id', 'CategoriesController.destroy')
}).prefix('/category')
