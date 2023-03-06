import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import { ExpenseReportPdfController } from '~/controller/expense-report-pdf.controller';

const expenseReportRouter = Router();

expenseReportRouter.post(
  '/pdf',
  ExpressAdapter.create(ExpenseReportPdfController.store)
);

export default expenseReportRouter;
