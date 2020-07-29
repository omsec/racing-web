import { Component, OnInit, Input } from '@angular/core';

import { ChampionshipBrowse } from '../_models/championship';
import { Series } from '../_models/domain-codes';

@Component({
  selector: 'ew-browse-championship',
  templateUrl: './browse-championship.component.html',
  styleUrls: ['./browse-championship.component.css']
})
export class BrowseChampionshipComponent implements OnInit {
  @Input() cmp: ChampionshipBrowse;

  // CodeType enums
  SERIES = Series;

  constructor() { }

  ngOnInit(): void {
  }

}
