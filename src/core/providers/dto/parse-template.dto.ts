type TemplateVariables = Record<string, any>;

export interface IParseTemplateParam {
  file: string;
  variables: TemplateVariables;
}
