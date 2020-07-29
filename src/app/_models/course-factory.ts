import { CourseRaw, CourseNameSearchRaw, CourseBrowseRaw } from './course-raw';
import { Course, CourseNameSearch, CourseBrowse } from './course';
import { MetaInfoFactory } from './meta-info-factory';
import { RatingFactory } from './rating-factory';
import { ImageFactory } from './image-factory';
import { Game, TrackType, DayTime, Weather, TimeProgression, CarClass, CarTheme } from './domain-codes';

export class CourseFactory {

  static fromRaw(courseRaw: CourseRaw): Course {
    return {
      ...courseRaw,
      metaInfo: MetaInfoFactory.fromRaw(courseRaw.metaInfo),
      // terrain: TagFactory.fromRaw(courseRaw.terrain),
      ratingInfo: RatingFactory.fromRaw(courseRaw.ratingInfo),
      images: ImageFactory.fromRaw(courseRaw.images)
    };
  }

  // leider können methoden in JS nicht überladen werden
  static fromRawCourseNameSearch(courseNameSearchRaw: CourseNameSearchRaw): CourseNameSearch {
    return {
      ...courseNameSearchRaw
    };
  }

  static fromRawCourseBrowse(courseBrowseRaw: CourseBrowseRaw): CourseBrowse {
    return {
      ...courseBrowseRaw
    };
  }

  // die von API-Services erwarteten Attribute müssen vorhanden sein (null oder defaults)
  // auch wenn mit safe-operator markiert.
  // sonst wirft der PHP-Service Fehler, was den Error Interceptor auslöst
  // Convention: Services erwarten nie TXT zu Codes und keine Names aus Look-ups
  static empty(): Course {
    return {
      metaInfo: MetaInfoFactory.empty(),
      // std info
      gameCode: Game.FH4,
      name: '',
      typeCode: TrackType.community,
      seriesCode: null,
      // cst info block I
      designedBy: '',
      externalId: null,
      // restrictions
      carThemeCode: CarTheme.anythinggoes,
      carId: null,
      carClassCode: CarClass.allclasses,
      // routing
      forzaRouteId: null,
      customRoute: null,
      // cst info block II
      standardLaps: 3,
      seasonCode: null,
      daytimeCode: DayTime.current,
      weatherCode: Weather.current,
      timeProgressionCode: TimeProgression.fixed,
      // cst info block III
      defaultLapTimeMin: 0,
      distanceKM: 0,
      sharingCode: 0,
      difficultyCode: null,
      description: '',
      // additional
      terrain: null, // ToDo: Factory (nötig?)
      ratingInfo: RatingFactory.empty(),
      images: null
    };
  }
}
