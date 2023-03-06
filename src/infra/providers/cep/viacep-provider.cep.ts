import { type ICepProvider } from '~/core/providers/cep.provider.interface';
import { type IGetCep } from '~/core/providers/dto/get-cep.dto';
import { VIA_CEP_API_URL } from '~/infra/vars/app.vars';

export default class ViaCepProvider implements ICepProvider {
  async get(cep: string): Promise<IGetCep> {
    const response = await fetch(`${VIA_CEP_API_URL}/${cep}/json`);
    const json = await response.json();
    const parseResult = {
      cep: json.cep,
      rua: json.logradouro,
      bairro: json.bairro,
      estado: json.localidade,
      uf: json.uf
    };

    return parseResult;
  }
}
