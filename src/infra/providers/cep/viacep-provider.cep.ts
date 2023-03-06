import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import { type IGetCep } from '~/core/providers/dto/get-cep.dto';
import { VIA_CEP_API_URL } from '~/infra/vars/app.vars';

export default class ViaCepProvider implements ICepProvider {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = VIA_CEP_API_URL;
  }

  async get(cep: string): Promise<IGetCep> {
    const response = await fetch(`${this.baseUrl}/${cep}/json/`);
    const json = await response.json();

    const parseResult: IGetCep = {
      zipCode: json.cep,
      publicPlace: json.logradouro,
      neighborhood: json.bairro,
      city: json.localidade,
      uf: json.uf
    };

    return parseResult;
  }
}
