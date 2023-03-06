import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from './dto/create-expense.dto';
import { type ListDefaultParam } from './dto/list-default-param.dto';
import { type ListExpenseParam } from './dto/list-expense.dto';
import { type ListRangeDateParam } from './dto/list-range-date-param.dto';

export interface IExpenseRepository {
  create: (params: CreateExpense) => Promise<Expense>;
  getById: (id: number) => Promise<Expense | null>;
  getAll: (param?: ListDefaultParam) => Promise<Expense[] | []>;
  getByMonth: (param: ListExpenseParam) => Promise<Expense[] | []>;
  getByRangeDate: (param: ListRangeDateParam) => Promise<Expense[] | []>;
  update: (id: number, params: CreateExpense) => Promise<Expense>;
  delete: (id: number) => Promise<void>;
}
