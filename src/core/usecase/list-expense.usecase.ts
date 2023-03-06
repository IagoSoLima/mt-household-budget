import { inject, injectable } from 'tsyringe';
import { isNumber } from '~/common/util/is-number.util';
import { type ListExpenseParam as ListExpenseRepositoryParam } from '~/core/repository/dto/list-expense.dto';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';
import { DEFAULT_PER_PAGE } from '~/infra/vars/app.vars';
import { type ListExpenseParam } from './dto/list-expense-param.dto';
@injectable()
export class ListExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(params: ListExpenseParam) {
    const now = new Date();
    const actualInitCurrentDateMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const limit = params.perPage ?? DEFAULT_PER_PAGE;
    let page = params.page ?? 1;
    page = page - 1;

    const offset = page && limit ? page * limit : null;

    const paramsRepository: ListExpenseRepositoryParam = {
      initialDateMonth: actualInitCurrentDateMonth,
      limit,
      offset
    };
    const expenses = await this.expenseRepository.getByMonth(paramsRepository);
    return expenses;
  }
}
