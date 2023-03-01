import { Router } from 'express';
import expenseRouter from './expense.route';

const routes = Router();

routes.use('/despesas', expenseRouter);

export default routes;
