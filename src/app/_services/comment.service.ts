import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserCommentRaw } from '../_models/comment-raw';
import { UserComment } from '../_models/comment';
import { DataObjectType, NewItem } from '../_models/generic';
import { CommentFactory } from '../_models/comment-factory';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAll(daoType: DataObjectType, id: number): Observable<UserComment[]> {
    return this.http.post<UserCommentRaw[]>(
      `${environment.apiUrl}/listComments`, { objectType: daoType, objectId: id} ) // searchString im Body übergeben
      .pipe(
        retry(3),
        map(rawComments => rawComments.map(rawComment => CommentFactory.fromRaw(rawComment)), ),
        catchError(this.errorHandler));
  }


  // todo: antwort typisieren
  addComment(comment: UserComment): Observable<NewItem> {
    return this.http.post<any>(
      `${environment.apiUrl}/addComment`, comment); // alles übergeben oder Objekt besser anpassen?
      // ToDO: Error Handling ?!
      /*.pipe(
        retry(3),
        catchError(this.errorHandler)
      );*/
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

}
