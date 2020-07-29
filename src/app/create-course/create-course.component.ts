import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'ew-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createCourse(course: Course) {
    this.courseService.addCourse(course).subscribe(courseId => {
      this.router.navigate(['courses', courseId.id]);
      // console.log(courseId.id);
    });
  }

}
