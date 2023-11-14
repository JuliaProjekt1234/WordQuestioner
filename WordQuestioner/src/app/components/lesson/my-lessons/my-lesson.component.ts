import { Component } from "@angular/core";
import { Lesson, LessonFilter } from "src/app/models/lesson.model";
import { Views } from "src/app/models/views-enum.medel";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";
import { SnackBarService } from "src/app/services/view-services/snack-bar.service";
import { ViewService } from "src/app/services/view-services/view.service";


@Component({
  selector: 'my-lessons',
  templateUrl: './my-lesson.component.html',
  styleUrls: ['./my-lesson.component.scss']
})
export class MyLessonsComponent {
  public lessons: Lesson[] = [];
  public fliteredLessons: Lesson[] = [];
  public showLessons = false;
  public showSearchedLessons = true;

  constructor(
    private viewService: ViewService,
    private snackBarService: SnackBarService,
    private lessonHttpService: LessonHttpService
  ) {
    this.lessonHttpService.getLessons().subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;
      this.fliteredLessons = lessons;
      this.showLessons = lessons.length > 0;
    });
  }

  onChangeAddLessonView() {
    this.viewService.changeView(Views.AddLesson);
  }

  onFilterLessons(lessonFilter: LessonFilter) {
    this.fliteredLessons = LessonFilter.FilterLessons(lessonFilter, this.lessons);
    this.showSearchedLessons = this.fliteredLessons.length > 0;
    this.snackBarService.openSnackBar("data is searched")
  }
}
