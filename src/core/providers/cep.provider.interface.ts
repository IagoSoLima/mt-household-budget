import { type IGetCep } from './dto/get-cep.dto';

export interface ICepProvider {
  get: (cep: string) => Promise<IGetCep>;
}
