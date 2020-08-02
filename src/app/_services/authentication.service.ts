import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpClientModule im Modul importieren
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment'; // zentrale config
import { UserRaw } from '../_models/user-raw';
import { User } from '../_models/user';
import { UserFactory } from '../_models/user-factory';
import { Role } from '../_models/domain-codes';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
        // falls browser geschlossen wurde, oder page refresh aus localStorage lesen
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // öffentliches Property für User-Infos
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    // der globale interceptor (jwt) hängt halt auch hier das authorization header feld hinzu; macht nichts

    return this.http.post<UserRaw>(
      `${environment.apiUrl}/login`, { username, password } )
      .pipe(map(userRaw => UserFactory.fromRaw(userRaw)))
      .pipe(map(user => {
        // local storage = client persistence (user bleibt eingeloggt)
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        // console.log(user.username);
        return user;
    }));

    // return this.http.post<User>(`${environment.apiUrl}/jwt/test.php`, { username, password });
  }

  logout() {
    // beim token-ansatz braucht der server kein logout; das token läuft einfach ab
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // der ersteller (owner) eines inhalts oder ein administrator darf es verändern/löschen
  canModify(objectCreatorId: number): boolean {
    // lint meldet hier einen falschen fehler: es darf nicht === sein
    // console.log('booh'); // Todo: Warum wird das so oft gerufen?
    return (objectCreatorId == this.currentUserValue.userId) || (this.currentUserValue.roleCode == Role.Administrator);
  }

  // neue einträge können ab stufe 'Member' erstellt werden
  canCreate(): boolean {
    return (this.currentUserValue.roleCode > Role.Guest);
  }

}
