import { inject, injectable } from 'tsyringe';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';

@injectable()
export class RegisterExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute() {
    const expense = await this.expenseRepository.create({
      amount: 1000,
      description: 'test',
      date: new Date(),
      category: {
        description: 'test',
        name: 'Conta Luz'
      },
      paymentType: 'Cash'
    });
    return expense;
  }
}
