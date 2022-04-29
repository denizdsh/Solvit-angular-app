import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) { }
}