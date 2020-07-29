import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ContentRaw } from '../_models/content-raw';
import { Content } from '../_models/content';
import { ContentFactory } from '../_models/content-factory';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Content[]> {
    return this.http.post<ContentRaw[]>(
      `${environment.apiUrl}/listContent`, null) // kein body erwartet
      .pipe(
        retry(3),
        map((contentsRaw => contentsRaw.map(content => ContentFactory.fromRaw(content)))),
        catchError(this.errorHandler)
      );
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

}
