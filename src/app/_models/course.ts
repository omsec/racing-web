import { MetaInfo } from './meta-info';
import { RatingInfo } from './rating-info';
import { Game, TrackType, Series, TrackDifficulty, Season, CarTheme, DayTime, Weather, TimeProgression, CarClass } from './domain-codes';
import { Image } from './image';
import { CodeDefinition } from './domain-codes';

export interface Course {
  metaInfo: MetaInfo;
  // std info
  gameCode: Game;
  gameText?: string;
  name: string;
  typeCode: TrackType;
  typeText?: string;
  seriesCode?: Series;
  seriesText?: string;
  // cst info block I
  designedBy?: string;
  externalId?: string;
  // restrictions
  carThemeCode?: CarTheme;
  carThemeText?: string;
  carId?: number; // umbennen? carRestriction
  carName?: string;
  carClassCode: CarClass;
  carClassText?: string;
  // routing
  forzaRouteId?: number;
  forzaRouteName?: string;
  customRoute?: string;
  // cst info block II
  standardLaps: number;
  seasonCode?: Season;
  seasonText?: string;
  daytimeCode: DayTime;
  daytimeText?: string;
  weatherCode: Weather;
  weatherText?: string;
  timeProgressionCode: TimeProgression;
  timeProgressionText?: string;
  // cst info block III
  defaultLapTimeMin?: number;
  distanceKM?: number;
  sharingCode?: number;
  difficultyCode?: TrackDifficulty;
  difficultyText?: string;
  description?: string;
  // additional
  terrain?: CodeDefinition[]; // generic
  ratingInfo?: RatingInfo;
  images?: Image[];
}

// search-struktur (type-ahead)
export interface CourseNameSearch {
  trackId: number;
  typeCode: number;
  seriesCode: number;
  trackName: string;
}

// search-struktur (browse)
export interface CourseBrowse {
  id: number;
  name: string;
  forzaSharing: number;
  rating: number;
  typeCode: number;
  typeText: string;
  designer: string;
  difficultyCode: number;
  difficultyText: string;
  seriesCode: number;
  seriesText: string;
  carClassCode: number;
  carClassText: string;
  carThemeCode: number;
  carThemeText: string;
  carId: number;
  carName: string;
  seasonCode: number;
  seasonText: string;
  weatherCode: number;
  weatherText: string;
  dayTimeCode: number;
  dayTimeText: string;
  timeProgressionCode: number;
  timeProgressionText: string;
}
