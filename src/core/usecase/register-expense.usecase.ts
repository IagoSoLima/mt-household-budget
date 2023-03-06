import { inject, injectable } from 'tsyringe';
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
    private readonly categoryRepository: CategoryRepository,

    @inject('CepProvider')
    private readonly cepProvider: CepProvider,

    @inject('PlaceRepository')
    private readonly placeRepository: PlaceRepository
  ) {}

  async execute(params: RegisterExpenseParam) {
    const {
      amount,
      description,
      date,
      paymentType: paymentTypeParam,
      category: categoryParam,
      place: placeParam
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

    const expense = await this.expenseRepository.create({
      amount,
      description,
      date,
      category,
      paymentType,
      place
    });

    return expense;
  }
}
