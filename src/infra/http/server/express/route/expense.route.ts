import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import ExpenseController from '~/controller/expense.controller';
import type Expense from '~/core/entity/expense.entity';
import { type ResponseDTO } from '../../../../../common/dto/response.dto';

const expenseRouter = Router();

expenseRouter.get(
  '/',
  ExpressAdapter.create<ResponseDTO<Expense[]>>(ExpenseController.list)
);
expenseRouter.post(
  '/',
  ExpressAdapter.create<ResponseDTO<Expense>>(ExpenseController.store)
);
expenseRouter.patch(
  '/valor',
  ExpressAdapter.create<ResponseDTO<Expense>>(ExpenseController.patch)
);

expenseRouter.delete(
  '/:id',
  ExpressAdapter.create<ResponseDTO>(ExpenseController.delete)
);

expenseRouter.put(
  '/',
  ExpressAdapter.create<ResponseDTO<Expense>>(ExpenseController.update)
);

export default expenseRouter;
