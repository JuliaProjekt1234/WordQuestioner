import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lesson } from "src/app/models/lesson.model";


@Component({
  selector: 'lesson-info',
  templateUrl: './lesson-info-component.html',
  styleUrls: ['./lesson-info-component.scss']
})

export class LessonInfoComponent {
  @Input() set setLesson(value: Lesson) {
    this.lesson = value;
    this.borderStyle = `solid 4px ${value.colorTag}`;
  }
  @Output() onDeleteLesson = new EventEmitter<number>();

  lesson: Lesson = Lesson.CreateDefaultLesson();
  borderStyle = `solid 4px white`;

  deleteLesson() {
    this.onDeleteLesson.emit(this.lesson.id);
  }
}
