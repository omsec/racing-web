// returned by accessor
export interface CodeDefinition {
  code: number;
  text: string;
}

// domains (according to COD_CodeLookup.COD_Domain)
export enum CodeTypes {
  CarClass = 'Car Class',
  CarTheme = 'Car Theme',
  DayTime = 'Day Time',
  Games = 'Games',
  Languages = 'Languages',
  Roles = 'Roles',
  Season = 'Season',
  Series = 'Series',
  Sharing = 'Sharing',
  Terrain = 'Terrain',
  TimeProgression = 'Time Progression',
  TrackDifficulty = 'Track Difficulty',
  TrackType = 'Track Type',
  Weather = 'Weather'
}

// symbolic names of code values (used to assign)
// Codes zuweisen (generator) so muss es nicht 0, 1, ... sein
export enum Language {
  English,
  German
}

export enum Role {
  Guest,
  Member,
  Administrator
}

export enum Game {
  FH4,
  FH3,
  FM7,
}

export enum SharingMode {
  visibleToAll,
  visibleToMembers,
  notShared
}

export enum Series {
  roadRacing = 1,
  dirtRacing = 2,
  crossCountry = 3,
  streetScene = 4
}

export enum CarClass {
  allclasses,
  D500,
  C600,
  B700,
  A800,
  S1900,
  S2998,
  X999
}

// generated from table
export enum CarTheme {
  anythinggoes,
  ModernSuperCars,
  RetroSuperCars,
  HyperCars,
  RetroSaloons,
  VansUtility,
  RetroSportsCars,
  ModernSportsCars,
  SuperSaloons,
  ClassicRacers,
  CultCars,
  RareClassics,
  HotHatch,
  RetroHotHatch,
  SuperHotHatch,
  ExtremeTrackToys,
  ClassicMuscle,
  RodsandCustoms,
  RetroMuscle,
  ModernMuscle,
  RetroRally,
  ClassicRally,
  RallyMonsters,
  ModernRally,
  GTCars,
  SuperGT,
  ExtremeOffroad,
  SportsUtilityHeroes,
  Offroad,
  OffroadBuggies,
  ClassicSportsCars,
  TrackToys,
  VintageRacers,
  Trucks
}

export enum DayTime {
  current,
  dawn,
  sunrise,
  morning,
  earlyAfternoon,
  lateAfternoon,
  sunset,
  evening,
  night
}

export enum Weather {
  current,
  clear,
  clearPostRain,
  cloudy,
  cloudyPostRain,
  overcast,
  lightRain,
  heavyRain,
  fog
}

export enum TimeProgression {
  rolling,
  fixed
}

export enum Season {
  spring,
  summer,
  automn,
  winter
}

export enum TrackType {
  standard,
  community
}

export enum TrackDifficulty {
  veryEasy,
  easy,
  medium,
  hard,
  verHard
}

export enum Terrain {
  road,
  dirt,
  offriad
}
