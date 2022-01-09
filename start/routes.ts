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

Route.post('/users/login', 'UsersController.login')

Route.group(() => {
  Route.post('/', 'UsersController.create')
  Route.get('/', 'UsersController.show')
  Route.put('/', 'UsersController.update')
  Route.put('/:id', 'UsersController.update')
  Route.delete('/:id', 'UsersController.destroy')
})
  .prefix('/users')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'CategoriesController.byUser')
  Route.get('/:id', 'CategoriesController.byUser')
  Route.put('/add', 'CategoriesController.addToUser')
  Route.put('/add/:id', 'CategoriesController.addToUser')
  Route.put('/remove', 'CategoriesController.removeToUser')
  Route.put('/remove/:id', 'CategoriesController.removeToUser')
})
  .prefix('/users-categories')
  .middleware('auth')

Route.group(() => {
  Route.post('/', 'CategoriesController.create')
  Route.get('/', 'CategoriesController.show')
  Route.put('/:id', 'CategoriesController.update')
  Route.delete('/:id', 'CategoriesController.destroy')
})
  .prefix('/categories')
  .middleware('auth')

Route.group(() => {
  Route.post('/', 'BankAccountsController.create')
  Route.post('/:id', 'BankAccountsController.create')
  Route.get('/', 'BankAccountsController.show')
  Route.put('/:id', 'BankAccountsController.update')
  Route.delete('/:id', 'BankAccountsController.destroy')
})
  .prefix('/accounts')
  .middleware('auth')

Route.group(() => {
  Route.post('/', 'CredCardsController.create')
  Route.post('/:id', 'CredCardsController.create')
  Route.get('/', 'CredCardsController.show')
  Route.put('/:id', 'CredCardsController.update')
  Route.delete('/:id', 'CredCardsController.destroy')
})
  .prefix('/cred-cards')
  .middleware('auth')

Route.group(() => {
  Route.post('/', 'RentsController.create')
  Route.get('/', 'RentsController.show')
  Route.delete('/:id', 'RentsController.destroy')
})
  .prefix('/rents')
  .middleware('auth')

Route.group(() => {
  Route.post('/', 'ExpensesController.create')
  Route.get('/', 'ExpensesController.show')
  Route.delete('/:id', 'ExpensesController.destroy')
})
  .prefix('/expenses')
  .middleware('auth')
