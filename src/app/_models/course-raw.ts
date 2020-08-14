import { MetaInfoRaw } from './meta-info-raw';
import { ImageRaw } from './image-raw';
import { CodeDefinition } from './domain-codes';

export interface CourseRaw {
  metaInfo: MetaInfoRaw;
  // std info
  gameCode: number;
  gameText?: string;
  name: string;
  typeCode: number;
  typeText?: string;
  seriesCode?: number;
  seriesText?: string;
  // cst info block I
  designedBy?: string;
  externalId?: string;
  // restrictions
  carThemeCode?: number;
  carThemeText?: string;
  carId?: number;
  carName?: string;
  carClassCode: number;
  carClassText?: string;
  // routing
  forzaRouteId?: number;
  forzaRouteName?: string;
  customRoute?: string;
  // cst info block II
  standardLaps: number;
  seasonCode?: number;
  seasonText?: string;
  daytimeCode: number;
  daytimeText?: string;
  weatherCode: number;
  weatherText?: string;
  timeProgressionCode: number;
  timeProgressionText?: string;
  // cst info block III
  defaultLapTimeSec?: number;
  distanceKM?: number;
  sharingCode?: number;
  difficultyCode?: number;
  difficultyText?: string;
  description?: string;
  // additional
  terrain?: CodeDefinition[];
  // ratingInfo?: RatingInfoRaw;
  rating: string;
  images?: ImageRaw[];
}

// search-struktur (type-ahead)
export interface CourseNameSearchRaw {
  trackId: number;
  typeCode: number;
  seriesCode: number;
  trackName: string;
  carClassCode: number;
  carThemeCode: number;
  carId?: number;
  carName?: string;
}

// search-struktur (browse)
export interface CourseBrowseRaw {
  id: number;
  name: string;
  rating: number;
  forzaSharing: number;
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
