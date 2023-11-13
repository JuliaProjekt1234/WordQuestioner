import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthentyficationHttpService } from "src/app/services/http-services/authentyfication-http.service";
import { ViewService } from "src/app/services/view-services/view.service";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public registrationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private viewService: ViewService,
    private authentyficationHttpService: AuthentyficationHttpService) {
    this.createForm();
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registrationForm.invalid) return;
    this.authentyficationHttpService.registration(
      new User(this.registrationForm.controls["login"].value, this.registrationForm.controls["password"].value)
    ).subscribe(() => {
      this.viewService.changeViewByUrl("/login")
    })
  }
}
