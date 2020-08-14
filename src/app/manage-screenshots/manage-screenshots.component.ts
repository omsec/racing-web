import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { Image } from '../_models/image';
import { UploadService } from '../_services/upload.service';
import { GenericFactory } from '../_models/generic';

@Component({
  selector: 'ew-manage-screenshots',
  templateUrl: './manage-screenshots.component.html',
  styleUrls: ['./manage-screenshots.component.css']
})
export class ManageScreenshotsComponent implements OnInit {
  objectRef: string; // rat000
  objectType: string;
  objectId: number;

  // page reloading
  // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e

  images$: Observable<Image[]>; // Logik im Template mit AsyncPipe

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private formBuilder: FormBuilder
  ) {
      this.objectRef = this.route.snapshot.params.itemId; // name gemäss app.routing

      this.objectType = this.objectRef.substr(0, 3); // rat
      this.objectId = +this.objectRef.substring(3); // 0000
  }

  init() {
    // initialise controls as needed
  }

  ngOnInit(): void {
    // evtl. (auch) in onRefresh wegen den Änderungen, aber mit PRüfung ob schon vorhanden
    this.images$ = this.uploadService.getAll(this.objectType, this.objectId);
  }

  // https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
  // Refresh this page whenever a file was added or removed
  OnChange() {
    // geht nicht (keine aktion ausgeführt)
    // location.reload();

    const url = '/images/manage';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url, this.objectRef]);
    });
  }

  // remove selected image and reload page
  OnRemove(fileId: number) {
    if (confirm('Delete picture?')) {
      this.uploadService.remove(fileId).subscribe(res => this.OnChange());
    }
  }

  goBack() {
    const url = GenericFactory.getUrl(GenericFactory.fromRaw(this.objectType), this.objectId);
    this.router.navigate([url]);
  }

}
