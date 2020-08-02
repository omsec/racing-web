import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';
import { RatingService } from '../_services/rating.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Game, TrackType, Series, CarClass, Terrain } from '../_models/domain-codes';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'ew-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseId: number;
  course$: Observable<Course>;
  // asTest = this.authenticationService;

  // CodeTypes: Enums müssen in der Komponente als Variable deklariert werden,
  // damit sie im Template (ohne Formulamodell) benutzt werden können
  // (hier im Sinne einer Konstante)
  GAME = Game;
  TRACKTYPE = TrackType;
  SERIES = Series;
  CARCLASS = CarClass;
  TERRAIN = Terrain;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private ratingService: RatingService,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId; // gemäss app.routing
    this.course$ = this.courseService.getSingle(this.courseId);
  }

  castVote(vote: number) {
    // console.log(vote);
    this.ratingService.castVote('RAT', this.courseId, vote).subscribe(() => { });
  }

  deleteCourse(courseId: number) {
    // console.log(courseId);
    if (confirm('Do you really want to delete this Blueprint?')) {
      this.courseService.removeCourse(courseId).subscribe(
        // ToDo: go back to previous page
        res => this.router.navigate(['/home'])
      );
    }
  }

}
