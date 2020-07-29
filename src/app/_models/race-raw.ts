import { MetaInfoRaw } from './meta-info-raw';
// Komposition mit Championship - daher ohne Rating
export interface RaceRaw {
  metaInfo: MetaInfoRaw;
  championshipId: number;
  raceNo: number;
  trackId: number;
  trackName?: string;
  seriesCode?: number;
  seriesText?: string;
  carThemeCode?: number;
  carThemeText?: string;
  carId?: number;
  carName?: string;
  carClassCode?: number;
  carClassText?: string;
  seasonCode?: number;
  seasonText?: string;
  dayTimeCode: number;
  dayTimeText?: string;
  weatherCode: number;
  weatherText?: string;
  timeProgressionCode: number;
  timeProgressionText?: string;
}
