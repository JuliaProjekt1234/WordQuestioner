import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lesson } from "src/app/models/lesson.model";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";

@Component({
  selector: 'lesson-info',
  templateUrl: './lesson-info-component.html',
  styleUrls: ['./lesson-info-component.scss']
})

export class LessonInfoComponent {
  @Input() lesson: Lesson = Lesson.CreateDefaultLesson();
  @Output() onDeleteLesson = new EventEmitter<number>();


  constructor(private lessonHttpService: LessonHttpService) { }

  deleteLesson() {
    this.onDeleteLesson.emit(this.lesson.id);
  }

  onStartLesson() {
    this.lessonHttpService.startLesson(this.lesson.id).subscribe();
  }
}
