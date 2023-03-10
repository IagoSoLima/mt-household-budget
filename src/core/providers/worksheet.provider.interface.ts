import { type GenerateWorksheet } from './dto/generate-worksheet.dto';

export interface IWorksheetProvider {
  generate: (props: GenerateWorksheet) => Promise<string | Uint8Array | Buffer>;
}
