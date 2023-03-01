import { Router } from 'express';
import ExpressAdapter from '~/adapter/express.adapter';
import ExpenseController from '~/controller/expense.controller';
import type Expense from '~/core/entity/expense.entity';
import { type ResponseDTO } from '../../../../../common/dto/response.dto';

const expenseRouter = Router();

expenseRouter.get(
  '/',
  ExpressAdapter.create<ResponseDTO<{ expense: Expense }>>(
    ExpenseController.create
  )
);
expenseRouter.post(
  '/',
  ExpressAdapter.create<ResponseDTO<{ expense: Expense }>>(
    ExpenseController.create
  )
);

export default expenseRouter;
