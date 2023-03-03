import { type ListDefaultParam } from './list-default-param.dto';

export interface ListExpenseParam extends ListDefaultParam {
  initialDateMonth: Date;
}
