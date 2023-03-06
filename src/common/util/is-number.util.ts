export function isNumber(num: any): boolean {
  const isEmpty = num === '';

  if (isEmpty) return false;

  return !!Number(num);
}
