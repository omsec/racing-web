import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Basics, Blueprint, Restrictions, Conditions, Additional } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from './course.service';
import { CourseFactory } from '../_models/course-factory';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CourseWizardService {
  // Page Data
  basics: Basics;
  blueprint: Blueprint;
  restrictions: Restrictions;
  conditions: Conditions;
  additional: Additional;

  constructor(
    private courseService: CourseService,
    private authenticationService: AuthenticationService) {
      this.reset();
  }

  // weil services singletons sind, wird der constructor auch nur einmal gerufen.
  // für jeden lauf müssen daher die fleder zurückgesetzt werden.
  reset() {
    this.basics = {
      gameCode: CodeTypes.Game.FH4,
      name: '',
      sharingCode: 0,
      description: ''
    };

    this.blueprint = {
      startingPoint: null,
      terrain: null,
      seriesCode: null,
      difficultyCode: null
    };

    this.restrictions = {
      carClassCode: CodeTypes.CarClass.allclasses,
      carThemeCode: CodeTypes.CarTheme.anythinggoes,
      car: null
    };

    this.conditions = {
      seasonCode: null,
      daytimeCode: CodeTypes.DayTime.current,
      weatherCode: CodeTypes.Weather.current
    };

    this.additional = {
      laps: 3,
      timeProgressionCode: CodeTypes.TimeProgression.fixed,
      distanceKM: null
    };
  }

  // assemble step data to final object then call creation API & return new Id (to navigate)
  finish() {
    const newCourse = CourseFactory.empty();

    // set values
    newCourse.metaInfo.createdId = this.authenticationService.currentUserValue.userId;
    newCourse.metaInfo.sharingModeCode = CodeTypes.SharingMode.visibleToAll; // momentan statisch

    // std info
    newCourse.gameCode = this.basics.gameCode;
    newCourse.name = this.basics.name;

    // cst info block I
    // https://pietschsoft.com/post/2008/10/14/javascript-gem-null-coalescing-using-the-or-operator
    newCourse.designedBy = this.authenticationService.currentUserValue.xBox
    || this.authenticationService.currentUserValue.discord
    || this.authenticationService.currentUserValue.username;

    // restrictions
    newCourse.carThemeCode = this.restrictions.carThemeCode;
    newCourse.carId = this.restrictions.car?.carId || null; // 0 durch null ersetzen
    newCourse.carClassCode = this.restrictions.carClassCode;

    // routing (actually mandatory but not always provided)
    newCourse.forzaRouteId = this.blueprint.startingPoint?.trackId || null; // solange feld nicht validiert werden kann :-/

    // cst info block II
    newCourse.standardLaps = this.additional.laps;
    newCourse.seasonCode = this.conditions.seasonCode;
    newCourse.daytimeCode = this.conditions.daytimeCode;
    newCourse.weatherCode = this.conditions.weatherCode;
    newCourse.timeProgressionCode = this.additional.timeProgressionCode;

    // cst info block III
    newCourse.distanceKM = this.additional.distanceKM;
    newCourse.sharingCode = this.basics.sharingCode;
    newCourse.difficultyCode = this.blueprint.difficultyCode;
    newCourse.seriesCode = this.blueprint.seriesCode;
    newCourse.description = this.basics.description;

    // additional
    newCourse.terrain = this.blueprint.terrain;

    return this.courseService.addCourse(newCourse).pipe(
      tap(courseId => { } )
    );
  }

}
