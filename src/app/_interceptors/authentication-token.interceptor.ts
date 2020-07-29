import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';

// Provider im Module registrieren
@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
                // sollte eigentlich in einen eigenen Interceptor (falls noch weiter dazukommen)
                // must be allowed in .htaccess
                Language: currentUser.languageCode.toString()
            }
        });
    }

    return next.handle(request);
  }
}
