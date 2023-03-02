import { inject, injectable } from 'tsyringe';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
@injectable()
export class ListExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute() {
    const now = new Date();
    const actualInitCurrentDateMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const expenses = await this.expenseRepository.getAll(
      actualInitCurrentDateMonth
    );
    return expenses;
  }
}
