import { type IPdfProvider } from '../pdf.provider.interface';

export default class PdfProviderFake implements IPdfProvider {
  async generate(template: string): Promise<string> {
    return await Promise.resolve('PDF successfully generated');
  }
}
