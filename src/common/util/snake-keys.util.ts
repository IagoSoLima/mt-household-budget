import { isArray, isPlainObject, snakeCase } from 'lodash';

type ObjProps = Record<string, any>;

export function snakeKeys<T>(obj: ObjProps): T {
  if (isPlainObject(obj)) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      const values = isArray(obj[key])
        ? obj[key].map(i => snakeKeys(i))
        : obj[key];
      const result = (newObj[snakeCase(key)] = snakeKeys(values));

      return result;
    });
    return newObj as T;
  } else if (isArray(obj)) obj.map(snakeKeys);

  return obj as T;
}
