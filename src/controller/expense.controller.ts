import { container } from 'tsyringe';
import type Expense from '~/core/entity/expense.entity';
import { RegisterExpenseUseCase } from '~/core/usecase/register-expense.usecase';
import type AbstractController from './abstract-controller.interface';

const ExpenseController: AbstractController = {
  async create<obj, Expense>(params: obj): Promise<Expense> {
    const createExpense = container.resolve(RegisterExpenseUseCase);
    const expense = await createExpense.execute();

    return expense as Expense;
  },

  async list(params): Promise<any> {
    await Promise.resolve(() => {
      throw new Error('Not implemented');
    });
  }
};

export default ExpenseController;
