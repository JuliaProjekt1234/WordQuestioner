import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLessonComponent } from './components/lesson/add-lesson/add-lesson.component';

const routes: Routes = [
  { path: "add_lesson", component: AddLessonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
