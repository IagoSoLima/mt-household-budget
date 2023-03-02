import { camelCase, isArray, isPlainObject } from 'lodash';

type ObjProps = Record<string, any>;

export function camelizeKeys<T>(obj: ObjProps): T {
  if (isPlainObject(obj)) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      const values = isArray(obj[key])
        ? obj[key].map(i => camelizeKeys(i))
        : obj[key];
      const result = (newObj[camelCase(key)] = camelizeKeys(values));

      return result;
    });
    return newObj as T;
  } else if (isArray(obj)) obj.map(i => camelizeKeys(i));
  return obj as T;
}
