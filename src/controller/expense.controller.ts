import { container } from 'tsyringe';
import type AbstractController from '~/common/controller/abstract-controller.interface';
import type Expense from '~/core/entity/expense.entity';
import { DeleteExpenseUseCase } from '~/core/usecase/delete-expense.usecase';
import { ListExpenseUseCase } from '~/core/usecase/list-expense.usecase';
import { RegisterExpenseUseCase } from '~/core/usecase/register-expense.usecase';
import { UpdateAmountExpenseUseCase } from '~/core/usecase/update-amount-expense.usecase';
import { UpdateExpenseUseCase } from '~/core/usecase/update-expense.usecase';
import { type ExpanceListParam } from './dto/expance-list-param.dto';
import { type ExpensePatchParam } from './dto/expense-patch-param.dto';
import { type ExpenseStoreParam } from './dto/expense-store-param.dto';
import { type ExpenseUpdateParam } from './dto/expense-update-param.dto';

const ExpenseController: AbstractController = {
  async store(params: ExpenseStoreParam): Promise<Expense> {
    const createExpense = container.resolve(RegisterExpenseUseCase);
    const expense = await createExpense.execute(params);

    return expense;
  },

  async list(params: ExpanceListParam): Promise<any> {
    const listExpense = container.resolve(ListExpenseUseCase);
    const expense = await listExpense.execute(params);

    return expense;
  },

  async patch(params: ExpensePatchParam): Promise<Expense> {
    const { id, ...rest } = params;

    const patchExpense = container.resolve(UpdateAmountExpenseUseCase);
    const expense = await patchExpense.execute({ id: Number(id), ...rest });
    return expense;
  },

  async delete({ id }: { id: number }): Promise<void> {
    const deleteExpense = container.resolve(DeleteExpenseUseCase);
    await deleteExpense.execute(id);
  },

  async update({ id, ...rest }: ExpenseUpdateParam): Promise<Expense> {
    const updateExpense = container.resolve(UpdateExpenseUseCase);
    const expense = await updateExpense.execute({ id: Number(id), ...rest });
    return expense;
  }
};

export default ExpenseController;
