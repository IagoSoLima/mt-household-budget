import { container } from 'tsyringe';
import type AbstractController from '~/common/controller/abstract-controller.interface';
import GeneratePdfExpenseUseCase from '~/core/usecase/generate-pdf-expense.usecase';

export const ExpensePdfController: AbstractController = {
  async store(params): Promise<string> {
    const generatePdf = container.resolve(GeneratePdfExpenseUseCase);
    const fileName = await generatePdf.execute();
    return fileName;
  }
};
