import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import expensePdfRouter from './expense-pdf.route';
import expenseRouter from './expense.route';

const routes = Router();

routes.use(ExpressAdapter.camelizeDataParams());
routes.use('/despesas', expenseRouter);
routes.use('/despesas/pdf', expensePdfRouter);

export default routes;
