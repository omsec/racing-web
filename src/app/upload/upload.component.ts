import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UploadService } from '../_services/upload.service';

@Component({
  selector: 'ew-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    @Input() objectType: string;
    @Input() objectId: number;
    @Output() uploadedEvent = new EventEmitter<any>();

    uploadForm: FormGroup;
    uploadResponse;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) { }

    // Hilfsmethode für einfacheren Zugriff auf die Controls
    get uploadFrm() { return this.uploadForm.controls; }

  ngOnInit(): void {
    this.objectType = this.objectType.toUpperCase();
    this.uploadForm = this.formBuilder.group({
      screenshot: [''],
      description: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadFrm.screenshot.setValue(file);
    }
  }

  onSubmit() {
    if (!this.uploadFrm.screenshot.value) { return; }

    const formData = new FormData();
    formData.append('fileName', this.uploadFrm.screenshot.value);
    formData.append('objectType', this.objectType); // table prefix
    formData.append('objectId', this.objectId.toString());
    formData.append('description', this.uploadFrm.description.value);

    this.uploadService.uploadFile(formData).subscribe(
      // ToDO: überlegen..
      (res) => {
        this.uploadResponse = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    // tell parent component (manage-screnshots) that a file was added
    this.uploadedEvent.emit();
  }

}
