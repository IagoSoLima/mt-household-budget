export type AbstractFunction = (params: any) => Promise<any>;

export default interface AbstractController {
  get?: (params: any) => Promise<any>;
  list?: (params: any) => Promise<any>;
  store?: (params: any) => Promise<any>;
  update?: (params: any) => Promise<any>;
  patch?: (params: any) => Promise<any>;
  delete?: (params: any) => Promise<any>;
}
