import { CarFactory } from './car-factory';

describe('CarFactory', () => {
  it('should create an instance', () => {
    expect(new CarFactory()).toBeTruthy();
  });
});
