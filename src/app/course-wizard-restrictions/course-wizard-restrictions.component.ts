import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

import { CourseWizardService } from '../_services/course-wizard.service';
import { Restrictions } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';
import { CarNameSearch } from '../_models/car';
import { CarService } from '../_services/car.service';
@Component({
  selector: 'ew-course-wizard-restrictions',
  templateUrl: './course-wizard-restrictions.component.html',
  styleUrls: ['./course-wizard-restrictions.component.css']
})
export class CourseWizardRestrictionsComponent implements OnInit {
  form: FormGroup;
  data: Restrictions;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  CarClass: CodeTypes.CodeDefinition[] = [];
  CarTheme: CodeTypes.CodeDefinition[] = [];

  constructor(
    private courseWizardService: CourseWizardService,
    private courseService: CourseService,  // für Codes
    private carService: CarService, // für Type-Ahead
    private formBuilder: FormBuilder,
    private router: Router) {
      this.data = courseWizardService.restrictions;
  }

  // Type-ahead handling
  // https://ng-bootstrap.github.io/#/components/typeahead/examples
  // Flags für GUI-Status
  searching = false; // currently not used
  searchFailed = false;
  // formatiert die liste/input
  formatMatches = (value: CarNameSearch) => value.carName;

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

  ngOnInit(): void {
    this.initForm();
  }

  // damit das Formular für add & edit benutzt werden kann
  private initForm() {
    if (this.form) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.CarClass = this.courseService.CarClass;
    this.CarTheme = this.courseService.CarTheme;


    // Formularmodell
    this.form = this.formBuilder.group({
      carClassCode: [this.data.carClassCode, Validators.required],
      carThemeCode: [this.data.carThemeCode, Validators.required],
      carInfo: [this.data.car, []], // provided by Type-Ahead empty: null as CarNameSearch
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    // (Teil-) Daten an den "Wizard-Service" übergeben
    this.data.carClassCode = this.frm.carClassCode.value;
    this.data.carThemeCode = this.frm.carThemeCode.value;
    this.data.car = this.frm.carInfo?.value; // || null;

    this.router.navigate(['/course/add/conditions']);
  }

}
