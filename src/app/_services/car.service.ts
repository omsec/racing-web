import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CarNameSearchRaw } from '../_models/car-raw';
import { CarNameSearch } from '../_models/car';
import { CarFactory } from '../_models/car-factory';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  searchByCarName(searchString: string): Observable<CarNameSearch[]> {
    return this.http.post<CarNameSearchRaw[]>(
      `${environment.apiUrl}/searchCarsByName`, { gameCode: 0, searchTerm: searchString}) // searchString im Body übergeben
      // .pipe(map(carNameResultsRaw => carNameResultsRaw.map(carNameResultRaw => CarFactory.fromRaw(carNameResultRaw)), ));
      .pipe(
        retry(3),
        map(carNameResultsRaw => carNameResultsRaw.map(carNameResultRaw => CarFactory.fromRaw(carNameResultRaw)), ),
        catchError(this.errorHandler));
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }
}
