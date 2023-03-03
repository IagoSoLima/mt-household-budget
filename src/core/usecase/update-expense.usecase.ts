import { waitForDebugger } from 'inspector';
import { inject, injectable } from 'tsyringe';
import CategoryAdapter from '~/adapter/category.adapter';
import { ICategoryRepository as CategoryRepository } from '~/core/repository/category.repository.interface';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
import { IPaymentTypeRepository as PaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import type Category from '../entity/category.entity';
import {
  type ChargePaymentType,
  type UpdateExpenseParam
} from './dto/update-expense-param.dto';

@injectable()
export class UpdateExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,

    @inject('PaymentTypeRepository')
    private readonly paymentTypeRepository: PaymentTypeRepository,

    @inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(params: UpdateExpenseParam) {
    const {
      id,
      amount,
      description,
      date,
      paymentType: paymentTypeParam,
      category: categoryParam
    } = params;
    const expense = await this.expenseRepository.getById(id);
    const foundExpense = expense !== null;

    if (!foundExpense) {
      throw new Error('Expense not found');
    }

    const chargePaymentType: ChargePaymentType = {
      Cash: 'Dinheiro',
      Credit: 'Credito',
      Debit: 'Debito',
      PIX: 'PIX'
    };
    const paymentType = await this.paymentTypeRepository.getByType(
      chargePaymentType[paymentTypeParam]
    );
    const foundPaymentType = paymentType !== null;

    if (!foundPaymentType) {
      throw new Error('Payment type not found');
    }

    let category: Category = CategoryAdapter.create(categoryParam as Category);

    const foundCategory = await this.categoryRepository.getByNameAndDescription(
      categoryParam.name,
      categoryParam.description
    );

    if (foundCategory !== null) {
      category.id = foundCategory.id;
    } else {
      category = await this.categoryRepository.create({
        name: categoryParam.name,
        description: categoryParam.description
      });
    }

    expense.amount = amount;
    expense.description = description;
    expense.date = date;
    expense.paymentType = paymentType;
    expense.category = category;

    const expenseUpdated = await this.expenseRepository.update(id, expense);

    return expenseUpdated;
  }
}
