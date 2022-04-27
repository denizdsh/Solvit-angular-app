import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface INotification {
  message: string,
  type: 'success' | 'error' | 'warning' | 'info'
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: INotification, public service: MatSnackBar) { }
}
