import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import { ExpensePdfController } from '~/controller/expense-pdf.controller';

const expensePdfRouter = Router();

expensePdfRouter.post('/', ExpressAdapter.create(ExpensePdfController.store));

export default expensePdfRouter;
