import { Injectable } from '@angular/core';
import { FormControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs'; import { map, catchError } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyPasswordValidatorService implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: FormControl): Observable<ValidationErrors | null> {
    return this.userService.verifyPassword(control.value)
      .pipe(map(status => (status === true) ? null : {
        passwordCorrect: { valid: false }
      }),
      catchError(() => of(null))
      );
    }
}
