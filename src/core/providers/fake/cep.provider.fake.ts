import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import { type IGetCep } from '~/core/providers/dto/get-cep.dto';

export default class CepProviderFake implements ICepProvider {
  async get(cep: string): Promise<IGetCep> {
    const response = await Promise.resolve({
      zipCode: '01001-000',
      publicPlace: 'Praça da Sé',
      neighborhood: 'Sé',
      city: 'São Paulo',
      uf: 'SP'
    });

    return response;
  }
}
