import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ITopic, ITopicData } from 'src/app/interfaces';
import { IDialogData } from 'src/app/interfaces/dialogData';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent {
  @Input() topicInput!: ITopic;
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
    private service: TopicService) { }

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

  editTopicHandler(body: ITopicData): void {
    this.dialogConfirm(() =>
      this.service.editTopic(this.topicInput._id, body).subscribe({
        next: (topic) => {
          this.closeCreateTopic.emit(false);

          this.router.navigate(['/'], { skipLocationChange: true })
            .then(() => this.router.navigate(['/t/' + topic._id]))

          this._snackbar.openFromComponent(NotificationComponent, {
            data: {
              type: 'success',
              message: 'Successfully edited your topic.'
            }
          })
        },
        error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            type: 'error',
            message: err.error.message || 'Couldn\'t edit topic.'
          }
        })
      }), {
      title: 'Edit Topic confirmation',
      content: 'Are you sure you want to edit this topic?',
      cancel: 'Nevermind',
      continue: 'EDIT'
    })
  }
}