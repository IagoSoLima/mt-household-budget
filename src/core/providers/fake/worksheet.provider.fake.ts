import { type GenerateWorksheet } from '~/core/providers/dto/generate-worksheet.dto';
import { type IWorksheetProvider } from '~/core/providers/worksheet.provider.interface';

export default class WorksheetProviderFake implements IWorksheetProvider {
  async generate(
    props: GenerateWorksheet
  ): Promise<string | Uint8Array | Buffer> {
    return await Promise.resolve('Worksheet generated');
  }
}
