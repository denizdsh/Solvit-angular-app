import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { icons, patterns } from 'src/app/shared/util';
import { ImageService } from 'src/app/shared/image.service';
import { IDialogData } from 'src/app/interfaces/dialogData';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  file: File | undefined;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private service: UserService,
    private dialog: MatDialog,
    private imageService: ImageService
  ) {
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

  fileChangeValueHandler(e: any): void {
    this.file = e.target.files[0];

    if (!this.file?.type.startsWith('image/'))
      return this.imageUrlEmitter.emit(undefined);

    let fr = new FileReader();
    fr.readAsDataURL(this.file);
    fr.onloadend = (e) => this.imageUrlEmitter.emit(fr.result as unknown as URL);
  }

  resetImageValuesHandler(imageFile: HTMLInputElement, imageUrl: NgModel) {
    this.file = undefined;
    imageFile.value = '';
    imageUrl.reset();
    this.emitImageUrl('');
  }

  dialogConfirm(callback: Function, data: IDialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (!!result)
          callback();
      })
  }

  editProfileHandler(form: NgForm): void {
    let { username, imageUrl, password } = form.value;

    this.dialogConfirm(
      () => {
        const action = () => this.service.editProfile({ username: username.trim(), imageUrl: imageUrl ? imageUrl.trim() : '', password: password.trim() }).subscribe({
          next: () => {
            this.router.navigate(['/'])

            this._snackbar.openFromComponent(NotificationComponent, {
              data: {
                type: 'success',
                message: 'Successfully edited profile!'
              }
            })
          },
          error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
            data: {
              type: 'error',
              message: err.error.message || 'Couldn\'t edit profile.'
            }
          })
        })

        if (this.file) {
          this.imageService.postImage(this.file).subscribe(image => {
            imageUrl = image.url
            action();
          })
        } else {
          action();
        }
      }, {
      title: 'Edit Profile confirmation',
      content: 'Are you sure you want to edit your profile?',
      cancel: 'Nevermind',
      continue: 'EDIT'
    }
    )
  }
}