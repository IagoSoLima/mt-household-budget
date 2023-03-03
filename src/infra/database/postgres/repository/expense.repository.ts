import CategoryAdapter from '~/adapter/category.adapter';
import ExpenseAdapter from '~/adapter/expense.datapert';
import PaymentTypeAdapter from '~/adapter/payment-type.adapter';
import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from '~/core/repository/dto/create-expense.dto';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import db from '~/infra/database/postgres/config.postgres';

export default class ExpenseRepository implements IExpenseRepository {
  async create(params: CreateExpense): Promise<Expense> {
    await db.connect();

    const { amount, category, date, description, paymentType } = params;
    const result = await db
      .query<Expense>(
        'INSERT INTO despesas(valor,descricao,data_compra,categoria_id,tipo_pagamento_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [amount, description, date, category.id, paymentType.id]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to register expense: ${err.message || err}`
        );
      })
      .catch(err => {
        throw new Error(
          `Could not be possible getting expenses: ${err.message || err}`
        );
      });
    const expense = result;

    return expense;
  }

  async getAll(initialDateMounth: Date): Promise<Expense[]> {
    await db.connect();

    const result = await db
      .manyOrNone(
        `
        SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento
        FROM despesas AS d
        LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
        LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id=tp.id)
        WHERE  date_trunc('month',d.data_compra) = date_trunc('month', $1::date);
        `,
        [initialDateMounth]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to register expense: ${err.message || err}`
        );
      });

    const expense = result.map(res => {
      const category = CategoryAdapter.create({
        name: res.categoria_nome,
        description: res.categoria_descricao
      });
      const paymentType = PaymentTypeAdapter.create({
        type: res.tipo_pagamento
      });
      category.id = res.categoria_id;
      paymentType.id = res.tipo_pagamento_id;

      const expense = ExpenseAdapter.create({
        amount: res.valor,
        description: res.descricao,
        date: new Date(res.data_compra),
        category,
        paymentType
      });
      expense.id = res.id;

      return expense;
    });

    return expense;
  }

  async getById(id: number): Promise<Expense | null> {
    await db.connect();

    const result = await db
      .oneOrNone(
        `
        SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento
        FROM despesas AS d
        LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
        LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id = tp.id)
        WHERE d.id = $1;
      `,
        [id]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible getting expense: ${err.message || err}`
        );
      });
    const category = CategoryAdapter.create({
      name: result.categoria_nome,
      description: result.categoria_descricao
    });
    const paymentType = PaymentTypeAdapter.create({
      type: result.tipo_pagamento
    });
    category.id = result.categoria_id;
    paymentType.id = result.tipo_pagamento_id;

    const expense = ExpenseAdapter.create({
      amount: result.valor,
      description: result.descricao,
      date: new Date(result.data_compra),
      category,
      paymentType
    });
    expense.id = id;

    return expense;
  }

  async update(id: number, params: CreateExpense): Promise<Expense> {
    await db.connect();
    const { amount, category, date, description, paymentType } = params;

    await db
      .query(
        'UPDATE despesas SET valor = $1,descricao = $2,data_compra = $3,categoria_id = $4,tipo_pagamento_id = $5 WHERE id = $6 RETURNING *',
        [amount, description, date, category.id, paymentType.id, id]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to update amount expense: ${
            err.message || err
          }`
        );
      });

    const expense = ExpenseAdapter.create(params);
    return expense;
  }

  async delete(id: number): Promise<void> {
    await db.connect();
    await db.query('DELETE FROM despesas WHERE id = $1', [id]).catch(err => {
      throw new Error(
        `Could not be possible remove expense: ${err.message || err}`
      );
    });
  }
}
