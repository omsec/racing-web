import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map, startWith } from 'rxjs/operators';

import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

import { Race } from '../_models/race';
import { CodeType } from '../_models/code-type'; // codeMap
import * as CodeTypes from '../_models/domain-codes';
import { ChampionshipService } from '../_services/championship.service';
import { CarNameSearch } from '../_models/car';
import { RaceFactory } from '../_models/race-factory';
import { CarService } from '../_services/car.service';
import { CourseNameSearch, Course} from '../_models/course';
import { CourseService } from '../_services/course.service';
import { ChampionshipFactory } from '../_models/championship-factory';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'ew-championship-form',
  templateUrl: './championship-form.component.html',
  styleUrls: ['./championship-form.component.css']
})
export class ChampionshipFormComponent implements OnInit {
  // Formular wird auf Gurnd seiner Komplexität (und reduzierten Controls) nur die für Erstellung benutzt
  championshipForm: FormGroup;

  // Event für die Steuerkomponente des Formulars
  @Output() submitChampionship = new EventEmitter<any>(); // "synthetisches" Objekt

  // Status-Variablen für das Template (Validierung)
  loading = false;
  submitted = false;
  raceLimitConfirmed = false; // damit die Meldung nur einmal erscheint

  // Codes für Auswahlen
  codeMap$: Observable<CodeType[]>;
  codeMap: CodeType[] = [];

  Game: CodeTypes.CodeDefinition[] = [];
  Series: CodeTypes.CodeDefinition[] = [];
  CarClass: CodeTypes.CodeDefinition[] = [];
  CarTheme: CodeTypes.CodeDefinition[] = [];

  constructor(
    // private route: ActivatedRoute, // used for Code Resolver
    // private codeService: CodeReaderService, // provides accessor
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private chamionshipService: ChampionshipService,
    private carService: CarService,
    private courseService: CourseService
    ) { }

  // Type-ahead handling
  // https://ng-bootstrap.github.io/#/components/typeahead/examples
  searching = false;
  carSearchFailed = false;
  courseSearchFailed = false;
  // formatiert die liste/input
  formatCarMatches = (value: CarNameSearch) => value.carName;
  formatCourseMatches = (value: CourseNameSearch) => value.trackName;

