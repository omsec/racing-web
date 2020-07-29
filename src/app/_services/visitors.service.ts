import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Im app.module importieren
// http://www.eduforbetterment.com/how-to-get-client-ip-address-in-angular-apps/

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(private http: HttpClient) { }

  getIpAddress() {
    return this.http
          .get('https://api.ipify.org/?format=json')
          .pipe(
            catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
