import { CarNameSearchRaw } from '../_models/car-raw';
import { CarNameSearch } from '../_models/car';

export class CarFactory {
  static fromRaw(carNameSearchRaw: CarNameSearchRaw): CarNameSearch {
    return {
      ...carNameSearchRaw
    };
  }
}
