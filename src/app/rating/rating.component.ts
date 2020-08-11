import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VoteAction } from '../_models/vote';

@Component({
  selector: 'ew-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  // const geht hier leider nicht ("import" enum for use in template)
  VOTE_ACTION = VoteAction;

  count = 5;

  // required to display a rating
  @Input() rating = 0;
  @Input() showImmediately: false;

  // additional when used to vote
  @Input() canVote = false; // allow voting
  @Input() upVotes = 0;
  @Input() downVotes = 0;
  @Input() userVote: VoteAction = VoteAction.notVoted;

  // momentan nur zum "durschschleusen"
  // rückgabe an den parent, da es bei comments mehrere gibt
  // die rating/voting komponente wird irgendwann re-designed
  @Input() id = 0;

  @Output() voteEvent = new EventEmitter<number>(); // ToDo: Typisieren

  currentVote = this.userVote; // keep track of state
  stars: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= this.count; i++) {
      this.stars.push(i > this.rating); // einfügen per true/false
    }
    this.currentVote = this.userVote;
  }

  castVote(vote: VoteAction): void {
    // parent component calls API to register vote
    // simply change the counter for the user/session (not synched with API/DB)

    if (vote === this.currentVote) { return; }

    switch (vote) {
      case VoteAction.positive:
        this.upVotes++;
        if (this.currentVote === VoteAction.negative) {
          this.downVotes--;
        }
        break;

      case VoteAction.negative:
        this.downVotes++;
        if (this.currentVote === VoteAction.positive) {
          this.upVotes--;
        }
        break;

      case VoteAction.notVoted:
        if (this.currentVote === VoteAction.positive) { this.upVotes--; }
        if (this.currentVote === VoteAction.negative) { this.downVotes--; }
        break;

      // alternative way which seems less readable
      /*
      case VoteAction.notVoted:
        switch (this.currentVote) {
          case VoteAction.positive:
            this.upVotes--;
            break;
          case VoteAction.negative:
            this.downVotes--;
            break;
        }
        break;
      */
    }

    this.currentVote = vote;
    this.voteEvent.emit(this.currentVote);
  }

}
