import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import expenseReportRouter from './expense-report.route';
import expenseRouter from './expense.route';

const routes = Router();

routes.use(ExpressAdapter.camelizeDataParams());
routes.use('/despesas', expenseRouter);
routes.use('/despesas/relatorio', expenseReportRouter);

export default routes;
