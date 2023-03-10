import { randomUUID } from 'crypto';
import { inject, injectable } from 'tsyringe';
import { transformToMoney, DateUtil } from '~/common/util';
import {
  type DataExpenseDataTemplate,
  type IExpenseDataTemplate
} from '~/infra/providers/template/view/expense-data.template.interface';
import { TEMPLATE_FOLDER } from '~/infra/vars/app.vars';
import { IPdfProvider as PdfProvider } from '../providers/pdf.provider.interface';
import { IStorageProvider as StorageProvider } from '../providers/storage.provider.interface';
import { ITemplateProvider as TemplateProvider } from '../providers/template.provider.interface';
import { IExpenseRepository as ExpenseRepository } from '../repository/expense.repository.interface';
import { type GenerateExpensePdf } from './dto/generate-expense-pdf.dto';

@injectable()
export default class GeneratePdfExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('TemplateProvider')
    private readonly templateProvider: TemplateProvider,
    @inject('PdfProvider')
    private readonly pdfProvider: PdfProvider,
    @inject('StorageProvider')
    private readonly storageProvider: StorageProvider
  ) {}

  async execute({
    initialDate,
    finishedDate
  }: GenerateExpensePdf): Promise<string> {
    const expenses = await this.expenseRepository.getByRangeDate({
      initialDate: new Date(initialDate),
      finishedDate: new Date(finishedDate)
    });
    const dataTemplate: IExpenseDataTemplate = {
      initialDate: DateUtil.format(new Date(initialDate), 'dd/MM/yyyy'),
      finishedDate: DateUtil.format(new Date(finishedDate), 'dd/MM/yyyy'),
      info: []
    } as IExpenseDataTemplate;

    for (const expense of expenses) {
      const date = DateUtil.format(expense.date, 'yyyy-MM-dd');
      const year = new Date(expense.date).getFullYear().toString();
      const month = DateUtil.formatToBRLocale(DateUtil.parseISO(date), 'MMMM');

      const data: DataExpenseDataTemplate = {
        amount: transformToMoney(expense.amount),
        date: DateUtil.format(expense.date, 'dd/MM/yyyy'),
        description: expense.description
      };

      const index = dataTemplate.info.findIndex(
        data => data.month === month && data.year === year
      );

      if (index !== -1) {
        dataTemplate.info[index].data.push(data);
        continue;
      }

      dataTemplate.info.push({
        month,
        year,
        data: [data]
      });
    }

    const templateFile = TEMPLATE_FOLDER + '/expense.template.hbs';
    const template = await this.templateProvider.parse({
      file: templateFile,
      variables: dataTemplate
    });
    const pdf = await this.pdfProvider.generate(template);
    const file = await this.storageProvider.saveFile(
      pdf,
      `${randomUUID()}.pdf`
    );

    return file;
  }
}
