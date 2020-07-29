import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Championship } from '../_models/championship';
import { ChampionshipService } from '../_services/championship.service';
import { RessourceType } from '../_models/ressource-type';
import { RatingService } from '../_services/rating.service';

@Component({
  selector: 'ew-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.css']
})
export class ChampionshipComponent implements OnInit {
  championshipId: number;
  championship$: Observable<Championship>;
  ressourceType = RessourceType.championship; // used for rating-component

  constructor(
    private route: ActivatedRoute,
    private championshipService: ChampionshipService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    this.championshipId = this.route.snapshot.params.championshipId; // name in der route (app routing module) deklariert
    this.championship$ = this.championshipService.getChampionship(this.championshipId);
  }

  castVote(vote: number) {
    // console.log(vote);

    this.ratingService.castVote('CMP', this.championshipId, vote).subscribe(() => {
    });
  }

}
