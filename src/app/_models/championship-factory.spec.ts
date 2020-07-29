import { ChampionshipFactory } from './championship-factory';

describe('ChampionshipFactory', () => {
  it('should create an instance', () => {
    expect(new ChampionshipFactory()).toBeTruthy();
  });
});
