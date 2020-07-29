import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { CourseComponent } from './course/course.component';
import { CourseHomeComponent } from './course-home/course-home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ManageScreenshotsComponent } from './manage-screenshots/manage-screenshots.component';
import { ChampionshipComponent } from './championship/championship.component';
import { CreateChampionshipComponent } from './create-championship/create-championship.component';
import { CodeResolverService } from './_services/code-resolver.service';
import { ChampionshipHomeComponent } from './championship-home/championship-home.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // während früher entwicklung auf /login
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'course',
    component: CourseHomeComponent,
    resolve: { codes: CodeResolverService },
    canActivate: [AuthenticationGuard]
    // children nützen hier nichts, denn die brauchen im parent ein router-outlet und werden 'embedded'
    // dafür sollte /course entweder vor einer leeren Komponente behandelt werden (mit diesem router-outlet)
    // oder eine forwarding rule definiert wrden (eleganter) auf /add oder /edit...
    // hier nicht nötig, da ein "portal" vorgesehen ist
  },
  {
    path: 'course/add',
    component: CreateCourseComponent,
    resolve: { codes: CodeResolverService},
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'course/edit/:courseId',
    component: EditCourseComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'championship',
    component: ChampionshipHomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'championships/:championshipId',
    component: ChampionshipComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'championship/add',
    component: CreateChampionshipComponent,
    resolve: { codes: CodeResolverService},
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'images/manage/:itemId', // object type passed in params
    component: ManageScreenshotsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profiles/:profileId',
    component: UserComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile/edit', // User als Input-Param übergeben
    component: EditUserComponent,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
