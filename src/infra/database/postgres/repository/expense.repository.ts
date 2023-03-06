import CategoryAdapter from '~/adapter/category.adapter';
import ExpenseAdapter from '~/adapter/expense.datapert';
import PaymentTypeAdapter from '~/adapter/payment-type.adapter';
import PlaceAdapter from '~/adapter/place.adapter';
import type Expense from '~/core/entity/expense.entity';
import { type CreateExpense } from '~/core/repository/dto/create-expense.dto';
import { type ListDefaultParam } from '~/core/repository/dto/list-default-param.dto';
import { type ListExpenseParam } from '~/core/repository/dto/list-expense.dto';
import { type ListRangeDateParam } from '~/core/repository/dto/list-range-date-param.dto';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import db from '~/infra/database/postgres/config.postgres';

export default class ExpenseRepository implements IExpenseRepository {
  async create(params: CreateExpense): Promise<Expense> {
    await db.connect();

    const { amount, category, date, description, paymentType, place } = params;
    const result = await db
      .query<Expense>(
        'INSERT INTO despesas(valor,descricao,data_compra,categoria_id,tipo_pagamento_id,estabelecimento_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [amount, description, date, category.id, paymentType.id, place.id]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to register expense: ${err.message || err}`
        );
      });

    const expense = ExpenseAdapter.create(params as Expense);
    expense.id = result[0].id;
    return expense;
  }

  async getAll(params?: ListDefaultParam): Promise<Expense[]> {
    await db.connect();
    const result = await db
      .manyOrNone(
        `
        SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento
        FROM despesas AS d
        LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
        LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id=tp.id)
        LEFT JOIN estabelecimentos AS e ON (d.estabelecimento_id = e.id)
        ORDER BY data_compra DESC

        `
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to register expense: ${err.message || err}`
        );
      });

    const expenses = result.map(res => {
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
      } as Expense);
      expense.id = res.id;

      return expense;
    });
    return expenses;
  }

  async getByMonth({
    initialDateMonth,
    limit,
    offset
  }: ListExpenseParam): Promise<Expense[]> {
    await db.connect();

    const result = await db
      .manyOrNone(
        `
        SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento,
        e.cep AS estabelecimento_cep, e.cidade AS estabelecimento_cidade, e.uf AS estabelecimento_uf, e.bairro AS estabelecimento_bairro, e.numero AS estabelecimento_numero, e.lougradouro AS estabelecimento_lougradouro
        FROM despesas AS d
        LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
        LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id=tp.id)
        LEFT JOIN estabelecimento AS e ON (d.estabelecimento_id = e.id)
        WHERE  date_trunc('month',d.data_compra) = date_trunc('month', $1::date)
        ORDER BY data_compra DESC
        LIMIT $2
        OFFSET $3
        `,
        [initialDateMonth, limit, offset]
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
      const place = PlaceAdapter.create({
        city: res.estabelecimento_cidade,
        neighborhood: res.estabelecimento_bairro,
        number: res.estabelecimento_numero,
        publicPlace: res.estabelecimento_lougradouro,
        uf: res.estabelecimento_uf,
        zipCode: res.estabelecimento_cep
      });

      category.id = res.categoria_id;
      paymentType.id = res.tipo_pagamento_id;
      place.id = res.estabelecimento_id;

      const expense = ExpenseAdapter.create({
        amount: res.valor,
        description: res.descricao,
        date: new Date(res.data_compra),
        category,
        paymentType,
        place
      } as Expense);
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
        SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento,
        e.cep AS estabelecimento_cep, e.cidade AS estabelecimento_cidade, e.uf AS estabelecimento_uf, e.bairro AS estabelecimento_bairro, e.numero AS estabelecimento_numero, e.lougradouro AS estabelecimento_lougradouro
        FROM despesas AS d
        LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
        LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id = tp.id)
        LEFT JOIN estabelecimento AS e ON (d.estabelecimento_id = e.id)
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
    const place = PlaceAdapter.create({
      city: result.estabelecimento_cidade,
      neighborhood: result.estabelecimento_bairro,
      number: result.estabelecimento_numero,
      publicPlace: result.estabelecimento_lougradouro,
      uf: result.estabelecimento_uf,
      zipCode: result.estabelecimento_cep
    });

    category.id = result.categoria_id;
    paymentType.id = result.tipo_pagamento_id;
    place.id = result.estabelecimento_id;

    const expense = ExpenseAdapter.create({
      amount: result.valor,
      description: result.descricao,
      date: new Date(result.data_compra),
      category,
      paymentType,
      place
    } as Expense);
    expense.id = id;

    return expense;
  }

  async update(id: number, params: CreateExpense): Promise<Expense> {
    await db.connect();
    const { amount, category, date, description, paymentType, place } = params;

    await db
      .query(
        'UPDATE despesas SET valor = $1,descricao = $2,data_compra = $3,categoria_id = $4,tipo_pagamento_id = $5, estabelecimento_id = $6 WHERE id = $7 RETURNING *',
        [amount, description, date, category.id, paymentType.id, place.id, id]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible to update amount expense: ${
            err.message || err
          }`
        );
      });

    const expense = ExpenseAdapter.create(params as Expense);

    expense.id = id;

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

  async getByRangeDate({
    finishedDate,
    initialDate
  }: ListRangeDateParam): Promise<Expense[] | []> {
    await db.connect();
    const result = await db
      .manyOrNone(
        `
      SELECT d.*,c.nome AS categoria_nome, c.descricao AS categoria_descricao, tp.tipo AS tipo_pagamento
      FROM despesas AS d
      LEFT JOIN categorias AS c ON (d.categoria_id = c.id)
      LEFT JOIN tipos_pagamento AS tp ON (d.tipo_pagamento_id=tp.id)
      WHERE d.data_compra between $1::date and $2::date
      ORDER BY data_compra DESC
      `,
        [initialDate, finishedDate]
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
      } as Expense);
      expense.id = res.id;

      return expense;
    });

    return expense;
  }
}
