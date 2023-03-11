import { inject, injectable } from 'tsyringe';
import AppLoggerAdapter from '~/adapter/app-logger.adapter';
import CategoryAdapter from '~/adapter/category.adapter';
import { removeMask } from '~/common/util';
import type Category from '~/core/entity/category.entity';
import type Place from '~/core/entity/place.entity';
import { ICepProvider as CepProvider } from '~/core/providers/cep.provider.interface';
import { ICategoryRepository as CategoryRepository } from '~/core/repository/category.repository.interface';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
import { IPaymentTypeRepository as PaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import { IPlaceRepository as PlaceRepository } from '~/core/repository/place.repository.interface';
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
    private readonly categoryRepository: CategoryRepository,

    @inject('CepProvider')
    private readonly cepProvider: CepProvider,

    @inject('PlaceRepository')
    private readonly placeRepository: PlaceRepository,

    private readonly logger = AppLoggerAdapter.create()
  ) {}

  async execute(params: UpdateExpenseParam) {
    const {
      id,
      amount,
      description,
      date,
      paymentType: paymentTypeParam,
      category: categoryParam,
      place: placeParam
    } = params;
    const expense = await this.expenseRepository.getById(id);
    const foundExpense = expense !== null;

    if (!foundExpense) {
      this.logger.fail({
        category: 'UPDATE_EXPENSE_USECASE_ERROR',
        error: 'Expense not found'
      });
      throw new Error('EXPENSE_NOT_FOUND');
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
      this.logger.fail({
        category: 'UPDATE_EXPENSE_USECASE_ERROR',
        error: 'Payment type not found'
      });
      throw new Error('PAYMENT_TYPE_NOT_FOUND');
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

    const zipCodeRemovedMask = removeMask({ value: placeParam.cep });
    let place: Place;
    const foundPlace = await this.placeRepository.getByZipCodeAndNumber(
      zipCodeRemovedMask,
      placeParam.number
    );

    if (foundPlace !== null) {
      place = foundPlace;
    } else {
      const resultCepProvider = await this.cepProvider.get(zipCodeRemovedMask);
      place = await this.placeRepository.create({
        number: placeParam.number,
        zipCode: zipCodeRemovedMask,
        city: resultCepProvider.city,
        neighborhood: resultCepProvider.neighborhood,
        publicPlace: resultCepProvider.publicPlace,
        uf: resultCepProvider.uf
      });
    }

    expense.amount = amount;
    expense.description = description;
    expense.date = date;
    expense.paymentType = paymentType;
    expense.category = category;
    expense.place = place;

    const expenseUpdated = await this.expenseRepository.update(id, expense);

    return expenseUpdated;
  }
}
