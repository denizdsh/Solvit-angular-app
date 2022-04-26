import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { icons, patterns } from 'src/app/shared/util';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
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
export class EditProfileComponent {
  @Output() imageUrlEmitter: EventEmitter<URL> = new EventEmitter();

  passwordType: 'password' | 'text' = 'password';
  showImageInput: boolean = false;

  constructor(private router: Router, private service: UserService) {
    if (this.service.user?.imageUrl) this.showImageInput = true;
  }

  get icons() { return icons; };
  get patterns() { return patterns; };
  get user(): IUser | undefined { return this.service.user; };

  togglePasswordVisibilityHandler(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  toggleShowImageInputHandler(): void {
    this.showImageInput = !this.showImageInput;
  }

  emitImageUrl(url: string): void {
    if (url === url.match(patterns.url)?.[0]) this.imageUrlEmitter.emit(url as unknown as URL);
    else this.imageUrlEmitter.emit(undefined);
  }

  editProfileHandler(form: NgForm): void {
    const { username, imageUrl, password } = form.value;

    this.service.editProfile({ username: username.trim(), imageUrl: imageUrl.trim(), password: password.trim() }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.log(err)
    })
  }
}
