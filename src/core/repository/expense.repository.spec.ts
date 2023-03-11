import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from '~/core/repository/dto/create-expense.dto';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import ExpenseRepositoryFake from '~/core/repository/fake/expense.repository.fake';

describe('ExpenseRepository', () => {
  let expenseRepository: IExpenseRepository;
  let paramsCreate: CreateExpense;
  beforeEach(() => {
    expenseRepository = new ExpenseRepositoryFake();

    const stateFake = faker.address.countryCode('alpha-2');

    paramsCreate = {
      amount: Number(faker.finance.amount(50, 100, 2)),
      category: {
        id: 1,
        description: 'Gastos Fixos',
        name: 'Fixos'
      },
      date: faker.date.recent(),
      description: 'Conta de Luz',
      paymentType: {
        id: 1,
        type: 'Dinheiro'
      },
      place: {
        id: 1,
        city: faker.address.cityName(),
        uf: stateFake,
        number: Number(faker.address.buildingNumber()),
        zipCode: faker.address.zipCodeByState(stateFake),
        neighborhood: faker.address.streetAddress(),
        publicPlace: faker.address.streetAddress()
      }
    };
  });

  it('should be defined', () => {
    expect(expenseRepository).toBeDefined();
  });

  it('should be create expense', async () => {
    const expense = await expenseRepository.create(paramsCreate);
    expect(expense).toBeInstanceOf(Expense);
  });

  it('should be get all expenses', async () => {
    const expense = await expenseRepository.create(paramsCreate);
    const expenses = await expenseRepository.getAll();
    expect(expenses.length).toBeGreaterThanOrEqual(1);
    expect(expenses[0].id).toBe(expense.id);
  });

  it('should be return expense by Month', async () => {
    const now = new Date();
    const actualInitCurrentDateMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    paramsCreate.date = actualInitCurrentDateMonth;
    const expense = await expenseRepository.create(paramsCreate);
    const expenses = await expenseRepository.getByMonth({
      initialDateMonth: actualInitCurrentDateMonth
    });
    expect(expenses.length).toBeGreaterThanOrEqual(1);
    expect(expenses[0].id).toBe(expense.id);
  });

  it('should be get expense by range date', async () => {
    paramsCreate.date = new Date(2023, 3, 10);

    await expenseRepository.create(paramsCreate);
    paramsCreate.date = new Date(2022, 3, 10);
    await expenseRepository.create(paramsCreate);

    const expenses = await expenseRepository.getByRangeDate({
      initialDate: new Date(2022, 3, 10),
      finishedDate: new Date(2023, 3, 10)
    });

    expect(expenses.length).toBeGreaterThanOrEqual(2);
  });

  it('should be get expense by id', async () => {
    const createdExpense = await expenseRepository.create(paramsCreate);
    const expense = await expenseRepository.getById(createdExpense.id);

    expect(expense).toBeInstanceOf(Expense);
    expect(expense?.id).toEqual(createdExpense.id);
  });

  it('should not be get expense by id', async () => {
    const expense = await expenseRepository.getById(13);

    expect(expense).toBeNull();
  });

  it('should be update expense', async () => {
    const createdExpense = await expenseRepository.create(paramsCreate);
    paramsCreate.amount = Number(faker.finance.amount(101, 200, 2));
    const expense = await expenseRepository.update(
      createdExpense.id,
      paramsCreate
    );
    expect(expense).toBeInstanceOf(Expense);
    expect(expense.amount).toBeGreaterThanOrEqual(createdExpense.amount);
  });

  it('should be delete expense by id', async () => {
    const createdExpense = await expenseRepository.create(paramsCreate);
    await expenseRepository.delete(createdExpense.id);
    const expense = await expenseRepository.getById(createdExpense.id);
    expect(expense).toBeNull();
  });

  it('should not be delete expense by id', async () => {
    await expenseRepository.delete(12);
    const expense = await expenseRepository.getById(12);
    expect(expense).toBeNull();
  });
});
