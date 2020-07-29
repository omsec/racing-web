import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserRaw } from '../_models/user-raw';
import { User } from '../_models/user';
import { UserFactory } from '../_models/user-factory';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/register`,
      // das erwartete objekt (body) wird gebaut als teilen von User
      {username: user.username, password: user.password, xboxName: user.xBox, discordName: user.discord, languageCode: user.languageCode}).
        pipe(catchError(this.errorHandler));
  }

  existsUser(username: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/existsUser`, { username })
      .pipe(map(response => response.userExists === '1'))
      .pipe(catchError(this.errorHandler));
  }

  // view profile
  getUser(userId: number): Observable<User> {
    return this.http.post<UserRaw>(
      `${environment.apiUrl}/getProfile`, { profileId: userId })
      .pipe(
        retry(3),
        map(userRaw => UserFactory.fromRaw(userRaw)),
        catchError(this.errorHandler)
      );
  }

  // check password "in-app" after login (eg. when changing password)
  verifyPassword(password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/verifyLogin`, { password })
      .pipe(map(response => response.status === 5000))
      .pipe(catchError(this.errorHandler));
  }

  changePassword(newPassword: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/changeLogin`, { password: newPassword })
      .pipe(map(response => response.status  === 'changed'))
      .pipe(catchError(this.errorHandler));
  }

  changeProfile(xBoxName: string, discordName: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/changeProfile`, { xBox: xBoxName, discord: discordName })
      .pipe(map(response => response.status  === 'changed'))
      .pipe(catchError(this.errorHandler));
  }

  setProfilePicture(data) {
    return this.http.post<any>(
      `${environment.apiUrl}/uploadProfilePicture`,
      data,
    );
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }

  getAll(): Observable<User[]> {
    // ToDo: später muss das via Guard und Auth->Rolle abgefangen werden

    // ToDO: Pagination?

    return this.http.post<UserRaw[]>(`${environment.apiUrl}/listUsers`, null)
      .pipe(map(usersRaw => usersRaw.map(user => UserFactory.fromRaw(user)), ));
  }
}
