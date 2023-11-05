import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppConstants } from "src/app/constants/app-constants";
import { LessonHttpService } from "src/app/services/http-services/lesson-http.service";
import { SnackBarService } from "src/app/services/view-services/snack-bar.service";

@Component({
  selector: 'add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent {
  public addLessonForm: FormGroup = new FormGroup({});
  public activeColorTag = AppConstants.ColorsToChoose[0];
  public categories: string[] = [];

  constructor(
    private formBuider: FormBuilder,
    private snackBarService: SnackBarService,
    private lessonHttpService: LessonHttpService
  ) {
    this.createForm();
    this.lessonHttpService.getCategories().subscribe(categries => this.categories = categries)

  }

  private createForm() {
    this.addLessonForm = this.formBuider.group({
      name: ['', [Validators.required]]
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
}
