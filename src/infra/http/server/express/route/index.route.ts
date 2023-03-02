import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import expenseRouter from './expense.route';

const routes = Router();

routes.use(ExpressAdapter.camelizeDataParams());
routes.use('/despesas', expenseRouter);

export default routes;
