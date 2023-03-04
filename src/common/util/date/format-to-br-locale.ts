import { ptBR } from 'date-fns/locale';
import { format } from './format.date.util';

export const formatToBRLocale = (
  date: Date,
  formatting = 'yyyy-MM-dd'
): string => {
  return format(date, formatting, {
    locale: ptBR
  });
};
