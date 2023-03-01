import Expense from '~/core/entity/expense.entity';
import { type createExpenseDTO } from '../dto/create-expense.dto';
import { type IExpenseRepository } from '../expense.repository.interface';

export default class ExpenseRepositoryFake implements IExpenseRepository {
  private readonly expenses: Expense[] = [];

  async create(params: createExpenseDTO): Promise<Expense> {
    const { amount, category, date, description, paymentType } = params;
    const expense = new Expense(
      amount,
      description,
      date,
      { type: paymentType },
      category
    );

    this.expenses.push(expense);

    return await Promise.resolve(expense);
  }

  async getAll(): Promise<Expense[]> {
    return await Promise.resolve(this.expenses);
  }
}
