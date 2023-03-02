import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from './dto/create-expense.dto';

export interface IExpenseRepository {
  create: (params: CreateExpense) => Promise<Expense>;
  getAll: () => Promise<Expense[]>;
}
