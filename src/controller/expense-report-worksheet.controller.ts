import { container } from 'tsyringe';
import type AbstractController from '~/common/controller/abstract-controller.interface';
import GenerateExpenseWorksheetUseCase from '~/core/usecase/generate-expense-worksheet.usecase';

export const ExpenseReportWorksheetController: AbstractController = {
  async store() {
    const generateWorksheet = container.resolve(
      GenerateExpenseWorksheetUseCase
    );
    const fileName = await generateWorksheet.execute();
    return fileName;
  }
};
