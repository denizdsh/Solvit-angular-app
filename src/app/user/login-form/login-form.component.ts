import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { icons, patterns } from 'src/app/shared/util';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  passwordType: 'password' | 'text' = 'password';

  constructor(private router: Router, private service: UserService) { }

  get icons() { return icons };
  get patterns() { return patterns };

  togglePasswordVisibilityHandler(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  loginHandler(form: NgForm): void {
    if (form.invalid) return;

    let { email, password } = form.value;

    try {
      this.service.login({ email: email.trim(), password: password.trim() });
      this.router.navigate(['']);
    } catch (e) {
      window.alert(e);
    }
  }
}
