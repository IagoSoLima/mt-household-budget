import { randomInt } from 'crypto';
import CategoryAdapter from '~/adapter/category.adapter';
import ExpenseAdapter from '~/adapter/expense.datapert';
import PaymentTypeAdapter from '~/adapter/payment-type.adapter';
import PlaceAdapter from '~/adapter/place.adapter';
import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from '../dto/create-expense.dto';
import { type ListDefaultParam } from '../dto/list-default-param.dto';
import { type ListExpenseParam } from '../dto/list-expense.dto';
import { type ListRangeDateParam } from '../dto/list-range-date-param.dto';
import { type IExpenseRepository } from '../expense.repository.interface';

export default class ExpenseRepositoryFake implements IExpenseRepository {
  private readonly expenses: Expense[] = [];

  async create(params: CreateExpense): Promise<Expense> {
    const {
      amount,
      date,
      description,
      category: categoryParam,
      paymentType: paymentTypeParam,
      place: placeParam
    } = params;

    const category = CategoryAdapter.create(categoryParam);
    category.id = categoryParam.id;

    const paymentType = PaymentTypeAdapter.create(paymentTypeParam);
    paymentType.id = paymentTypeParam.id;

    const place = PlaceAdapter.create(placeParam);
    place.id = placeParam.id;

    const expense = ExpenseAdapter.create({
      amount,
      description,
      date,
      paymentType,
      category
    } as Expense);
    expense.id = randomInt(1000);

    this.expenses.push(expense);

    return await Promise.resolve(expense);
  }

  async getAll(params?: ListDefaultParam): Promise<Expense[]> {
    return await Promise.resolve(this.expenses);
  }

  async getByMonth({ initialDateMonth }: ListExpenseParam): Promise<Expense[]> {
    return await Promise.resolve(
      this.expenses.filter(
        exp =>
          new Date(exp.date).getMonth() ===
          new Date(initialDateMonth).getMonth()
      )
    );
  }

  async getByRangeDate({
    initialDate,
    finishedDate
  }: ListRangeDateParam): Promise<Expense[] | []> {
    return await Promise.resolve(
      this.expenses.filter(
        exp =>
          new Date(exp.date).getTime() >= new Date(initialDate).getTime() &&
          new Date(exp.date).getTime() <= new Date(finishedDate).getTime()
      )
    );
  }

  async getById(id: number): Promise<Expense | null> {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      return null;
    }
    return await Promise.resolve(this.expenses[index]);
  }

  async update(id: number, params: CreateExpense): Promise<Expense> {
    const {
      amount,
      date,
      description,
      category: categoryParam,
      paymentType: paymentTypeParam,
      place: placeParam
    } = params;
    const index = this.expenses.findIndex(exp => exp.id === id);

    const expense = this.expenses[index];

    expense.amount = amount;
    expense.description = description;
    expense.date = date;
    expense.category = CategoryAdapter.create(categoryParam);
    expense.paymentType = PaymentTypeAdapter.create(paymentTypeParam);
    expense.place = PlaceAdapter.create(placeParam);
    expense.category.id = categoryParam.id;
    expense.paymentType.id = paymentTypeParam.id;
    expense.place.id = placeParam.id;
    return await Promise.resolve(expense);
  }

  async delete(id: number): Promise<void> {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      return;
    }
    this.expenses.splice(index, 1);

    await Promise.resolve();
  }
}
