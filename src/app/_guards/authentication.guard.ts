import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

// im Modul-Routing definieren (app.routing.ts)
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        // ist schon eingeloggt
        return true;
      }

      // noch nicht eingeloggt: zum login
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

      return false;
  }
}
