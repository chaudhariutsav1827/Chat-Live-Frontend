import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMAIL_REGEX, PASSWORD_REGEX } from "src/app/shared/constants/regex.constant";
import { RequiredFormsModule } from "src/app/shared/modules/required-forms.module";
import { LoginRepository } from "../../repositories/login.repository";
import { AuthService } from "@core/services";
import { Router } from "@angular/router";
import { RoutingPaths } from "@core/constants";

@Component({
  selector: "chat-live-login",
  standalone: true,
  imports: [RequiredFormsModule],
  providers: [LoginRepository],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginRepo: LoginRepository, private authService: AuthService, private router: Router) {
    this.initializeForm();
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginRepo.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.authService.setToken(res.data.token);
            this.router.navigate([RoutingPaths.Home]);
          }
        },
      });
    }
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl("", [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
    });
  }
}
