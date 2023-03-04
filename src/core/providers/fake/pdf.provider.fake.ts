import { type IPdfProvider } from '../pdf.provider.interface';

export default class PdfProviderFake implements IPdfProvider {
  async generate(): Promise<string> {
    return await Promise.resolve('PDF successfully generated');
  }
}
