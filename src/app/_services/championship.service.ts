import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Championship, ChampionshipBrowse } from '../_models/championship';
import { Race } from '../_models/race';
import { CodeReaderService } from './code-reader.service';
import { CodeDefinition, CodeTypes, Game } from '../_models/domain-codes';
import { ChampionshipFactory } from '../_models/championship-factory';
import { ChampionshipRaw, ChampionshipBrowseRaw } from '../_models/championship-raw';

// Standard-Parameters for Searching Courses
export interface ChampionshipQuery {
  gameCode: Game;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  constructor(
    private http: HttpClient,
    private codeReader: CodeReaderService
  ) { }

  // todo: antwort typisieren
  addChampionship(championship: Championship): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/addChampionship`, championship);
      // ToDO: Error Handling ?!
      /*.pipe(
        catchError(this.errorHandler)
      );*/
  }

  // returns array of IDs - currently ignored (not needed)
  addRaces(races: Race[]): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/addRaces`, races);
      // ToDO: Error Handling ?!
      /*.pipe(
        catchError(this.errorHandler)
      );*/
  }

  getChampionship(id: number): Observable<Championship> {
    return this.http.post<ChampionshipRaw>(
      `${environment.apiUrl}/getChampionship`, { championshipId: id })
        .pipe(
          retry(3),
          map(championshipRaw => ChampionshipFactory.fromRaw(championshipRaw)),
          catchError(this.errorHandler)
      );
  }

  // NOT used for pagination of 'browse'
  /*
  countChampionships(): Observable<number> {
    return this.http.post<CountInfo>(
      `${environment.apiUrl}/countChampionships`, null)
      .pipe(
        retry(3),
        map(count => count.count),
        catchError(this.errorHandler)
    );
  }
  */

  // REPLACED with search
  /*
  browseChampionships(): Observable<ChampionshipBrowse[]> {
    return this.http.post<ChampionshipBrowseRaw[]>(
      `${environment.apiUrl}/listChampionships`, null) // kein body erwartet (usr aus JWT)
      .pipe(
        retry(3),
        map((championshipsRaw => championshipsRaw.map(cmp => ChampionshipFactory.fromRawChampionshipBrowse(cmp)))),
        catchError(this.errorHandler)
      );
  }
  */

  searchChampionships(query: ChampionshipQuery): Observable<ChampionshipBrowse[]> {
    return this.http.post<ChampionshipBrowseRaw[]>(
      `${environment.apiUrl}/searchChampionships`, query)
      .pipe(
        retry(3),
        map((championshipsRaw => championshipsRaw.map(cmp => ChampionshipFactory.fromRawChampionshipBrowse(cmp)))),
        catchError(this.errorHandler)
      );
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

  // Code Accessors (to be used in Templates/Selections)
  get Game(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Games);
  }

  get Series(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Series);
  }

  get CarTheme(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.CarTheme);
  }

  get CarClass(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.CarClass);
  }
}
