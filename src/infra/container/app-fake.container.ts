import { container } from 'tsyringe';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import CategoryRepositoryFake from '~/core/repository/fake/category.repository.fake';
import ExpenseRepositoryFake from '~/core/repository/fake/expense.repository.fake';
import PaymentTypeRepositoryFake from '~/core/repository/fake/payment-type.repository.fake';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';

const Container = {
  make() {
    container.registerSingleton<IExpenseRepository>(
      'ExpenseRepository',
      ExpenseRepositoryFake
    );

    container.registerSingleton<ICategoryRepository>(
      'CategoryRepository',
      CategoryRepositoryFake
    );

    container.registerSingleton<IPaymentTypeRepository>(
      'PaymentTypeRepository',
      PaymentTypeRepositoryFake
    );
  }
};
export default Container;
