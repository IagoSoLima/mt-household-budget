import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from '~/core/repository/dto/create-expense.dto';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import db from '~/infra/database/postgres/config.postgres';

export default class ExpenseRepository implements IExpenseRepository {
  async create(params: CreateExpense): Promise<Expense> {
    await db.connect();

    const { amount, category, date, description, paymentType } = params;
    const result = await db.query<Expense>(
      'INSERT INTO despesas(valor,descricao,data_compra,categoria_id,tipo_pagamento_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [amount, description, date, category.id, paymentType.id]
    );
    const expense = result;

    console.log('insert', result);
    return expense;
  }

  async getAll(): Promise<Expense[]> {
    await db.connect();

    const result = await db.query<Expense[]>(`SELECT * FROM despesas`);

    return result;
  }
}
