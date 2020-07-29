import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CodeType } from '../_models/code-type';
import { CodeDefinition } from '../_models/domain-codes';
import { shareReplay } from 'rxjs/operators';

// Funktionsweise:
// Services sind per default singletons (privodedIn: root)
// Alle Domains werden von der Datenbank gelesen und in das private Feld codeMap geschrieben
// mit dem Accessor (getCodeDefinition) werden aus dem 'Master' (Map) die Werte/Texte
// in ein eigenes Array kopiert, welches dann mit *ngFor in Templates benutzt werden kann,
// um DropDowns/Options zu füllen und die Auswahl zu vergleichen

// https://stackoverflow.com/questions/49743692/angular-observable-to-array

// ACHTUNG - das Resolver Pattern ist als HACK implementiert ;-)
// Korrekte Funktionsweise => https://dzone.com/articles/understanding-angular-route-resolvers-by-example

// Der Resolver sorgt hier nur dafür, dass der CS im Konstruktur das Observable abonniert (subscribe)

@Injectable({
  providedIn: 'root'
})
export class CodeReaderService {
  private codeMap: CodeType[] = [];
  private codeMap$: Observable<CodeType[]>;

  constructor(private http: HttpClient) {
    this.getCodeMap().subscribe(cm => {
      this.codeMap = cm;
    });
  }

  // get all codes from api - called by resolver
  getCodeMap(): Observable<CodeType[]> {
    /*
    return this.http.post<CodeType[]>(
      `${environment.apiUrl}/listCodeTypes`, null); // no body expected
    */
   if (!this.codeMap$) {
     this.codeMap$ = this.http.post<CodeType[]>(
      `${environment.apiUrl}/listCodeTypes`, null).pipe(shareReplay());
   }
   return this.codeMap$;
  }

  // Accessor - will be removed
  getCodeDefinition(domain: string): CodeDefinition[] {
    if (!this.codeMap) { return null; } // error, not initialized

    const codeDefinition: CodeDefinition[] = [];

    this.codeMap.map(ct => {
      if (ct.type === domain) {
        codeDefinition.push({
          code: ct.value,
          text: ct.text
        });
      }
    });

    // console.log(codeDefinition);

    return codeDefinition;
  }

  getCodeDefinition2(domain: string, codeMap: CodeType[]): CodeDefinition[] {
    if (!codeMap) { return null; } // error, not initialized

    const codeDefinition: CodeDefinition[] = [];

    codeMap.map(ct => {
      if (ct.type === domain) {
        codeDefinition.push({
          code: ct.value,
          text: ct.text
        });
      }
    });

    // console.log(codeDefinition);

    return codeDefinition;
  }

  /*
  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }
  */
}
