import { MetaInfo } from './meta-info';
import { Race } from './race';
import { RatingInfo } from './rating-info';

export interface Championship {
  metaInfo: MetaInfo;
  gameCode: number;
  gameText?: string;
  blueprintName: string;
  description?: string;
  races?: Race[];
  ratingInfo?: RatingInfo;
}

// search-struktur (browse)
export interface ChampionshipBrowse {
  id: number;
  name: string;
  rating: number;
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
