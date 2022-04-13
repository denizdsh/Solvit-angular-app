import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { icons, patterns } from 'src/app/shared/util';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  passwordType: 'password' | 'text' = 'password';

  constructor() { }

  get icons() { return icons };
  get patterns() { return patterns };

  togglePasswordVisibilityHandler(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  loginHandler(form: NgForm): void {
    if (form.invalid) return;

    const { email, password } = form.value;
    console.log(email.trim(), password.trim());
  }
}
