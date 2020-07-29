import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'ew-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: number;
  user$: Observable<User>;

  edit = false;
  profileAlbum: Array<any> = [];

  // dynamic info text - dazu müsste das Observable hier ausgepackt werden
  // userInfo = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.profileId; // gemäss app.routing
    this.user$ = this.userService.getUser(this.userId);
  }

  // added [entryComponents] to app.module.ts
  showChangePasswordDlg() {

    this.edit = false; // [Edit User] Component muss geschlossen sein für den Modal Dialog (sonst falscher Parent)

    const modalRef = this.modalService.open(PasswordComponent);
    // benötigt, um im Formular (onSubmit) zu reagieren; entspricht Instanz/Handle ID
    // https://stackoverflow.com/questions/57269736/i-cannot-submit-angular-reactive-form-in-a-ngb-modal-angular-7
    modalRef.componentInstance.name = 'changePWD';
  }

  // ToDo: remove/replace (pipe?)
  lastSeen(ts: Date): string {
    const now = new Date();

    let mins = (ts.getTime() - now.getTime() / 1000);
    mins /= 60;
    mins = Math.abs(Math.round(mins));

    let str = 'Last seen ';
    if (mins < 60) { str = str + mins + ' minutes ago'; }
    if (mins >= 60 && mins < 600) { str = str + mins / 10 + ' houres ago'; } else {
      str = str + ts.toString;
     }
    return 'woof';
  }

}
