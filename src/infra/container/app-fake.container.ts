import { container } from 'tsyringe';
import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import CepProviderFake from '~/core/providers/fake/cep.provider.fake';
import PdfProviderFake from '~/core/providers/fake/pdf.provider.fake';
import StorageProviderFake from '~/core/providers/fake/storage.provider.fake';
import TemplateProviderFake from '~/core/providers/fake/template.provider.fake';
import WorksheetProviderFake from '~/core/providers/fake/worksheet.provider.fake';
import { type IPdfProvider } from '~/core/providers/pdf.provider.interface';
import { type IStorageProvider } from '~/core/providers/storage.provider.interface';
import { type ITemplateProvider } from '~/core/providers/template.provider.interface';
import { type IWorksheetProvider } from '~/core/providers/worksheet.provider.interface';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import CategoryRepositoryFake from '~/core/repository/fake/category.repository.fake';
import ExpenseRepositoryFake from '~/core/repository/fake/expense.repository.fake';
import PaymentTypeRepositoryFake from '~/core/repository/fake/payment-type.repository.fake';
import PlaceRepositoryFake from '~/core/repository/fake/place.repository.fake';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import { type IPlaceRepository } from '~/core/repository/place.repository.interface';

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
    container.registerSingleton<IPlaceRepository>(
      'PlaceRepository',
      PlaceRepositoryFake
    );

    container.registerSingleton<IPdfProvider>('PdfProvider', PdfProviderFake);
    container.registerSingleton<IStorageProvider>(
      'StorageProvider',
      StorageProviderFake
    );
    container.registerSingleton<ITemplateProvider>(
      'TemplateProvider',
      TemplateProviderFake
    );
    container.registerSingleton<ICepProvider>('CepProvider', CepProviderFake);
    container.registerSingleton<IWorksheetProvider>(
      'WorksheetProvider',
      WorksheetProviderFake
    );
  }
};
export default Container;
