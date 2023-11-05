import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppConstants } from "src/app/constants/app-constants";
import { Lesson, QuestionerLanguageMode, QuestionerType, Translation } from "src/app/models/lesson.model";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";
import { SnackBarService } from "src/app/services/view-services/snack-bar.service";
import { WordTranslationsComponent } from "./word-translations/word-translations.component";

@Component({
  selector: 'add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent {
  @ViewChild("translationsBox") translationsBoxRef: any;

  public addLessonForm: FormGroup = new FormGroup({});
  public activeColorTag = AppConstants.ColorsToChoose[0];
  public categories: string[] = [];
  public questionerTypes: string[] = [];
  public questionerLanguageModes: string[] = [];

  constructor(
    private formBuider: FormBuilder,
    private snackBarService: SnackBarService,
    private lessonHttpService: LessonHttpService
  ) {
    this.lessonHttpService.getCategories().subscribe(categries => this.categories = categries);
    this.createForm();
    this.questionerTypes = Object.values(QuestionerType);
    this.questionerLanguageModes = Object.values(QuestionerLanguageMode);
  }

  private createForm() {
    this.addLessonForm = this.formBuider.group({
      name: ['', [Validators.required]],
      category: [this.categories.length > 0 ? this.categories[0] : "", [Validators.required]],
      questionerType: [QuestionerType.Write.toString(), [Validators.required]],
      questionerLanguageMode: [QuestionerLanguageMode.LeftWord.toString(), [Validators.required]]
    })
  }

  public addCategory(categoryName: string) {
    this.lessonHttpService.addCategory(categoryName).subscribe(
      (category: string) => {
        this.categories.push(category);
        this.snackBarService.openSnackBar("New category was added");
      },
      () => {
        this.snackBarService.openSnackBar("Added category - error")
      });
  }

  public onChangedTagColor(color: string) {
    this.activeColorTag = color;
  }

  onSubmit() {
    if (this.addLessonForm.invalid) return;
    let translations = (this.translationsBoxRef as WordTranslationsComponent).getTranslationValues();
    if (!translations || translations.length == 0) return;
    let lesson = this.createLessonFromForm(translations);
    this.lessonHttpService.addNewLesson(lesson).subscribe(() =>
      this.snackBarService.openSnackBar("Lesson was added")
    )
  }

  private createLessonFromForm(translations: Translation[]): Lesson {
    return new Lesson(this.getValueFromForm("name"), this.getValueFromForm("category"), this.activeColorTag,
      0, 0, translations, this.getValueFromForm("questionerType") as QuestionerType, this.getValueFromForm("questionerLanguageMode") as QuestionerLanguageMode)
  }

  private getValueFromForm(controlName: string): string {
    return this.addLessonForm.controls[controlName].value;
  }
}
