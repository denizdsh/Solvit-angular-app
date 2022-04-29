import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValidateMatchPatternDirective } from './directives/validate-match-pattern.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { LoaderComponent } from './loader/loader.component';
import { NoPostsMessageComponent } from './no-posts-message/no-posts-message.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent,
    NoPostsMessageComponent,
    DialogComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent,
    NoPostsMessageComponent,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3500,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      }
    }
  ]
})
export class SharedModule { }
