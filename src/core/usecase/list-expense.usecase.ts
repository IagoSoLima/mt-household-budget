import { inject, injectable } from 'tsyringe';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
@injectable()
export class ListExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute() {
    const expenses = await this.expenseRepository.getAll();
    return expenses;
  }
}
