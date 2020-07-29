import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'ew-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  // methode für click
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
