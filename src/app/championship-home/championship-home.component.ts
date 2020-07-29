import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ChampionshipService, ChampionshipQuery } from '../_services/championship.service';
import { ChampionshipBrowse } from '../_models/championship';
import { CodeDefinition, Game } from '../_models/domain-codes';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'ew-championship-home',
  templateUrl: './championship-home.component.html',
  styleUrls: ['./championship-home.component.css']
})
export class ChampionshipHomeComponent implements OnInit {
  searchFrm: FormGroup;

  championships$: Observable<ChampionshipBrowse[]>;
  search$ = new Subject<ChampionshipQuery>();

  // Codes für Selections/Tags
  Game: CodeDefinition[] = [];

  // pagination
  pageSize = 5;
  page = 1;

  constructor(
    private championshipService: ChampionshipService,
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    /*
    this.championships$ = this.keyUp$.pipe(
      filter(term => (term.length >= 3) || (term.length === 0)),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.championshipService.searchChampionships(searchTerm))
    );*/

    // Codes (Auswahlmöglichkeiten)
    this.Game = this.championshipService.Game;

    // Formular für die Suche (da zwei Felder benötigt)
    this.searchFrm = this.formBuilder.group({
      gameCode: [Game.FH4],
      searchTerm: ['']
    });

    const initialSearch: ChampionshipQuery = {
      gameCode: Game.FH4,
      searchTerm: ''
    };

    this.championships$ = this.search$.pipe(
      filter(srch => (srch.searchTerm.length >= 3) || (srch.searchTerm.length === 0)),
      startWith(initialSearch),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(srch => this.championshipService.searchChampionships(srch as ChampionshipQuery))
    );
  }

  // Form Accessor
  get frm() { return this.searchFrm.controls; }

  // "Adapter" Methode führt die beiden Suchfelder zusammen
  searchHandler() {

    const srch: ChampionshipQuery = {
      gameCode: this.frm.gameCode.value,
      searchTerm: this.frm.searchTerm.value
    };

    this.search$.next(srch);
  }

}
