import { container } from 'tsyringe';
import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import { type IPdfProvider } from '~/core/providers/pdf.provider.interface';
import { type IStorageProvider } from '~/core/providers/storage.provider.interface';
import { type ITemplateProvider } from '~/core/providers/template.provider.interface';
import { type ICategoryRepository } from '~/core/repository/category.repository.interface';
import { type IExpenseRepository } from '~/core/repository/expense.repository.interface';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import { type IPlaceRepository } from '~/core/repository/place.repository.interface';
import CategoryRepository from '~/infra/database/postgres/repository/category.respository';
import ExpenseRepository from '~/infra/database/postgres/repository/expense.repository';
import PaymentTypeRepository from '~/infra/database/postgres/repository/payment-type.repository';
import PlaceRepository from '~/infra/database/postgres/repository/place.repository';
import ViaCepProvider from '~/infra/providers/cep/viacep-provider.cep';
import PuppeteerProviderPdf from '~/infra/providers/pdf/puppeteer.provider.pdf';
import DiskStorageProvider from '~/infra/providers/storage/disk.storage.provider';
import HandlebarsTemplateProvider from '~/infra/providers/template/handlebars.template.provider';

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

    container.registerSingleton<IPlaceRepository>(
      'PlaceRepository',
      PlaceRepository
    );

    container.registerSingleton<IPdfProvider>(
      'PdfProvider',
      PuppeteerProviderPdf
    );
    container.registerSingleton<IStorageProvider>(
      'StorageProvider',
      DiskStorageProvider
    );
    container.registerSingleton<ITemplateProvider>(
      'TemplateProvider',
      HandlebarsTemplateProvider
    );
    container.registerSingleton<ICepProvider>('CepProvider', ViaCepProvider);
  }
};

export default ContainerFake;
