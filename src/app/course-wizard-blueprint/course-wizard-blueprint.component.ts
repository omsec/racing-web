import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

import { CourseWizardService } from '../_services/course-wizard.service';
import { Blueprint } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';
import { CourseNameSearch } from '../_models/course';

@Component({
  selector: 'ew-course-wizard-blueprint',
  templateUrl: './course-wizard-blueprint.component.html',
  styleUrls: ['./course-wizard-blueprint.component.css']
})
export class CourseWizardBlueprintComponent implements OnInit, OnChanges {
  form: FormGroup;
  data: Blueprint;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  Terrain: CodeTypes.CodeDefinition[] = [];
  Series: CodeTypes.CodeDefinition[] = [];
  Difficulty: CodeTypes.CodeDefinition[] = [];

  constructor(
    private courseWizardService: CourseWizardService,
    private courseService: CourseService, // für Codes
    private formBuilder: FormBuilder,
    private router: Router) {
    this.data = courseWizardService.blueprint;
   }

  // Type-ahead handling
  // https://ng-bootstrap.github.io/#/components/typeahead/examples
  // Flags für GUI-Status
  searching = false; // currently not used
  searchFailed = false;

  // formatiert die liste/input
  formatCourseMatches = (value: CourseNameSearch) => value.trackName;

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
  }

  ngOnInit(): void {
    this.initForm();
  }

  // damit das Formular für add & edit benutzt werden kann
  private initForm() {
    if (this.form) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.Terrain = this.courseService.Terrain;
    this.Series = this.courseService.Series;
    this.Difficulty = this.courseService.Difficulty;

    // Formularmodell
    this.form = this.formBuilder.group({
      routeInfo: [this.data.startingPoint, Validators.required], // provided by Type-Ahead; // ToDo: Validierung geht nicht; Custom nötig?
      terrainCodes: [null, Validators.required], // ToDO: Initialization?
      seriesCode: [this.data.seriesCode, Validators.required],
      difficultyCode: [this.data.difficultyCode, Validators.required]
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    // (Teil-) Daten an den "Wizard-Service" übergeben
    this.data.startingPoint = this.frm.routeInfo?.value || null;

    this.data.terrain = this.frm.terrainCodes.value.map(selection => {
      return {
        code: selection.code,
        text: selection.text
      };
    });
    this.data.seriesCode = this.frm.seriesCode.value;
    this.data.difficultyCode = this.frm.difficultyCode.value;

    // proceed to next step
    this.router.navigate(['/course/add/restrictions']);
  }

}
