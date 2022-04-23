import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { icons, patterns } from 'src/app/shared/util';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  passwordType: 'password' | 'text' = 'password';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UserService
  ) { }

  get icons() { return icons };
  get patterns() { return patterns };

  togglePasswordVisibilityHandler(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  loginHandler(form: NgForm): void {
    if (form.invalid) return;

    let { email, password } = form.value;

    this.service.login({ email: email.trim(), password: password.trim() }).subscribe({
      next: () => this.router.navigate([this.activatedRoute.snapshot.queryParams['redirect'] || '/']),
      error: () => window.alert('Couldn\'t log in')
    });
  }
}
