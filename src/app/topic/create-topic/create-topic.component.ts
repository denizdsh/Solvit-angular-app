import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ITopicData } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private service: TopicService
  ) { }

  createTopicHandler(body: ITopicData): void {
    this.service.createTopic(body).subscribe({
      next: (topic) => {
        this.closeCreateTopic.emit(false);

        this.router.navigate(['/t/' + topic._id])

        this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            type: 'success',
            message: 'Successfully posted a topic.'
          }
        })
      },
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || 'Couldn\'t post topic.'
        }
      })
    })
  }
}