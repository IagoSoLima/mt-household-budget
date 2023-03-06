export default class Place {
  id = 0;
  publicPlace: string;
  city: string;
  uf: string;
  zipCode: string;
  number: number;
  neighborhood: string;

  constructor(
    publicPlace: string,
    city: string,
    uf: string,
    zipCode: string,
    number: number,
    neighborhood: string
  ) {
    this.publicPlace = publicPlace;
    this.city = city;
    this.uf = uf;
    this.zipCode = zipCode;
    this.number = number;
    this.neighborhood = neighborhood;
  }
}
