import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'word-translations',
  templateUrl: './word-translations.component.html',
  styleUrls: ['./word-translations.component.scss']
})
export class WordTranslationsComponent {
  public translationsForm: FormGroup = new FormGroup({});
  public counter = 1;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
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
      "isSelected": { value: true },
      "word": { value: "" },
      "translation": { value: "" }
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
