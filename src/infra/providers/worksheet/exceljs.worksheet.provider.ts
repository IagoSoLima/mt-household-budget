import { Workbook } from 'exceljs';
import path from 'path';
import { type GenerateWorksheet } from '~/core/providers/dto/generate-worksheet.dto';
import { type IWorksheetProvider } from '~/core/providers/worksheet.provider.interface';
import {
  APP_HOST_URL,
  APP_PORT,
  MODEL_WORKSHEET_FOLDER,
  UPLOADS_FOLDER
} from '~/infra/vars/app.vars';

export default class ExceljsWorksheetProvider implements IWorksheetProvider {
  private readonly workbook: Workbook;
  private readonly basePathModel = path.resolve(
    __dirname,
    MODEL_WORKSHEET_FOLDER
  );

  constructor() {
    this.workbook = new Workbook();
  }

  async generate({
    path: pathFile,
    data,
    fileName
  }: GenerateWorksheet): Promise<string | Uint8Array | Buffer> {
    const workbook = new Workbook();
    const modelWorkbook = await workbook.xlsx.readFile(
      this.basePathModel + pathFile
    );
    const worksheet = modelWorkbook.getWorksheet(1);
    const countColumns = worksheet.columnCount;

    const prefixColumnKey = 'column';
    for (let i = 1; i <= countColumns; i++) {
      worksheet.setColumnKey(`${prefixColumnKey}-${i}`, worksheet.getColumn(i));
    }

    worksheet.addRows(data);

    const emptyRows: number[] = [];

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      if (row.values.length === 0) emptyRows.push(rowNumber);
    });

    const minEmptyRow = Math.min(...emptyRows);
    const maxEmptyRow = Math.max(...emptyRows);

    worksheet.spliceRows(minEmptyRow, maxEmptyRow);

    await workbook.xlsx.writeFile(
      path.join(path.resolve(UPLOADS_FOLDER + '/'), fileName)
    );

    return `${APP_HOST_URL}:${APP_PORT}/files/${fileName}`;
  }
}
