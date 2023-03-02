import { container } from 'tsyringe';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import CategoryRepository from '~/infra/database/postgres/repository/category.respository';
import ExpenseRepository from '~/infra/database/postgres/repository/expense.repository';
import PaymentTypeRepository from '../database/postgres/repository/payment-type.repository';

const ContainerFake = {
  make() {
    container.registerSingleton<IExpenseRepository>(
      'ExpenseRepository',
      ExpenseRepository
    );

    container.registerSingleton<ICategoryRepository>(
      'CategoryRepository',
      CategoryRepository
    );

    container.registerSingleton<IPaymentTypeRepository>(
      'PaymentTypeRepository',
      PaymentTypeRepository
    );
  }
};

export default ContainerFake;
