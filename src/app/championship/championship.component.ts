import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Championship } from '../_models/championship';
import { ChampionshipService } from '../_services/championship.service';
import { DataObjectType } from '../_models/generic';
import { Role } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { CarClass, Series } from '../_models/domain-codes';

@Component({
  selector: 'ew-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.css']
})
export class ChampionshipComponent implements OnInit {
  championshipId: number;
  championship$: Observable<Championship>;

  // const für Template
  DAO = DataObjectType;
  ROLE = Role;

  SERIES = Series;
  CARCLASS = CarClass;

  constructor(
    private route: ActivatedRoute,
    private championshipService: ChampionshipService,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.championshipId = this.route.snapshot.params.championshipId; // name in der route (app routing module) deklariert
    this.championship$ = this.championshipService.getChampionship(this.championshipId);
  }

  /*
  castVote(vote: number) {
    // console.log(vote);

    this.ratingService.castVote('CMP', this.championshipId, vote).subscribe(() => {
    });
  }
*/
}
