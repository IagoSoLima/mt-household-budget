import type Place from '~/core/entity/place.entity';
import { type CreatePlace } from './dto/create-place.dto';

export interface IPlaceRepository {
  create: (params: CreatePlace) => Promise<Place>;
  getByZipCodeAndNumber: (
    zipCode: string,
    number: number
  ) => Promise<Place | null>;
}
