import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { icons, patterns } from 'src/app/shared/util';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({
        maxHeight: '0px',
        margin: '0 auto',
        overflow: 'hidden'
      })),
      state('open', style({
        maxHeight: 'calc(2.5rem + 37px)',
        marginBottom: '10px'
      })),
      transition('closed => open', [animate('0.2s')]),
      transition('open => closed', [animate('0.2s')])
    ])
  ]
})
export class RegisterFormComponent {
  passwordType: 'password' | 'text' = 'password';
  repasswordType: 'password' | 'text' = 'password';
  showImageInput: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UserService
  ) { }

  get icons() { return icons };
  get patterns() { return patterns };


  togglePasswordVisibilityHandler(isRepassword: any = false): void {
    if (isRepassword) {
      this.repasswordType = this.repasswordType === 'password' ? 'text' : 'password';
      return;
    }

    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  toggleShowImageInputHandler(): void {
    this.showImageInput = !this.showImageInput;
  }

  registerHandler(form: NgForm): void {
    if (form.invalid) return;

    const { email, username, password, repassword, imageUrl } = form.value;
    console.log()

    this.service.register({
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      repassword: repassword.trim(),
      imageUrl: imageUrl.trim()
    }).subscribe({
      next: () => this.router.parseUrl(this.activatedRoute.snapshot.queryParams['redirect'] || '/'),
      error: (err) => window.alert(err[0])
    });
  }
}