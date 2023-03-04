import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { type IParseTemplateParam } from '~/core/providers/dto/parse-template.dto';
import { type ITemplateProvider } from '~/core/providers/template.provider.interface';

export default class HandlebarsTemplateProvider implements ITemplateProvider {
  public async parse({
    file,
    variables
  }: IParseTemplateParam): Promise<string> {
    const templateFileContent = fs.readFileSync(file, {
      encoding: 'utf-8'
    });
    const parseTamplate = handlebars.compile(templateFileContent);

    return parseTamplate({ data: variables });
  }
}
