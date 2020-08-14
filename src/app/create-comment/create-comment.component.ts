import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataObjectType } from '../_models/generic';
import { CommentService } from '../_services/comment.service';
import { CommentFactory } from '../_models/comment-factory';
import { CommentStatus } from '../_models/domain-codes';

@Component({
  selector: 'ew-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input() ownerType: DataObjectType;
  @Input() ownerId: number;
  @Input() parentId: number;
  @Input() small: false;
  @Output() commentAdded = new EventEmitter();
  // output event für reload vom parent? (innerhalb obs, wie upload)
  form: FormGroup;

  // Status & Modus für Template
  loading = false;
  submitted = false;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // flexibler als direkt im ngOnInit
  private initForm() {
    if (this.form) { return; }

    // Formularmodell
    this.form = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  // Form Controls Accessor
  get frm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // Falls das Formular ungültig ist, abbrechen
    if (this.form.invalid) { return; }

    const newComment = CommentFactory.empty(this.ownerType, this.ownerId);

    newComment.parentId = this.parentId;
    newComment.statusCode = CommentStatus.pending;
    newComment.commentText = this.frm.comment.value;

    this.commentService.addComment(newComment).subscribe(
      (res) => {
        this.commentAdded.emit(null);
        this.frm.comment.setValue('');
      },
      (err) => {
        // set flag
        // console.log(err);
      });
  }

}
