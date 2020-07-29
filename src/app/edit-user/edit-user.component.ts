import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ew-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;

  @Input() xBox: string;
  @Output() xBoxChange = new EventEmitter<string>();
  @Input() discord: string;
  @Output() discordChange = new EventEmitter<string>();
  @Input() profilePicture: string;
  @Output() profilePictureChange = new EventEmitter<string>();

  // Status (Template)
  loading = false;
  error = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Formularmodell
    this.userForm = this.formBuilder.group({
      xBox: [this.xBox],
      discord: [this.discord],
      profilePicture: ['']
    });
  }

  // Form Accessor
  get frm() { return this.userForm.controls; }

  onSubmit() {
    this.loading = true;

    // something was changed
    if ((this.xBox !== this.frm.xBox.value) || (this.discord !== this.frm.discord.value)) {
      this.userService.changeProfile(this.frm.xBox.value, this.frm.discord.value).subscribe(() => {
        this.xBoxChange.emit(this.frm.xBox.value);
        this.discordChange.emit(this.frm.discord.value);
      });
    }

    // file was selected, upload it
    if (this.frm.profilePicture.value !== '') {
      const formData = new FormData();
      formData.append('fileName', this.frm.profilePicture.value);

      this.userService.setProfilePicture(formData).subscribe(
        (res) => {
          // this.uploadResponse = res;
          // console.log(res);
          this.profilePictureChange.emit(`${environment.appUrl}${res.url}`);
        },
        (err) => {
          this.error = true;
          // console.log(err);
        }
      );
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.frm.profilePicture.setValue(file);
    }
  }

}
