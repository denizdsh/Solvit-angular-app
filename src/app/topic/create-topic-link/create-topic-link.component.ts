import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-topic-link',
  templateUrl: './create-topic-link.component.html',
  styleUrls: ['./create-topic-link.component.css']
})
export class CreateTopicLinkComponent {
  @Output() triggerCreateTopic = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private userService: UserService) { }

  get user(): IUser | undefined { return this.userService.user; }

  redirectHandler(): void {
    if (this.user) {
      this.triggerCreateTopic.emit(true);
      return;
    }

    this.router.navigate(['/user/login']);

    this._snackbar.openFromComponent(NotificationComponent, {
      data: {
        type: 'warning',
        message: 'You have to be authenticated to post topics'
      }
    })
  }
}