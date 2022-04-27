import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ITopic, ITopicData } from 'src/app/interfaces';
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
    private service: TopicService) { }

  editTopicHandler(body: ITopicData): void {
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
    })
  }
}