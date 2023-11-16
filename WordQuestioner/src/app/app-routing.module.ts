import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLessonComponent } from './components/lesson/add-lesson/add-lesson.component';
import { MyLessonsComponent } from './components/lesson/my-lessons/my-lesson.component';
import { LoginComponent } from './components/authentyfication/login/login.component';
import { RegistrationComponent } from './components/authentyfication/registration/registration.component';
import { RunLessonComponent } from './components/lesson/run-lesson/run-lesson.component';

const routes: Routes = [
  { path: "add_lesson", component: AddLessonComponent },
  { path: "my_lessons", component: MyLessonsComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "run_lesson", component: RunLessonComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
