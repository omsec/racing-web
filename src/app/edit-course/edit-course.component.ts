import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'ew-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course: Course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // load requested course
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('courseId')),
      switchMap((courseId: string) => this.courseService.getSingle(+courseId)) // convert string to number
    ).subscribe(course => this.course = course);
  }

  // save modification
  updateCourse(course: Course) {
    // console.log(course);
    this.courseService.changeCourse(course).subscribe(() => {
      this.router.navigate(['courses', course.metaInfo.id]);
    });
  }

}
