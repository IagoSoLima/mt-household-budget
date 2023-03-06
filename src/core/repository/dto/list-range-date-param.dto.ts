import { type ListDefaultParam } from './list-default-param.dto';

export interface ListRangeDateParam extends ListDefaultParam {
  initialDate: Date;
  finishedDate: Date;
}
