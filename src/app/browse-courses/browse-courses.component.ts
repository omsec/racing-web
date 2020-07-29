import { Component, OnInit, Input } from '@angular/core';

import { CourseBrowse } from '../_models/course';
import { Series, CarClass, TrackDifficulty } from '../_models/domain-codes';

@Component({
  selector: 'ew-browse-courses',
  templateUrl: './browse-courses.component.html',
  styleUrls: ['./browse-courses.component.css']
})
export class BrowseCoursesComponent implements OnInit {
  @Input() course: CourseBrowse;

  // CodeType enums
  SERIES = Series;
  CARCLASS = CarClass;
  DIFFICULTY = TrackDifficulty;

  constructor() { }

  ngOnInit(): void {
  }

}
