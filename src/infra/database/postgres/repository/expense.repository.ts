import Expense from '~/core/entity/expense.entity';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import db from '~/infra/database/postgres/config.postgres';

export default class ExpenseRepository implements IExpenseRepository {
  async create(): Promise<Expense> {
    db.connect(err => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected');
      }
    });

    const a = await db.query('SELECT 1+1');

    console.log(a);

    return new Expense(
      120,
      'gastao',
      new Date(),
      { type: 'Cash' },
      { description: 'fixo', name: 'luz' }
    );
  }

  async getAll(): Promise<Expense[]> {
    return await Promise.resolve([
      new Expense(
        120,
        'gastao',
        new Date(),
        { type: 'Cash' },
        { description: 'fixo', name: 'luz' }
      )
    ]);
  }
}
