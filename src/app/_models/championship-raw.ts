import { MetaInfoRaw } from './meta-info-raw';
import { RaceRaw } from './race-raw';

export interface ChampionshipRaw {
  metaInfo: MetaInfoRaw;
  gameCode: number;
  gameText?: string;
  blueprintName: string;
  description?: string;
  races?: RaceRaw[];
  rating: string;
}

// search-struktur (browse)
export interface ChampionshipBrowseRaw {
  id: number;
  name: string;
  rating: string;
  countRaces: number;
  countSeries: number;
  seriesCode: number;
  seriesText: string;
  countCarClass: number;
  carClassCode: number;
  carClassText: string;
  countCarTheme: number;
  carThemeCode: number;
  carThemeText: string;
  countCar: number;
  carName: string;
  createdById: number;
  createdByName: string;
}
