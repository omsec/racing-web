import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

import { CourseBrowse } from '../_models/course';
import { CourseService, CourseQuery, CourseSearchMode } from '../_services/course.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CodeDefinition, Game } from '../_models/domain-codes';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'ew-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css']
})
export class CourseHomeComponent implements OnInit {
  searchFrm: FormGroup;
  courses$: Observable<CourseBrowse[]>;
  // search$ = new Subject<string>();
  search$ = new Subject<CourseQuery>();

  // Codes für Selections/Tags
  Game: CodeDefinition[] = [];

  // pagination
  pageSize = 5;
  page = 1;

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.keyUp$.subscribe(evt => console.log(evt));

    /*
    this.courses$ = this.search$.pipe(
      filter(term => (term.length >= 3) || (term.length === 0)),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.courseService.searchCourses(searchTerm))
    );
    */

    // Codes (Auswahlmöglichkeiten)
    this.Game = this.courseService.Game;

    // Formular für die Suche (Read für Game-Code; imm FH4)
    this.searchFrm = this.formBuilder.group({
      gameCode: [Game.FH4],
      searchTerm: ['']
    });

    const initialSearch: CourseQuery = {
      gameCode: Game.FH4,
      searchMode: CourseSearchMode.custom,
      searchTerm: ''
    };

    this.courses$ = this.search$.pipe(
      filter(srch => (srch.searchTerm.length >= 3) || (srch.searchTerm.length === 0)),
      startWith(initialSearch),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(srch => this.courseService.searchCourses(srch as CourseQuery))
    );
  }

  // Helper
  get frm() { return this.searchFrm.controls; }

  // "Adapter" Methode führt die beiden Suchfelder zusammen
  searchHandler() {

    const srch: CourseQuery = {
      gameCode: this.frm.gameCode.value,
      searchMode: CourseSearchMode.custom,
      searchTerm: this.frm.searchTerm.value
    };

    // console.log(this.frm.gameCode.value);
    // console.log(srch);
    this.search$.next(srch);
  }
}
