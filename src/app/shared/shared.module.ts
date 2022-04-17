import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMatchPatternDirective } from './directives/validate-match-pattern.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';
import { AvatarComponent } from './avatar/avatar.component';



@NgModule({
  declarations: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent
  ]
})
export class SharedModule { }
