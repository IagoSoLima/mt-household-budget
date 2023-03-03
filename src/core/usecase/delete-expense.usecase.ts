import { inject, injectable } from 'tsyringe';
import { IExpenseRepository as ExpenseRepository } from '../repository/expense.repository.interface';

@injectable()
export class DeleteExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(id: number) {
    const expense = await this.expenseRepository.getById(Number(id));
    const foundExpense = expense !== null;

    console.log('execute', expense, foundExpense);
    if (!foundExpense) {
      throw new Error('Expense not found');
    }
    await this.expenseRepository.delete(Number(id));
  }
}
