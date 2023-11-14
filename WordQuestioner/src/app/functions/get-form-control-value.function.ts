import { FormGroup } from "@angular/forms";

export function getFormControlValue(form: FormGroup, controlName: string): string {
    return form.controls[controlName].value;
}