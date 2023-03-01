import type Expense from '~/core/entity/expense.entity';
import { type createExpenseDTO } from './dto/create-expense.dto';

export interface IExpenseRepository {
  create: (params: createExpenseDTO) => Promise<Expense>;
  getAll: () => Promise<Expense[]>;
}
