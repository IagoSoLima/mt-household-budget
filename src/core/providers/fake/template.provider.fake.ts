import { type IParseTemplateParam } from '../dto/parse-template.dto';
import { type ITemplateProvider } from '../template.provider.interface';

export default class TemplateProviderFake implements ITemplateProvider {
  async parse(data: IParseTemplateParam): Promise<string> {
    return await Promise.resolve('Template content');
  }
}
