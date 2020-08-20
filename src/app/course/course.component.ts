import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ResolveStart } from '@angular/router';

import { Course, TrackUsage } from '../_models/course';
import { CourseService } from '../_services/course.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Game, TrackType, Series, CarClass, Terrain, Season, Weather, Role, TrackDifficulty } from '../_models/domain-codes';
import { Lightbox } from 'ngx-lightbox';
import { DataObjectType } from '../_models/generic';
import { Observable } from 'rxjs';

@Component({
  selector: 'ew-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseId: number;
  course: Course;
  trackUsage$: Observable<TrackUsage[]>;

  // CodeTypes: Enums müssen in der Komponente als Variable deklariert werden,
  // damit sie im Template (ohne Formulamodell) benutzt werden können
  // (hier im Sinne einer Konstante)
  GAME = Game;
  TRACKTYPE = TrackType;
  SERIES = Series;
  CARCLASS = CarClass;
  TERRAIN = Terrain;
  SEASON = Season;
  WEATHER = Weather;
  DIFFICULTY = TrackDifficulty;

  // used by comments
  DAO = DataObjectType;
  ROLE = Role;

  public screenshots: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private lightBox: Lightbox,
    public authenticationService: AuthenticationService) { }

  open(index: number): void {
    // open lightbox
    this.lightBox.open(this.screenshots, index);
  }

  close(): void {
    // close lightbox
    this.lightBox.close();
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId; // gemäss app.routing
    this.trackUsage$ = this.courseService.getTrackUsage(this.courseId);

    this.courseService.getSingle(this.courseId).subscribe(res => {
      this.course = res;

      if (this.course.images) {
        for (let i = 0; i <= this.course.images.length; i++) {
          if (this.course.images[i]) {
            const src = this.course?.images[i].imageURL;
            const caption = this.course?.images[i].description;
            const thumb = this.course?.images[i].imageURL;
            const album = {
              src,
              caption,
              thumb
            };

            this.screenshots.push(album);
          }
        }
      }
    });

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
