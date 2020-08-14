import { Component, OnInit, Input } from '@angular/core';

import { DataObjectType } from '../_models/generic';
import { Voting } from '../_models/voting';
import { VoteAction } from '../_models/vote';
import { VotingService } from '../_services/voting.service';

@Component({
  selector: 'ew-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  @Input() ownerType: DataObjectType;
  @Input() ownerId: number;

  voting: Voting;
  // keep track of current (local) state
  currentVote: VoteAction;

  // "const" für's Template
  VOTE_ACTION = VoteAction;

  constructor(private votingService: VotingService) { }

  ngOnInit(): void {
    this.votingService.getSingle(this.ownerType, this.ownerId).subscribe(
      // auf diese Weise wird im Fehlerfall nur die Voting-Komponente nicht geladen
      // und der Rest der Seite angezeigt
      res => {
        this.voting = res;
        this.currentVote = this.voting.userVote;
      },
      err => { console.log(err); } // set flag
    );
  }

  castVote(vote: VoteAction): void {
    // simply change the counter for the user/session (not synched with API/DB)

    // es muss eben doch == sein, und nicht === obwohl tslink dies bemängelt -> warnung an diesn Stellen deaktiviert
    // tslint:disable-next-line
    if (vote == this.currentVote) { return; }
    switch (vote) {
      case VoteAction.positive:
        this.voting.upVotes++;
        // tslint:disable-next-line
        if (this.currentVote == VoteAction.negative) {
          this.voting.downVotes--;
        }
        break;

      case VoteAction.negative:
        this.voting.downVotes++;
        // tslint:disable-next-line
        if (this.currentVote == VoteAction.positive) {
          this.voting.upVotes--;
        }
        break;

      case VoteAction.notVoted:
        if (this.currentVote == VoteAction.positive) { this.voting.upVotes--; } // tslint:disable-line
        if (this.currentVote == VoteAction.negative) { this.voting.downVotes--; } // tslint:disable-line
        break;
    }

      // alternative way which seems less readable
      /*
      case VoteAction.notVoted:
        switch (this.currentVote) {
          case VoteAction.positive:
            this.voting.upVotes--;
            break;
          case VoteAction.negative:
            this.voting.downVotes--;
            break;
        }
        break;
      */

    // kein content/response vom service (nur status)
    this.votingService.registerVote(this.ownerType, this.ownerId, vote).subscribe();

    // der lokale Status wird hier ausserhalb vom Observable gesetzt, damit der Screen auf jeden Fall & sofort stimmt :-)
    this.currentVote = vote;

    /*
    this.votingService.castVote(this.ownerType, this.ownerId, vote).subscribe(

      () => { this.currentVote = vote; },
      err => { console.log(err); } // set flag
    );
      */
  }
}
