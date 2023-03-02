import { container } from 'tsyringe';
import type AbstractController from '~/common/controller/abstract-controller.interface';
import type Expense from '~/core/entity/expense.entity';
import { ListExpenseUseCase } from '~/core/usecase/list-expense.usecase';
import { RegisterExpenseUseCase } from '~/core/usecase/register-expense.usecase';
import { type ExpenseStoreParam } from './dto/expense-store-param.dto';

const ExpenseController: AbstractController = {
  async store(params: ExpenseStoreParam): Promise<Expense> {
    const createExpense = container.resolve(RegisterExpenseUseCase);
    const expense = await createExpense.execute(params);

    return expense;
  },

  async list(): Promise<any> {
    const listExpense = container.resolve(ListExpenseUseCase);
    const expense = await listExpense.execute();

    return expense;
  }
};

export default ExpenseController;