  searchCars = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.carService.searchByCarName(term).pipe(
        tap(() => this.carSearchFailed = false),
        catchError(() => {
          this.carSearchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  searchCourses = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.courseService.searchByCourseName(term).pipe(
        tap(() => this.courseSearchFailed = false),
        catchError(() => {
          this.courseSearchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.championshipForm) { return; }

    // this.codeMap = this.route.snapshot.data.codeMap$;

    // console.log(this.codeMap);


    // Codes (Auswahlmöglichkeiten)
    this.Game = this.chamionshipService.Game;
    // this.Game = this.codeService.getCodeDefinition2('Games', this.codeMap);
    this.Series = this.chamionshipService.Series;
    this.CarClass = this.chamionshipService.CarClass;
    this.CarTheme = this.chamionshipService.CarTheme;

    // console.log(this.Game);

    // Formularmodell
    this.championshipForm = this.formBuilder.group({
      gameCode: [CodeTypes.Game.FH4, Validators.required],
      blueprintName: ['', Validators.required],
      description: [''],
      // restrictions (applied to all races)
      seriesCode: [null], // auf Stufe Meisterschaft kein Muss-Feld
      carClassCode: [CodeTypes.CarClass.allclasses, Validators.required],
      carThemeCode: [CodeTypes.CarTheme.anythinggoes, Validators.required],
      carInfo: [null as CarNameSearch, []], // different type: CarNameSearch
      // Rennen (dynamisch)
      races: this.buildRaceArray() // erster Eintrag einfügen
      });
  }

  // https://www.concretepage.com/angular/angular-formarray-validation
  // Controls für die Rennen
  private raceControls(): any {
    return {
      seriesCode: [{value: null, disabled: true}, Validators.required],
      courseInfo: [null as CourseNameSearch, Validators.required],
      carClassCode: [CodeTypes.CarClass.allclasses, Validators.required],
      carThemeCode: [CodeTypes.CarTheme.anythinggoes, Validators.required],
      carInfo: [null as CarNameSearch]
    };
  }

  private buildRaceArray(): FormArray {
    return this.formBuilder.array([
      this.formBuilder.group(this.raceControls())
    ]);
  }

  // Hilfsmethoden (Getter) für einfacheren Zugriff auf die Controls
  get championshipFrm() { return this.championshipForm.controls; }

  get races(): FormArray {
    return this.championshipForm.get('races') as FormArray;
  }

  addRaceControls(cnt: number) {
    if (cnt >= 5 && !this.raceLimitConfirmed && !confirm('Really add more than 5 races?')) { return; }

    this.raceLimitConfirmed = true;
    this.races.push(
      this.formBuilder.group(this.raceControls())
    );
  }

  OnCourseSelected(evt: NgbTypeaheadSelectItemEvent) {
    // type: CourseNameSearch (Course Model)

    // console.log(evt.item);
    // console.log(this.races.controls[0].controls.seriesCode.value);
    // this.races.controls[this.races.length - 1].controls.seriesCode.setValue(evt.item.seriesCode); // works but gives error
    this.races.at(this.races.length - 1).get('seriesCode').setValue(evt.item.seriesCode);
    // tslint:disable-next-line
    if (evt.item.typeCode == CodeTypes.TrackType.community) {
      // console.log(evt.item);
      // bei blueprints können die restrictions vorgegeben sein
      if (evt.item.carClassCode != CodeTypes.CarClass.allclasses) { // tslint:disable-line
        this.races.at(this.races.length - 1).get('carClassCode').setValue(evt.item.carClassCode);
        this.races.at(this.races.length - 1).get('carClassCode').disable();
      } else {
        this.races.at(this.races.length - 1).get('carClassCode').enable();
      }

      if (evt.item.carThemeCode != CodeTypes.CarTheme.anythinggoes) { // tslint:disable-line
        this.races.at(this.races.length - 1).get('carThemeCode').setValue(evt.item.carThemeCode);
        this.races.at(this.races.length - 1).get('carThemeCode').disable();
      } else {
        this.races.at(this.races.length - 1).get('carThemeCode').enable();
      }

      if (evt.item.carId) { // tslint:disable-line
        this.races.at(this.races.length - 1).get('carInfo').setValue({
          carId: evt.item.carId,
          carName: evt.item.carName
        });
        this.races.at(this.races.length - 1).get('carInfo').disable();
        // wenn car gesetzt, auch theme disablen
        this.races.at(this.races.length - 1).get('carThemeCode').disable();

      } else {
        this.races.at(this.races.length - 1).get('carInfo').enable();
      }

    } else {
      // Standard-Strecke
      this.races.at(this.races.length - 1).get('carClassCode').enable();
      this.races.at(this.races.length - 1).get('carThemeCode').enable();
      this.races.at(this.races.length - 1).get('carInfo').enable();
    }
  }

  onSubmit(races: number) {
    if (!races) { return; }

    this.submitted = true;

    // console.log(this.championshipFrm.races.value[0].seriesCode);

    // Falls das Formular ungültig ist, abbrechen
    if (this.championshipForm.invalid) { return; }

    const newChampionship = ChampionshipFactory.empty();
    // override as needed
    newChampionship.metaInfo.createdId = this.authenticationService.currentUserValue.userId;
    newChampionship.metaInfo.sharingModeCode = CodeTypes.SharingMode.visibleToAll; // momentan statisch

    newChampionship.gameCode = this.championshipFrm.gameCode.value;
    newChampionship.blueprintName = this.championshipFrm.blueprintName.value;
    newChampionship.description = this.championshipFrm.description.value; // service stores NULL for ''

    const newRaces: Race[] = [];

    // console.log(this.championshipFrm.races.value[0].seriesCode);

    let i = 1;
    for (const ctrl of this.races.getRawValue()) {
      // console.log(ctrl.seriesCode);
      newRaces.push(
        RaceFactory.empty()
      );

      newRaces[newRaces.length - 1].metaInfo.createdId = newChampionship.metaInfo.createdId;
      newRaces[newRaces.length - 1].raceNo = i;
      newRaces[newRaces.length - 1].trackId = ctrl.courseInfo.trackId;
      newRaces[newRaces.length - 1].seriesCode = ctrl.seriesCode;
      newRaces[newRaces.length - 1].carThemeCode = ctrl.carThemeCode;
      // newRaces[newRaces.length - 1].carId = ctrl?.carInfo?.carId; safe-operator entfernt das item, wenn nicht vorhanden
      if (ctrl.carInfo) { newRaces[newRaces.length - 1].carId = ctrl.carInfo.carId; }
      newRaces[newRaces.length - 1].carClassCode = ctrl.carClassCode;
      i++;

      // ToDo: sonstige, nicht abgefrage Infos (z. B. Wetter & Zeit) aus der courseInfo übernehmen
      // dazu sollter die Struktur CourseNameSearch evtl. aufgegeben und durch das "normale" Course Objekt ersetzt
      // (oder sehr stark erweitert um diese Codes)
    }
    // Hilfsobjekt bauen, mit dessen Daten nachher die API-Services aufgerufen werden können
    const eventData = { championship: newChampionship, races: newRaces};
    this.submitChampionship.emit(eventData);
  }

}
