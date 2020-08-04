import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CourseWizardService } from '../_services/course-wizard.service';
import {Conditions } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'ew-course-wizard-conditions',
  templateUrl: './course-wizard-conditions.component.html',
  styleUrls: ['./course-wizard-conditions.component.css']
})
export class CourseWizardConditionsComponent implements OnInit {
  form: FormGroup;
  data: Conditions;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  Season: CodeTypes.CodeDefinition[] = [];
  DayTime: CodeTypes.CodeDefinition[] = [];
  Weather: CodeTypes.CodeDefinition[] = [];

  constructor(
    private courseWizardService: CourseWizardService,
    private courseService: CourseService, // für Codes
    private formBuilder: FormBuilder,
    private router: Router) {
      this.data = courseWizardService.conditions;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // damit das Formular für add & edit benutzt werden kann
  private initForm() {
    if (this.form) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.Season = this.courseService.Season;
    this.DayTime = this.courseService.DayTime;
    this.Weather = this.courseService.Weather;

    // Formularmodell
    this.form = this.formBuilder.group({
      seasonCode: [this.data.seasonCode, Validators.required],
      daytimeCode: [this.data.daytimeCode, Validators.required],
      weatherCode: [this.data.weatherCode, Validators.required],
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    // (Teil-) Daten an den "Wizard-Service" übergeben
    this.data.seasonCode = this.frm.seasonCode.value;
    this.data.daytimeCode = this.frm.daytimeCode.value;
    this.data.weatherCode = this.frm.weatherCode.value;

    // proceed to next step
    this.router.navigate(['/course/add/additional']);
  }

}
