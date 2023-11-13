import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthentyficationHttpService } from "src/app/services/http-services/authentyfication-http.service";
import { ViewService } from "src/app/services/view-services/view.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private viewService: ViewService,
    private authentyficationHttpService: AuthentyficationHttpService) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  onSubmit() {
    this.authentyficationHttpService.login(this.loginForm.controls["login"].value, this.loginForm.controls["password"].value)
      .subscribe(() => this.viewService.chageToActivView());
  }
}
