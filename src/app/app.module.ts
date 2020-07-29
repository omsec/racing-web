import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ngx chips

// installed with npm
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

// custom/app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationErrorInterceptor } from './_interceptors/authentication-error.interceptor';
import { AuthenticationTokenInterceptor } from './_interceptors/authentication-token.interceptor';
import { TeaserComponent } from './teaser/teaser.component';
import { CourseComponent } from './course/course.component';
import { PreviewComponent } from './preview/preview.component';
import { RatingComponent } from './rating/rating.component';
import { ForzasharePipe } from './_shared/forzashare.pipe';
import { DelayDirective } from './_shared/delay.directive';
import { CourseHomeComponent } from './course-home/course-home.component';
import { EnvPipe } from './_shared/env.pipe';
import { CourseFormComponent } from './course-form/course-form.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { UploadComponent } from './upload/upload.component';
import { ManageScreenshotsComponent } from './manage-screenshots/manage-screenshots.component';
import { ChampionshipComponent } from './championship/championship.component';
import { ChampionshipFormComponent } from './championship-form/championship-form.component';
import { CreateChampionshipComponent } from './create-championship/create-championship.component';
import { ChampionshipHomeComponent } from './championship-home/championship-home.component';
import { BrowseChampionshipComponent } from './browse-championship/browse-championship.component';
import { BrowseCoursesComponent } from './browse-courses/browse-courses.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { PasswordComponent } from './password/password.component';
import { AppToastComponent } from './app-toast/app-toast.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TeaserComponent,
    CourseComponent,
    PreviewComponent,
    RatingComponent,
    ForzasharePipe,
    DelayDirective,
    CourseHomeComponent,
    EnvPipe,
    CourseFormComponent,
    CreateCourseComponent,
    EditCourseComponent,
    UploadComponent,
    ManageScreenshotsComponent,
    ChampionshipComponent,
    ChampionshipFormComponent,
    CreateChampionshipComponent,
    ChampionshipHomeComponent,
    BrowseChampionshipComponent,
    BrowseCoursesComponent,
    UserComponent,
    FooterComponent,
    PasswordComponent,
    AppToastComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    HttpClientModule,
    NgbModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationTokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de-ch'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [PasswordComponent] // für Modal Dialog (ngb)
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
 }
