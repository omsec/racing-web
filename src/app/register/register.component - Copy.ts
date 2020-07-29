import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../_models/user';

@Component({
  selector: 'ew-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerGrp: FormGroup;
  // nachlesen ;-)
  @Input() user: User;
  @Output() submitUser = new EventEmitter<User>();

  // Status-Variablen
  loading = false;
  submitted = false; // zur Steuerung im Tmplate

  error: string;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  private initForm() {
    if (this.registerGrp) { return; }

    // Formularmodell bauen
    // ToDO: Cst Validator
    this.registerGrp = this.formBuilder.group({
      username: ['', Validators.required, Validators.email],
      accepted: [false, Validators.requiredTrue],
      confirmPassword: ['', Validators.requiredTrue]
    });
  }

  private setFormValues(user: User) {
    this.registerGrp.patchValue(user);
  }

  // Hilfsmethode für einfacheren Zugriff auf die Controls im HTML-Template
  get registerFrm() { return this.registerGrp.controls; }

  // ToDo:
  // Event Handler für das Formular


  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.user);
  }

  submitForm() {
    const formValue = this.registerGrp.value;

    const newUser: User = {
      ...formValue
      // mögliche overrids hier
    }

    this.submitUser.emit(newUser);
    // reset,login oder  navigate
  }

}
