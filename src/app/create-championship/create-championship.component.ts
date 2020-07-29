import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Championship } from '../_models/championship';
import { Race } from '../_models/race';
// there is no "RaceService" it's all in ChampionshipService (composition)
import { ChampionshipService } from '../_services/championship.service';

@Component({
  selector: 'ew-create-championship',
  templateUrl: './create-championship.component.html',
  styleUrls: ['./create-championship.component.css']
})
export class CreateChampionshipComponent implements OnInit {

  constructor(
    private championshipService: ChampionshipService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // eventData = { championship: newChampionship, races: newRaces};
  createChampionship(eventData: any) {

    const championship: Championship = eventData.championship;
    const races: Race[] = eventData.races;

    let newChampionshipId = -1;

    this.championshipService.addChampionship(championship).subscribe(championshipId => {
      newChampionshipId = championshipId.id;

      // update championship ID for all races
      for (const race of races) {
        race.championshipId = newChampionshipId;
      }

      // add all races at once
      this.championshipService.addRaces(races).subscribe(raceIDs => {
        // console.log(raceIDs);
        this.router.navigate(['championships', newChampionshipId]);
      });
    });
  }
}
