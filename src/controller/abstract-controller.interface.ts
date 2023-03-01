export type AbstractFunction<T = any, P = any> = (params: P) => Promise<T>;

export default interface AbstractController {
  get?: <T = any, P = any>(params: P) => Promise<T>;
  list: <T = any, P = any>(params: P) => Promise<T>;
  create: <T = any, P = any>(params: P) => Promise<T>;
  update?: <T = any, P = any>(params: P) => Promise<T>;
  delete?: <T = any, P = any>(params: P) => Promise<T>;
}
