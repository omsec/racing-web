import {
    // tslint prefers short lines :-)
    Game, Series, TrackDifficulty, Season, CarTheme,
    DayTime, Weather, TimeProgression, CarClass, CodeDefinition } from './domain-codes';
import { CourseNameSearch } from './course';
import { CarNameSearch } from './car';

export interface Basics {
  gameCode: Game;
  name: string;
  sharingCode: number;
}

export interface Blueprint {
  startingPoint: CourseNameSearch;
  terrain: CodeDefinition[];
  seriesCode: Series;
  difficultyCode: TrackDifficulty;
}

export interface Restrictions {
  carClassCode: CarClass;
  carThemeCode: CarTheme;
  car: CarNameSearch;
}

export interface Conditions {
  seasonCode: Season;
  daytimeCode: DayTime;
  weatherCode: Weather;
}

export interface Additional {
  laps: number;
  timeProgressionCode: TimeProgression;
  distanceKM?: number;
}
