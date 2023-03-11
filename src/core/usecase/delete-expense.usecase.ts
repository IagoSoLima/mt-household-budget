import { inject, injectable } from 'tsyringe';
import AppLoggerAdapter from '~/adapter/app-logger.adapter';
import { IExpenseRepository as ExpenseRepository } from '../repository/expense.repository.interface';

@injectable()
export class DeleteExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,

    private readonly logger = AppLoggerAdapter.create()
  ) {}

  async execute(id: number) {
    const expense = await this.expenseRepository.getById(Number(id));
    const foundExpense = expense !== null;

    if (!foundExpense) {
      this.logger.fail({
        category: 'DELETE_EXPENSE_USECASE_ERROR',
        error: 'Expense not found'
      });
      throw new Error('EXPENSE_NOT_FOUND');
    }
    await this.expenseRepository.delete(Number(id));
  }
}
