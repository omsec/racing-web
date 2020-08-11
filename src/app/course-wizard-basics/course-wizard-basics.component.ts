import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CourseWizardService } from '../_services/course-wizard.service';
import { Basics } from '../_models/course-wizard';
import * as CodeTypes from '../_models/domain-codes';
import { CourseService } from '../_services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ew-course-wizard-basics',
  templateUrl: './course-wizard-basics.component.html',
  styleUrls: ['./course-wizard-basics.component.css']
})
export class CourseWizardBasicsComponent implements OnInit {
  form: FormGroup;
  data: Basics;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  // Codes für Selections/Tags
  Game: CodeTypes.CodeDefinition[] = [];

  constructor(
    private courseWizardService: CourseWizardService,
    private courseService: CourseService, // für Codes
    private formBuilder: FormBuilder,
    private router: Router) {
    this.data = courseWizardService.basics;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    if (this.form) { return; }

    // Codes (Auswahlmöglichkeiten)
    this.Game = this.courseService.Game;

    // Formularmodell
    this.form = this.formBuilder.group({
      gameCode: [this.data.gameCode, Validators.required],
      courseName: [this.data.name, Validators.required],
      sharingCode: [this.data.sharingCode, [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
      description: ['']
      // ToDo: VisibilityCode (=> metaInfo) -> eigener step am schluss
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    // (Teil-) Daten an den "Wizard-Service" übergeben
    this.data.gameCode = this.frm.gameCode.value;
    this.data.name = this.frm.courseName.value;
    this.data.sharingCode = this.frm.sharingCode.value;
    this.data.description = this.frm.description.value;

    // proceed to next step
    this.router.navigate(['/course/add/blueprint']);
  }

}
