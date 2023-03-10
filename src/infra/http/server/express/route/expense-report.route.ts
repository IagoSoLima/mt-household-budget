import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import { ExpenseReportPdfController } from '~/controller/expense-report-pdf.controller';
import { ExpenseReportWorksheetController } from '~/controller/expense-report-worksheet.controller';

const expenseReportRouter = Router();

expenseReportRouter.post(
  '/pdf',
  ExpressAdapter.create(ExpenseReportPdfController.store)
);

expenseReportRouter.post(
  '/worksheet',
  ExpressAdapter.create(ExpenseReportWorksheetController.store)
);

export default expenseReportRouter;
