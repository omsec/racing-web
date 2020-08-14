import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map, startWith } from 'rxjs/operators';

import { Course, CourseNameSearch } from '../_models/course';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';
import { CarService } from '../_services/car.service';
import { CarNameSearch } from '../_models/car';
import { AuthenticationService } from '../_services/authentication.service';
import { CourseFactory } from '../_models/course-factory';

@Component({
  selector: 'ew-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnChanges {
  courseForm: FormGroup;
  @Input() course: Course;
  @Input() editing = false; // modus (create, edit)

  // Event für die Steuerkomponente des Formulars
  @Output() submitCourse = new EventEmitter<Course>();

  // Status-Variablen
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  Game: CodeTypes.CodeDefinition[] = [];
  Terrain: CodeTypes.CodeDefinition[] = [];
  Difficulty: CodeTypes.CodeDefinition[] = [];
  Series: CodeTypes.CodeDefinition[] = [];
  CarClass: CodeTypes.CodeDefinition[] = [];
  CarTheme: CodeTypes.CodeDefinition[] = [];
  Season: CodeTypes.CodeDefinition[] = [];
  DayTime: CodeTypes.CodeDefinition[] = [];
  Weather: CodeTypes.CodeDefinition[] = [];
  TimeProgression: CodeTypes.CodeDefinition[] = [];
  Visibility: CodeTypes.CodeDefinition[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private carService: CarService,
    private authenticationService: AuthenticationService
  ) { }

  // Type-ahead handling
  // https://ng-bootstrap.github.io/#/components/typeahead/examples
  // Flags für GUI-Status
  searching = false; // currently not used
  searchFailed = false;
  // formatiert die liste/input
  formatMatches = (value: CarNameSearch) => value.carName;
  formatCourseMatches = (value: CourseNameSearch) => value.trackName;

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.carService.searchByCarName(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  searchCourse = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.courseService.searchStandardCourseByName(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.course);
  }

  ngOnInit(): void {
    this.initForm();
  }

  // Felder initialisieren für edit/change-Modus (bearbeiten)
  private setFormValues(course: Course) {
    this.courseForm.patchValue(course);
    // Felder mit anderem Namen im Formular als im Modell 'manuell' setzen :-/
    this.courseFrm.courseName.setValue(course.name);
    // type: CourseNameSearch
    this.courseFrm.routeInfo.setValue({
      trackId: course.forzaRouteId,
      trackName: course.forzaRouteName,
    });
    // type: CarNameSearch
    this.courseFrm.carInfo.setValue({
      carId: course.carId,
      carName: course.carName
    });
    // terrain (multi-select codes/tag): type CodeDefinition
    // Initialisierung klappt leider nicht - bleibt daher leer
    // this.courseFrm.terrainCodes.setValue(course.terrain);
    // console.log(this.courseFrm.terrainCodes.value);
  }

  // damit das Formular für add & edit benutzt werden kann
  private initForm() {
    if (this.courseForm) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.Game = this.courseService.Game;
    this.Terrain = this.courseService.Terrain;
    this.Difficulty = this.courseService.Difficulty;
    this.Series = this.courseService.Series;
    this.CarClass = this.courseService.CarClass;
    this.CarTheme = this.courseService.CarTheme;
    this.Season = this.courseService.Season;
    this.DayTime = this.courseService.DayTime;
    this.Weather = this.courseService.Weather;
    this.TimeProgression = this.courseService.TimeProgression;

    // Formularmodell
    // Section "Basics"
    this.courseForm = this.formBuilder.group({
    gameCode: [CodeTypes.Game.FH4, Validators.required],
    courseName: ['', Validators.required],
    terrainCodes: [null, Validators.required], // different type: set by ngx-chips control
    difficultyCode: [null, Validators.required],
    seriesCode: [null, Validators.required],
    // route/fh/name
    sharingCode: [0, [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
    routeInfo: [null as CourseNameSearch, []], // provided by Type-Ahead
    // Section "Restrictions"
    carClassCode: [CodeTypes.CarClass.allclasses],
    carThemeCode: [CodeTypes.CarTheme.anythinggoes],
    carInfo: [null as CarNameSearch, []], // provided by Type-Ahead
    // Section "Conditions"
    seasonCode: [null, Validators.required],
    daytimeCode: [CodeTypes.DayTime.current, Validators.required],
    weatherCode: [CodeTypes.Weather.current, Validators.required],
    timeProgressionCode: [CodeTypes.TimeProgression.fixed, Validators.required],
    // Section "Additional"
    laps: [3, [Validators.required, Validators.min(1), Validators.max(50)]],
    distanceKM: [],
    description: ['']
    // ToDo: VisibilityCode (=> metaInfo)
  });

  }

  // Hilfsmethode für einfacheren Zugriff auf die Controls
  get courseFrm() { return this.courseForm.controls; }

  onSubmit() {
    this.submitted = true;
    // console.log(this.courseFrm.carInfo.value.carId);
    // console.log(this.courseFrm.terrain.value.code);

    // console.log(this.authenticationService.currentUserValue.userId);


    // Falls das Formular ungültig ist, abbrechen
    if (this.courseForm.invalid) { return; }

    const newCourse = CourseFactory.empty(); // besser mit Spread-Operator aus this.Course?
    // override as needed
    if (this.editing) {
      newCourse.metaInfo.id = this.course.metaInfo.id;
      newCourse.metaInfo.modifiedId = this.authenticationService.currentUserValue.userId;
    } else {
      newCourse.metaInfo.createdId = this.authenticationService.currentUserValue.userId;
    }
    newCourse.metaInfo.sharingModeCode = CodeTypes.SharingMode.visibleToAll; // momentan statisch
    // std info
    newCourse.gameCode = this.courseFrm.gameCode.value;
    newCourse.name = this.courseFrm.courseName.value;
    // cst info block I
    // https://pietschsoft.com/post/2008/10/14/javascript-gem-null-coalescing-using-the-or-operator
    newCourse.designedBy = this.authenticationService.currentUserValue.xBox
    || this.authenticationService.currentUserValue.discord
    || this.authenticationService.currentUserValue.username,
    // restrictions
    newCourse.carThemeCode = this.courseFrm.carThemeCode.value,
    newCourse.carId = this.courseFrm.carInfo?.value?.carId || null, // 0 durch null ersetzen
    newCourse.carClassCode = this.courseFrm.carClassCode.value,
    // routing (actually mandatory but not always provided)
    newCourse.forzaRouteId = this.courseFrm.routeInfo?.value?.trackId || null,
    // cst info block II
    newCourse.standardLaps = this.courseFrm.laps.value,
    newCourse.seasonCode = this.courseFrm.seasonCode.value,
    newCourse.daytimeCode = this.courseFrm.daytimeCode.value,
    newCourse.weatherCode = this.courseFrm.weatherCode.value,
    newCourse.timeProgressionCode = this.courseFrm.timeProgressionCode.value,
    // cst info block III,
    newCourse.distanceKM = this.courseFrm.distanceKM.value,
    newCourse.sharingCode = this.courseFrm.sharingCode.value,
    newCourse.difficultyCode = this.courseFrm.difficultyCode.value,
    newCourse.seriesCode = this.courseFrm.seriesCode.value,
    // additional
    // console.log(this.courseFrm.terrain.value.code);
    newCourse.terrain = this.courseFrm.terrainCodes.value.map(selection => {
      return {
        code: selection.code,
        text: selection.text
      };
    });

    this.submitCourse.emit(newCourse);
    // this.courseForm.reset(); // stattdessen navigieren auf die neue strecke
  }
}
