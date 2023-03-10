import { randomUUID } from 'crypto';
import { inject, injectable } from 'tsyringe';
import { DateUtil, transformToMoney } from '~/common/util';
import { IWorksheetProvider as WorksheetProvider } from '~/core/providers/worksheet.provider.interface';
import { IExpenseRepository as ExpenseRepository } from '~/core/repository/expense.repository.interface';

@injectable()
export default class GenerateExpenseWorksheetUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,

    @inject('WorksheetProvider')
    private readonly worksheetProvider: WorksheetProvider
  ) {}

  async execute(): Promise<string> {
    const now = new Date();
    const actualInitCurrentDateMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const limit = null;
    const offset = 0;

    const expenses = await this.expenseRepository.getByMonth({
      initialDateMonth: actualInitCurrentDateMonth,
      offset,
      limit
    });

    const dataWorksheet = expenses.map(expense => ({
      'column-1': DateUtil.format(expense.date, 'dd/MM/yyyy'),
      'column-2': DateUtil.format(expense.date, 'HH:mm:ss'),
      'column-3': expense.description,
      'column-4': expense.paymentType.type,
      'column-5': transformToMoney(expense.amount)
    }));

    const a = await this.worksheetProvider.generate({
      path: '/template-extract-household-budget.xlsx',
      data: dataWorksheet,
      fileName: `${randomUUID()}.xlsx`
    });

    return a.toString();
  }
}
