import { RaceRaw } from './race-raw';
import { Race } from './race';
import { MetaInfoFactory } from './meta-info-factory';
import { DayTime, Weather, TimeProgression } from './domain-codes';

export class RaceFactory {

  static fromRaw(racesRaw: RaceRaw[]): Race[] {
    if (!racesRaw) { return null; }

    return racesRaw.map(raw => {
      return {
        ...raw,
        metaInfo: MetaInfoFactory.fromRaw(raw.metaInfo)
      };
    });
  }

  /*
  static fromRaw(raceRaw: RaceRaw): Race {
    return {
      ...raceRaw,
      metaInfo: MetaInfoFactory.fromRaw(raceRaw.metaInfo)
    };
  }
  */

  // Races werden im Formular dynamisch erzeugt, darum muss die Methode jedes Objekt
  // zurückliefern, inkl. die optionalen.
  static empty(): Race {
    return {
      metaInfo: MetaInfoFactory.empty(),
      championshipId: -1,
      raceNo: 1,
      trackId: -1,
      trackName: '',
      seriesCode: null as number,
      seriesText: '',
      carThemeCode: null as number,
      carThemeText: '',
      carId: null as number,
      carName: '',
      carClassCode: null as number,
      carClassText: '',
      seasonCode: null as number,
      seasonText: '',
      dayTimeCode: DayTime.current,
      dayTimeText: '',
      weatherCode: Weather.current,
      weatherText: '',
      timeProgressionCode: TimeProgression.fixed,
      timeProgressionText: ''
    };
  }

}
