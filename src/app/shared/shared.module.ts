import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { ValidateMatchPatternDirective } from './directives/validate-match-pattern.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { LoaderComponent } from './loader/loader.component';
import { NoPostsMessageComponent } from './no-posts-message/no-posts-message.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent,
    NoPostsMessageComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent,
    NoPostsMessageComponent
  ]
})
export class SharedModule { }
