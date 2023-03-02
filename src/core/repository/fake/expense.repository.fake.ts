import { randomInt } from 'crypto';
import Category from '~/core/entity/category.entity';
import Expense from '~/core/entity/expense.entity';
import PaymentType from '~/core/entity/payment-type.entity';
import { type CreateExpense } from '../dto/create-expense.dto';
import { type IExpenseRepository } from '../expense.repository.interface';

export default class ExpenseRepositoryFake implements IExpenseRepository {
  private readonly expenses: Expense[] = [];

  async create(params: CreateExpense): Promise<Expense> {
    const {
      amount,
      date,
      description,
      category: categoryParam,
      paymentType: paymentTypeParam
    } = params;

    const category = new Category(
      categoryParam.name,
      categoryParam.description
    );
    category.setId(categoryParam.getId());

    const paymentType = new PaymentType(paymentTypeParam.type);
    paymentType.setId(1);

    const expense = new Expense(
      amount,
      description,
      date,
      paymentType,
      category
    );
    expense.setId(randomInt(1000));

    this.expenses.push(expense);

    return await Promise.resolve(expense);
  }

  async getAll(): Promise<Expense[]> {
    return await Promise.resolve(this.expenses);
  }
}
