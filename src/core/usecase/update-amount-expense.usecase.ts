import { inject, injectable } from 'tsyringe';
import AppLoggerAdapter from '~/adapter/app-logger.adapter';
import { type IExpenseRepository as ExpenseRepository } from '../repository/expense.repository.interface';
import { type UpdateAmountExpenseParam } from './dto/update-amount-expense-param.dto';

@injectable()
export class UpdateAmountExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,

    private readonly logger = AppLoggerAdapter.create()
  ) {}

  async execute(params: UpdateAmountExpenseParam) {
    const { id, amount } = params;

    const expense = await this.expenseRepository.getById(id);
    const foundExpense = expense !== null;

    if (!foundExpense) {
      this.logger.fail({
        category: 'UPDATE_AMOUNT_EXPENSE_USECASE_ERROR',
        error: 'Expense not found'
      });
      throw new Error('EXPENSE_NOT_FOUND');
    }

    expense.amount = amount;

    const expenseUpdated = await this.expenseRepository.update(id, expense);

    return expenseUpdated;
  }
}
