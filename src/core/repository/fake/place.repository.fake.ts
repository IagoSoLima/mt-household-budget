import PlaceAdapter from '~/adapter/place.adapter';
import type Place from '~/core/entity/place.entity';
import { type IPlaceRepository } from '~/core/repository/place.repository.interface';
import { type CreatePlace } from '../dto/create-place.dto';

export default class PlaceRepositoryFake implements IPlaceRepository {
  private readonly places: Place[] = [];

  async create(params: CreatePlace): Promise<Place> {
    const { city, neighborhood, number, publicPlace, uf, zipCode } = params;
    const place = PlaceAdapter.create({
      city,
      neighborhood,
      number,
      publicPlace,
      uf,
      zipCode
    });

    this.places.push(place);

    return await Promise.resolve(place);
  }

  async getByZipCodeAndNumber(
    zipCode: string,
    number: number
  ): Promise<Place | null> {
    const index = this.places.findIndex(
      place => place.zipCode === zipCode && place.number === number
    );

    if (index === -1) {
      return null;
    }

    return await Promise.resolve(this.places[index]);
  }
}
