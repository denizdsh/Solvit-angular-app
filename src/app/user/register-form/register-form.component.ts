import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
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
    ]),
    trigger('avatarError', [
      state('closed', style({
        bottom: '15px',
        left: '100%',
        transform: 'translate(-100%, 0)'
      })),
      state('open', style({})),
      transition('closed => open', [animate('0.2s')]),
      transition('open => closed', [animate('0.2s')])
    ])
  ]
})
export class RegisterFormComponent {
  @Output() imageUrlEmitter: EventEmitter<URL> = new EventEmitter();

  passwordType: 'password' | 'text' = 'password';
  repasswordType: 'password' | 'text' = 'password';
  showImageInput: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackbar: MatSnackBar,
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

  emitImageUrl(url: string): void {
    if (url === url.match(patterns.url)?.[0]) this.imageUrlEmitter.emit(url as unknown as URL);
    else this.imageUrlEmitter.emit(undefined);
  }

  registerHandler(form: NgForm): void {
    if (form.invalid) return;

    const { email, username, password, repassword, imageUrl } = form.value;

    this.service.register({
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      repassword: repassword.trim(),
      imageUrl: imageUrl.trim()
    }).subscribe({
      next: () => {
        this.router.parseUrl(this.activatedRoute.snapshot.queryParams['redirect'] || '/')

        this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            type: 'success',
            message: 'Welcome to Solvit!'
          }
        })
      },
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.messagge || 'Coulndn\'t register.'
        }
      })
    });
  }
}