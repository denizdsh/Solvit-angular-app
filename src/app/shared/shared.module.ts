import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMatchPatternDirective } from './directives/validate-match-pattern.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective,
    AvatarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
