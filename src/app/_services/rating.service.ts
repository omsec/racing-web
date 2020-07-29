import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { VoteRaw } from '../_models/vote-raw';
import { Vote, VoteAction } from '../_models/vote';
import { VoteFactory } from '../_models/vote-factory';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // wird nicht mehr gebraucht - verschoben in die Hauptobjekte (Championship & Course)
  /*
  getSingle(objectType: string, objectId: number): Observable<RatingInfo> {
    return this.http.post<RatingInfoRaw>(
      `${environment.apiUrl}/getRating`, { itemType: objectType, itemId: objectId})
      .pipe(
        // retry(3),
        map(ratingRaw => RatingFactory.fromRaw(ratingRaw)),
        catchError(this.errorHandler)
      );
  }
*/

  castVote(objectType: string, objectId: number, vote: VoteAction): Observable<any> {

    const voteData = VoteFactory.empty();
    voteData.itemType = objectType;
    voteData.itemId = objectId;
    voteData.userId = this.authenticationService.currentUserValue.userId;
    voteData.vote = vote;

    return this.http.put(
      `${environment.apiUrl}/castVote`,
      voteData,
      { responseType: 'text' }
    ).pipe(catchError(this.errorHandler));
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

}
