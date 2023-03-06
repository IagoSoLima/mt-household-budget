import { container } from 'tsyringe';
import type AbstractController from '~/common/controller/abstract-controller.interface';
import GeneratePdfExpenseUseCase from '~/core/usecase/generate-expense-pdf.usecase';
import { type ReportStorePdf } from './dto/report-store-pdf.dto';

export const ExpenseReportPdfController: AbstractController = {
  async store(params: ReportStorePdf): Promise<string> {
    const generatePdf = container.resolve(GeneratePdfExpenseUseCase);
    const fileName = await generatePdf.execute(params);
    return fileName;
  }
};
