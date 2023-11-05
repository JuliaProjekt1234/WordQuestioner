import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Translation } from "src/app/models/lesson.model";
import { SnackBarService } from "src/app/services/view-services/snack-bar.service";


@Component({
  selector: 'word-translations',
  templateUrl: './word-translations.component.html',
  styleUrls: ['./word-translations.component.scss']
})
export class WordTranslationsComponent {
  public translationsForm: FormGroup = new FormGroup({});
  public counter = 1;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {
    this.createForm();
  }

  public getTranslationValues(): Translation[] {
    if (this.translationsForm.invalid) {
      this.snackBarService.openSnackBar("Your translation is invalid");
      return [];
    }
    return Object.values(this.translationsForm.controls).map(gropup => {
      let formGroup = gropup as FormGroup;
      let word = formGroup.controls["word"].value;
      let translation = formGroup.controls["translation"].value;
      return new Translation(word, translation)
    })
  }

  public getListFromForm(): FormGroup[] {
    if (!this.translationsForm?.controls) return [];
    return Object.values(this.translationsForm.controls) as FormGroup[];
  }

  public getControl(controlName: string, index: number): FormControl {
    let group = this.getListFromForm()[index];
    return group.controls[controlName] as FormControl;
  }

  public onRemove(index: number) {
    let keyToRemove = Object.keys(this.translationsForm.controls)[index];
    delete this.translationsForm.controls[keyToRemove];
    this.lastFormGroupCreator();
  }

  public onRemoveSelected() {
    this.translationsForm.controls = this.getFromGroupWithUnselected();
    this.lastFormGroupCreator();
  }

  public onSubmit() {
    this.addEmptyControl();
  }

  private lastFormGroupCreator() {
    if (Object.values(this.translationsForm.controls).length == 0) this.addEmptyControl();
  }

  private createForm(): void {
    let firstFormGroup = this.getEmptyGroup();
    this.translationsForm = this.formBuilder.group({
      "0": firstFormGroup,
    });
  }

  private getEmptyGroup() {
    return this.formBuilder.group({
      isSelected: [true],
      word: ["", [Validators.required]],
      translation: ["", [Validators.required]]
    })
  }

  private getFromGroupWithUnselected(): { [key: string]: FormGroup } {
    return Object.entries(this.translationsForm.controls)
      .filter(([key, control]) => !(control as FormGroup).controls["isSelected"].value)
      .reduce((result: { [key: string]: FormGroup }, [key, control]) => {
        result[key] = control as FormGroup;
        return result;
      }, {});
  }

  private addEmptyControl() {
    let emptyGroup = this.getEmptyGroup();
    this.translationsForm.addControl(this.counter.toString(), emptyGroup);
    this.counter++;
  }
}
