import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { getFormControlValue } from "src/app/functions/get-form-control-value.function";
import { LessonFilter, QuestionerLanguageMode, QuestionerType } from "src/app/models/lesson.model";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";


@Component({
  selector: 'lesson-search',
  templateUrl: './lesson-search.component.html',
  styleUrls: ['./lesson-search.component.scss']
})
export class LessonSearchComponent {
  @Output() onFilterLessons = new EventEmitter<LessonFilter>();

  public lessonSearchForm: FormGroup = new FormGroup({});
  public questionerTypes: string[] = [''];
  public questionerLanguageModes: string[] = [''];
  public categories: string[] = [''];
  public activeColor: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private lessonHttpService: LessonHttpService
  ) {
    this.createForm();
    this.questionerTypes = this.questionerTypes.concat(Object.values(QuestionerType));
    this.questionerLanguageModes = this.questionerLanguageModes.concat(Object.values(QuestionerLanguageMode));
    this.lessonHttpService.getCategories().subscribe(categories =>
      this.categories = this.categories.concat(categories)
    )
  }

  private createForm() {
    this.lessonSearchForm = this.formBuilder.group({
      name: [''],
      category: [''],
      questionerType: [''],
      questionerLanguageMode: ['']
    })
  }

  onChangedTagColor(colorValue: string) {
    this.activeColor = colorValue;
  }

  onSubmit() {
    var lessonFilter = new LessonFilter(
      getFormControlValue(this.lessonSearchForm, "name"),
      getFormControlValue(this.lessonSearchForm, "category"),
      this.activeColor,
      getFormControlValue(this.lessonSearchForm, "questionerType") as QuestionerType,
      getFormControlValue(this.lessonSearchForm, "questionerLanguageMode") as QuestionerLanguageMode,
    )
    this.onFilterLessons.emit(lessonFilter);
  }
}
