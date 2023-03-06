import Place from '~/core/entity/place.entity';

const PlaceAdapter = {
  create(param: Omit<Place, 'id'>): Place {
    const { city, neighborhood, number, publicPlace, uf, zipCode } = param;
    return new Place(publicPlace, city, uf, zipCode, number, neighborhood);
  }
};

export default PlaceAdapter;
