import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CourseRaw, CourseNameSearchRaw, CourseBrowseRaw } from '../_models/course-raw';
import { Course, CourseNameSearch, CourseBrowse } from '../_models/course';
import { CourseFactory } from '../_models/course-factory';
import { CodeReaderService } from './code-reader.service';
import { CodeDefinition, CodeTypes, Game } from '../_models/domain-codes';

// Standard-Parameters for Searching Courses
export interface CourseQuery {
  gameCode: Game;
  searchMode?: CourseSearchMode;
  searchTerm: string;
}

// search modes specified by services
export enum CourseSearchMode {
  all,
  standard,
  custom
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private codeReader: CodeReaderService) { }

  getSingle(courseId: number): Observable<Course> {
    return this.http.post<CourseRaw>(
      `${environment.apiUrl}/getCourse`, { trackId: courseId}) // courseId im Body übergeben
      .pipe(
        // retry(3), // test: bessere stabilität?
        map(courseRaw => CourseFactory.fromRaw(courseRaw)),
        catchError(this.errorHandler)
      );
  }

  // todo: antwort typisieren
  addCourse(course: Course): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/addCourse`, course); // course im Body übergeben
      // ToDO: Error Handling ?!
      /*.pipe(
        catchError(this.errorHandler)
      );*/
  }

  changeCourse(course: Course): Observable<any> {
    // console.log(course);
    return this.http.put(
      `${environment.apiUrl}/changeCourse`,
      course,
      { responseType: 'text'}
    ).pipe(catchError(this.errorHandler));
  }

  // obsolet: browse war search ohne Term (also alles)
  /*
  browseCourses(): Observable<CourseBrowse[]> {
    return this.http.post<CourseBrowseRaw[]>(
      `${environment.apiUrl}/listCourses`, null) // kein body erwartet (usr aus JWT)
      .pipe(
        retry(3),
        map((coursesRaw => coursesRaw.map(course => CourseFactory.fromRawCourseBrowse(course)))),
        catchError(this.errorHandler)
      );
  }
  */

  // coursehome (browse)
  searchCourses(query: CourseQuery): Observable<CourseBrowse[]> {
    return this.http.post<CourseBrowseRaw[]>(
      `${environment.apiUrl}/searchCourses`, query)
      .pipe(
        retry(3),
        map((coursesRaw => coursesRaw.map(course => CourseFactory.fromRawCourseBrowse(course)))),
        catchError(this.errorHandler)
      );
  }

  // https://stackoverflow.com/questions/13212625/typescript-function-overloading#13212871

  // returns all track types (eg. create championship)
  searchByCourseName(searchString: string): Observable<CourseNameSearch[]> {
    return this.http.post<CourseNameSearchRaw[]>(
      `${environment.apiUrl}/searchCoursesByName`, {
        gameCode: 0,
        searchMode: CourseSearchMode.all,
        searchTerm: searchString
      }) // searchString im Body übergeben
      // .pipe(map(carNameResultsRaw => carNameResultsRaw.map(carNameResultRaw => CarFactory.fromRaw(carNameResultRaw)), ));
      .pipe(
        map(
          courseNameResultsRaw => courseNameResultsRaw.map(
            courseNameResultRaw => CourseFactory.fromRawCourseNameSearch(courseNameResultRaw)
            ),
        ),
        catchError(this.errorHandler)
      );
  }

  // returns standard tracks only (eg. create custom course/blueprint)
  searchStandardCourseByName(searchString: string): Observable<CourseNameSearch[]> {
    return this.http.post<CourseNameSearchRaw[]>(
      `${environment.apiUrl}/searchCoursesByName`, {
        gameCode: 0,
        searchMode: CourseSearchMode.standard,
        searchTerm: searchString
      }) // searchString im Body übergeben
      // .pipe(map(carNameResultsRaw => carNameResultsRaw.map(carNameResultRaw => CarFactory.fromRaw(carNameResultRaw)), ));
      .pipe(
        map(
          courseNameResultsRaw => courseNameResultsRaw.map(
            courseNameResultRaw => CourseFactory.fromRawCourseNameSearch(courseNameResultRaw)
            ),
        ),
        catchError(this.errorHandler)
      );
  }

  // Blueprint = custom Track
  /*
  searchByBlueprintName(searchString: string): Observable<CourseNameSearch[]> {
    return this.http.post<CourseNameSearchRaw[]>(
      `${environment.apiUrl}/searchCoursesByName`, {
        gameCode: 0,
        searchMode: TrackSearchMode.custom,
        searchTerm: searchString
      }) // searchString im Body übergeben
      // .pipe(map(carNameResultsRaw => carNameResultsRaw.map(carNameResultRaw => CarFactory.fromRaw(carNameResultRaw)), ));
      .pipe(
        map(
          courseNameResultsRaw => courseNameResultsRaw.map(
            courseNameResultRaw => CourseFactory.fromRawCourseNameSearch(courseNameResultRaw)
            ),
        ),
        catchError(this.errorHandler)
      );
  }

  */

  removeCourse(trackId: number): Observable<any> {
    // ToDo: Check for CMPs
    return this.http.put(
      `${environment.apiUrl}/removeCourse`,
      { id: trackId },
      { responseType: 'text'}
    ).pipe(catchError(this.errorHandler));
  }

  // Für lokale Fehrlebehandlung (interceptors sind global)
  // ToDo: Console entfernen
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error); // Fehler weitergeben
  }

  // Code Accessors (to be used in Templates/Selections)
  get Game(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Games);
  }

  get Terrain(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Terrain);
  }

  get Difficulty(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.TrackDifficulty);
  }

  get Series(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Series);
  }

  get CarClass(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.CarClass);
  }

  get CarTheme(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.CarTheme);
  }

  get Season(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Season);
  }

  get DayTime(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.DayTime);
  }

  get Weather(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Weather);
  }

  get TimeProgression(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.TimeProgression);
  }

  get Visibility(): CodeDefinition[] {
    return this.codeReader.getCodeDefinition(CodeTypes.Sharing);
  }
}
