import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, concatMap, switchMap } from 'rxjs/operators';

import { CustomValidators } from '../_shared/custom-validators';
// import { VerifyPasswordValidatorService } from '../_services/verify-password-validator.service';
import { UserService } from '../_services/user.service';
import { AppToastService } from '../_services/app-toast.service';

@Component({
  selector: 'ew-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() name; // Vermutlich nciht gebraucht, von Demo
  pwdForm: FormGroup;

  // Status-Variablen für das Template
  submitted = false;
  loading = false;
  error = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    // private verifyPasswordValidator: VerifyPasswordValidatorService
    private userService: UserService,
    public toastService: AppToastService
  ) { }

  ngOnInit(): void {
    // Formularmodell
    this.pwdForm = this.formBuilder.group({
      currentPwd: ['', [Validators.required]/*, [this.verifyPasswordValidator]*/],
      newPwd: ['', Validators.compose([
        // same rules as register.component(!)
        Validators.required,
        Validators.minLength(8)
      ])],
      confirmPwd: ['', Validators.required]
    },
    {
      // Password must match confirmation
      validator: CustomValidators.mustMatch('newPwd', 'confirmPwd')
    });
  }

  // Form Accessor
  get frm() { return this.pwdForm.controls; }

  onSubmit(modal: NgbModal) {
    this.submitted = true;

    // cancel if form is invalid
    if (this.pwdForm.invalid) { return; }

    this.loading = true;

    /*
    this.userService.changePassword(this.frm.newPwd.value).subscribe(pwdChanged => {
      if (pwdChanged === true) {
        console.log('SUCCESS');
      } else {
        console.log('ERROR');
      }
    });
    */

    this.userService.verifyPassword(this.frm.currentPwd.value).pipe(
      filter(isCorrect => (isCorrect === true)), // filter for correct entry of current passwort
      switchMap(() => this.userService.changePassword(this.frm.newPwd.value)) // if so (boolean input not required) return changePwd
    ).subscribe(pwdChanged => {
        // console.log(pwdChanged);
        this.activeModal.close(pwdChanged); // return service result (true)
        this.toastService.show('Password changed successfully', { classname: 'bg-success text-light', delay: 2000});
    },
    error => {
      console.log(error);
      this.error = true;
    });
  }

}
