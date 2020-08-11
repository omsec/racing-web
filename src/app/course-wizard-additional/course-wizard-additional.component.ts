import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CourseWizardService } from '../_services/course-wizard.service';
import { Additional } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'ew-course-wizard-additional',
  templateUrl: './course-wizard-additional.component.html',
  styleUrls: ['./course-wizard-additional.component.css']
})
export class CourseWizardAdditionalComponent implements OnInit {
  form: FormGroup;
  data: Additional;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  TimeProgression: CodeTypes.CodeDefinition[] = [];

  constructor(
    private courseWizardService: CourseWizardService,
    private courseService: CourseService, // für Codes
    private formBuilder: FormBuilder,
    private router: Router) {
      this.data = courseWizardService.additional;
  }


  ngOnInit(): void {
    this.initForm();
  }

  // damit das Formular für add & edit benutzt werden kann
  private initForm() {
    if (this.form) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.TimeProgression = this.courseService.TimeProgression;

    // Formularmodell
    this.form = this.formBuilder.group({
      laps: [this.data.laps, [Validators.required, Validators.min(1), Validators.max(50)]],
      timeProgressionCode: [this.data.timeProgressionCode, Validators.required],
      distanceKM: [this.data.distanceKM]
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    // (Teil-) Daten an den "Wizard-Service" übergeben
    this.data.laps = this.frm.laps.value;
    this.data.timeProgressionCode = this.frm.timeProgressionCode.value;
    this.data.distanceKM = this.frm.distanceKM.value;

    // finish: save item
    this.courseWizardService.finish().pipe(
      take(1)
      ).subscribe((courseId) => {
        this.router.navigate(['courses', courseId.id]);
        this.courseWizardService.reset(); // clear form AFTER it's saved :-)
      });

    // Zwischenlösung: ToDo: Auf neue Strecke navigieren
    // this.router.navigate(['/home']);
  }

}
