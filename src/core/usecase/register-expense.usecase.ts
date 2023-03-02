import { inject, injectable } from 'tsyringe';
import CategoryAdapter from '~/adapter/category.adapter';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
import type Category from '../entity/category.entity';
import { ICategoryRepository as CategoryRepository } from '../repository/category.repository.interface';
import { IPaymentTypeRepository as PaymentTypeRepository } from '../repository/payment-type.repository.interface';
import {
  type ChargePaymentType,
  type RegisterExpenseParam
} from './dto/register-expense-param.dto';

@injectable()
export class RegisterExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,

    @inject('PaymentTypeRepository')
    private readonly paymentTypeRepository: PaymentTypeRepository,

    @inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(params: RegisterExpenseParam) {
    const {
      amount,
      description,
      date,
      paymentType: paymentTypeParam,
      category: categoryParam
    } = params;
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
    const foundCategory = await this.categoryRepository.getByName(
      categoryParam.name
    );

    if (foundCategory !== null) {
      category.id = foundCategory.id;
    } else {
      category = await this.categoryRepository.create({
        name: categoryParam.name,
        description: categoryParam.description
      });
    }

    const expense = await this.expenseRepository.create({
      amount,
      description,
      date,
      category,
      paymentType
    });

    return expense;
  }
}
