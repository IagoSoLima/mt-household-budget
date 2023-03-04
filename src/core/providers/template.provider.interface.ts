import { type IParseTemplateParam } from './dto/parse-template.dto';

export interface ITemplateProvider {
  parse: (data: IParseTemplateParam) => Promise<string>;
}
