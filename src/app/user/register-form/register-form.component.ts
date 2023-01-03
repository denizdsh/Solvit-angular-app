import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/image.service';
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
  file: File | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private service: UserService,
    private imageService: ImageService
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

  fileChangeValueHandler(e: any): void {
    this.file = e.target.files[0];

    if (!this.file?.type.startsWith('image/'))
      return this.emitImageUrl('');

    let fr = new FileReader();
    fr.readAsDataURL(this.file);
    fr.onloadend = (e) => this.emitImageUrl(fr.result as string);
  }

  resetImageValuesHandler(imageFile: HTMLInputElement, imageUrl: NgModel) {
    this.file = undefined;
    imageFile.value = '';
    imageUrl.reset();
    this.emitImageUrl('');
  }

  registerHandler(form: NgForm): void {
    if (form.invalid) return;

    let { email, username, password, repassword, imageUrl } = form.value;

    const action = () => this.service.register({
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      repassword: repassword.trim(),
      imageUrl: imageUrl ? imageUrl.trim() : ''
    }).subscribe({
      next: () => {
        this.router.navigate([this.activatedRoute.snapshot.queryParams['redirect'] || '/'])

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
          message: err.messagge || 'Couldn\'t register'
        }
      })
    });

    if (this.file) {
      this.imageService.postImage(this.file).subscribe(image => {
        console.log(image.url);
        imageUrl = image.url;
        action();
      })
    } else {
      action();
    }
  }
}