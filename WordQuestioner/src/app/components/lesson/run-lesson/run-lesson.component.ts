import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { getFormControlValue } from "src/app/functions/get-form-control-value.function";
import { Lesson } from "src/app/models/lesson.model";
import { RunLessonModel } from "src/app/models/run-lesson-models/run-lesson.model";
import { Views } from "src/app/models/views-enum.medel";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";
import { ViewService } from "src/app/services/view-services/view.service";


@Component({
  selector: 'run-lesson',
  templateUrl: './run-lesson.component.html',
  styleUrls: ['./run-lesson.component.scss']
})
export class RunLessonComponent {

  public lesson: Lesson = Lesson.CreateDefaultLesson();
  public runLessonModel: RunLessonModel = new RunLessonModel([]);
  public translationForm: FormGroup = new FormGroup({});
  public showAnswer = false;
  public isLessonFinished = false;

  constructor(
    private formBuilder: FormBuilder,
    private viewService: ViewService,
    private activatedRoute: ActivatedRoute,
    private lessonHttpService: LessonHttpService
  ) {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe(lesson => {
        this.lesson = lesson;
        this.runLessonModel = new RunLessonModel(this.lesson.translations);
        this.runLessonModel.lessonIsFinished$.subscribe((value) => {
          this.isLessonFinished = value;
          if (value)
            this.lessonHttpService.finishLesson(lesson.id).subscribe();
        })
        this.createForm();
      })
  }

  private createForm() {
    this.translationForm = this.formBuilder.group({
      word: [this.runLessonModel.getActiveWord(), [Validators.required]],
      translation: ['', [Validators.required]]
    });

    this.translationForm.controls["word"].disable();
  }

  navigateToMyLessonView() {
    this.viewService.changeView(Views.MyLessons);
  }

  async onSubmit() {
    this.showAnswer = !(await this.runLessonModel.checkCorrectness(getFormControlValue(this.translationForm, "translation")));
    this.translationForm.controls['word'].setValue(this.runLessonModel.getActiveWord());
    this.translationForm.controls['translation'].setValue('');
  }
}
