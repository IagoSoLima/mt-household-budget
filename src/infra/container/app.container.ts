import { container } from 'tsyringe';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import ExpenseRepositoryFake from '~/core/repository/fake/expense.repository.fake';
import ExpenseRepository from '../database/postgres/repository/expense.repository';

container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepositoryFake
);
