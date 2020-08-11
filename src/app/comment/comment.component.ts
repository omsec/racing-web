import { Component, OnInit, Input } from '@angular/core';
// import { Router } from '@angular/router';

import { DataObjectType, GenericFactory } from '../_models/generic';
import { Observable } from 'rxjs';
import { UserComment } from '../_models/comment';
import { CommentService } from '../_services/comment.service';
import { RatingService } from '../_services/rating.service';

@Component({
  selector: 'ew-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() ownerType: DataObjectType;
  @Input() ownerId: number;
  @Input() readOnly: true;

  comments$: Observable<UserComment[]>;

  // Status/Modus-Flag für Template
  // (wenn das gedrückt wurde, wird der editor für die ID angezeigt)
  reply = false;
  replyId = 0;

  constructor(
    private commentService: CommentService,
    private ratingService: RatingService) { }

  ngOnInit(): void {
    this.comments$ = this.commentService.getAll(this.ownerType, this.ownerId);
  }

  toggleEditor(commentId: number) {
    // wird beim gleichen/aktuellen Kommentar geklickt, wird der Editor ein/ausgeblendet
    // wird bei einem anderen Kommentar geklickt, wird der Editor immer eingeblendet
    if (commentId === this.replyId) { this.reply = (!this.reply); } else {
      this.reply = true;
    }

    this.replyId = commentId;
  }

  onCommentAdded(): void {
    // reload component (noch nicht ganz elegant, kurzer Sprung nach oben)
   window.location.reload();
  }

  castVote(vote: number) {
    console.log(vote);
    // ToDO: his.type (change casTvote)
    // ToDo: this.id ersetzen mit "cmt Id"
    this.ratingService.castVote('CMT', this.replyId, vote).subscribe(() => { });
  }

}
