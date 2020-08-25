import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';
import { DataObjectType } from '../_models/generic';
import { Voting } from '../_models/voting';
import { VoteAction } from '../_models/vote';
import { VoteFactory } from '../_models/vote-factory';
import { VotingRaw } from '../_models/voting-raw';
import { VotingFactory } from '../_models/voting-factory';


@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getSingle(ownerType: DataObjectType, ownerId: number): Observable<Voting> {
    return this.http.post<VotingRaw>(
      `${environment.apiUrl}/getVoting`, { objectType: ownerType, objectId: ownerId} )
      .pipe(
        retry(3),
        map(votingRaw => VotingFactory.fromRaw(votingRaw)),
        catchError(this.errorHandler)
      );
  }

  registerVote(ownerType: DataObjectType, ownerId: number, vote: VoteAction): Observable<boolean> {

    const voteData = VoteFactory.empty();
    voteData.itemType = ownerType;
    voteData.itemId = ownerId;
    voteData.userId = this.authenticationService.currentUserValue.userId;
    voteData.vote = vote;

    // Service liefert { promoted: boolean } daher <any> als Post-Type und "unsafe" cast in res
    // map macht somit transform
    return this.http.put<any>(
      `${environment.apiUrl}/castVote`,
      voteData).pipe(
        map(res => res.promoted),
        catchError(this.errorHandler));

    /*
    return this.http.put(
      `${environment.apiUrl}/castVote`,
      voteData,
      { responseType: 'text' }
    ).pipe(catchError(this.errorHandler));
    */
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    // console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

}
