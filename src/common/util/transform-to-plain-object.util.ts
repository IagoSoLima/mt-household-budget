import { instanceToPlain } from 'class-transformer';
import { isArray, isObject } from 'lodash';

type ObjProps = Record<string, any>;

export function transformToPlainObject<T = any>(obj: ObjProps): T | T[] {
  if (isArray(obj)) {
    const newArray = obj.map(i => transformToPlainObject(i));

    return newArray as T[];
  }

  const newObj = instanceToPlain(obj);

  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) {
      newObj[key] = transformToPlainObject(obj[key]);
    }
  });

  return newObj as T;
}
