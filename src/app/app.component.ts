import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'ew-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  title = 'racing'; // wozu ist das? ;-)

  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      // angemeldeter user "überwachen" (topic)
      this.authenticationService.currentUser$.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
  }

  // methode für menü
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
