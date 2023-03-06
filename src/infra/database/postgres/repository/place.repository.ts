import PlaceAdapter from '~/adapter/place.adapter';
import type Place from '~/core/entity/place.entity';
import { type CreatePlace } from '~/core/repository/dto/create-place.dto';
import { type IPlaceRepository } from '~/core/repository/place.repository.interface';
import db from '../config.postgres';

export default class PlaceRepository implements IPlaceRepository {
  async create(params: CreatePlace): Promise<Place> {
    const { city, neighborhood, number, publicPlace, uf, zipCode } = params;
    await db.connect();
    const result = await db
      .query(
        'INSERT INTO estabelecimento (cep,numero,lougradouro,bairro,uf,cidade) VALUES ($1, $2, $3, $4, $5, $6)',
        [zipCode, number, publicPlace, neighborhood, uf, city]
      )
      .catch(err => {
        throw new Error(
          `Could not be possible register place: ${err.message || err}`
        );
      });

    const place = PlaceAdapter.create({
      zipCode: result.cep,
      number: result.numero,
      publicPlace: result.lougradouro,
      neighborhood: result.bairro,
      uf: result.uf,
      city: result.cidade
    } as Place);
    place.id = result.id;

    return place;
  }

  async getByZipCodeAndNumber(
    zipCode: string,
    number: number
  ): Promise<Place | null> {
    await db.connect();
    const result = await db
      .oneOrNone('SELECT * FROM estabelecimento WHERE cep=$1 AND numero=$2', [
        zipCode,
        number
      ])
      .catch(err => {
        throw new Error(
          `Could not be possible getting place: ${err.message || err}`
        );
      });

    if (result === null) {
      return null;
    }

    const place = PlaceAdapter.create({
      city: result.cidade,
      neighborhood: result.bairro,
      number: result.numero,
      publicPlace: result.lougradouro,
      uf: result.uf,
      zipCode: result.cep
    } as Place);
    place.id = result.id;

    return place;
  }
}
