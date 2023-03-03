import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from './dto/create-expense.dto';

export interface IExpenseRepository {
  create: (params: CreateExpense) => Promise<Expense>;
  getById: (id: number) => Promise<Expense | null>;
  getAll: (initialDateMounth: Date) => Promise<Expense[] | []>;
  update: (id: number, params: CreateExpense) => Promise<Expense>;
  delete: (id: number) => Promise<void>;
}
