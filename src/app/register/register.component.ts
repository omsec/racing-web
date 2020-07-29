import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Role, Language } from '../_models/user';
import { UserService } from '../_services/user.service';
import { CustomValidators } from '../_shared/custom-validators';
import { UserExistsValidatorService } from '../_services/user-exists-validator.service';

// https://codinglatte.com/posts/angular/how-to-add-async-validators-to-an-angular-reactive-form/

@Component({
  selector: 'ew-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerGrp: FormGroup;


  // Status-Variablen
  loading = false;
  submitted = false; // zur Steuerung im Template

  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userExistsValidator: UserExistsValidatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Formularmodell bauen
    this.registerGrp = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email], [this.userExistsValidator]],
      password: ['', Validators.compose([
        // 1. Password Field is required
        Validators.required,
/*
        // 2. check whether the entered password contains a number
        CustomValidators.pattern(/\d/, { hasNumber: true }),
        // 3. check for uppercase letters
        CustomValidators.pattern(/[A-Z]/, { hasCapitalCase: true}),
        // 4. check for lower-case letters
        CustomValidators.pattern(/[a-z]/, { hasSmallCase: true }),
        // 5. check for special characters
        CustomValidators.pattern(/[@#$\^%&äöüÄÖÜ]/, { hasSpecialCharacters: true}),
*/
        // 6. Password minimum length is 8 characters
        Validators.minLength(8)
      ])],
      // Confirm-Feld müsste eigentlich nicht auf required geprüft werden
      // confirmPassword: [''],
      confirmPassword: ['', Validators.required],
      xboxName: [''],
      discordName: [''],
      accepted: [false, Validators.requiredTrue]
    },
    {
      // Password must match confirmation
      validator: CustomValidators.mustMatch('password', 'confirmPassword')
    });
  }

  // Hilfsmethode für einfacheren Zugriff auf die Controls im HTML-Template
  get registerFrm() { return this.registerGrp.controls; }

  // Event Handler für das Formular
  onSubmit() {
    this.submitted = true;

    // this.userService.existsUser(this.registerGrp.controls.username.value).subscribe(exists => { console.log(exists); });
    // console.log(this.registerGrp.invalid);

    // Falls das Formular ungültig ist, abbrechen
    if (this.registerGrp.invalid) { return; }

    this.loading = true;

    // User-Objekt wird on-the-fly gebaut; nicht alle Felder werden vom Service genutzt
    // ToDo: Mit Factory Empty machen
    this.userService.register({
      userId: -1,
      username: this.registerFrm.username.value,
      password: this.registerFrm.password.value,
      loginActive: true,
      roleCode: Role.Guest,
      roleText: '',
      languageCode: Language.English, // momentan nicht abgefragt
      languageText: '',
      xBox: this.registerFrm.xboxName.value,
      discord: this.registerFrm.discordName.value,
      profilePictureUrl: ''})
        .subscribe(
          () => {
            // erfolg: login/home
            // erstmal login-step durchführen
            // später umbau mit einer methode "doLogin"
            this.router.navigate(['/login']);
          },
          error => {
            this.error = error; // im template über ngIf angezeigt
            this.loading = false;
          }
        );
  }

}
