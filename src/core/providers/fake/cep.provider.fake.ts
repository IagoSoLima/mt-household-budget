import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import { type IGetCep } from '~/core/providers/dto/get-cep.dto';

export default class CepProvider implements ICepProvider {
  async get(cep: string): Promise<IGetCep> {
    const response = await Promise.resolve({
      cep: '01001-000',
      rua: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      estado: 'São Paulo',
      uf: 'SP'
    });
    return response;
  }
}
