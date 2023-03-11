import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it } from 'vitest';
import Place from '~/core/entity/place.entity';
import { type CreatePlace } from '~/core/repository/dto/create-place.dto';
import PlaceRepositoryFake from '~/core/repository/fake/place.repository.fake';
import { type IPlaceRepository } from '~/core/repository/place.repository.interface';

describe('PlaceRepository', () => {
  let placeRepository: IPlaceRepository;

  beforeEach(() => {
    placeRepository = new PlaceRepositoryFake();
  });

  it('should be defined', () => {
    expect(placeRepository).toBeDefined();
  });

  it('should be create a place', async () => {
    const stateFake = faker.address.countryCode('alpha-2');
    const params: CreatePlace = {
      city: faker.address.cityName(),
      uf: stateFake,
      number: Number(faker.address.buildingNumber()),
      zipCode: faker.address.zipCodeByState(stateFake),
      neighborhood: faker.address.streetAddress(),
      publicPlace: faker.address.streetAddress()
    };

    const place = await placeRepository.create(params);
    expect(place).toBeInstanceOf(Place);
  });

  it('should be get place by zipCode and number', async () => {
    const stateFake = faker.address.countryCode('alpha-2');
    const params: CreatePlace = {
      city: faker.address.cityName(),
      uf: stateFake,
      number: Number(faker.address.buildingNumber()),
      zipCode: faker.address.zipCodeByState(stateFake),
      neighborhood: faker.address.streetAddress(),
      publicPlace: faker.address.streetAddress()
    };

    const createdPlace = await placeRepository.create(params);
    const place = await placeRepository.getByZipCodeAndNumber(
      params.zipCode,
      params.number
    );
    expect(place).toBeInstanceOf(Place);
    expect(place?.id).toEqual(createdPlace.id);
  });

  it('should not be found place by zipCode and number', async () => {
    const zipCode = faker.address.zipCode();
    const number = Number(faker.address.buildingNumber());

    const place = await placeRepository.getByZipCodeAndNumber(zipCode, number);
    expect(place).toBeNull();
  });
});
