import { inject, injectable } from 'tsyringe';
import type Expense from '../entity/expense.entity';
import { type IExpenseRepository as ExpenseRepository } from '../repository/expense.repository.interface';
import { type UpdateAmountExpenseParam } from './dto/update-amount-expense-param.dto';

@injectable()
export class UpdateAmountExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(params: UpdateAmountExpenseParam) {
    const { id, amount } = params;
    const expense = await this.expenseRepository.getById(id);

    console.log('update usecase', expense);

    if (!expense) {
      throw new Error('Expense not found');
    }

    expense.amount = amount;

    const expenseUpdated = await this.expenseRepository.update(id, expense);

    return expenseUpdated;
  }
}
