import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMatchPatternDirective } from './directives/validate-match-pattern.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';



@NgModule({
  declarations: [
    ValidateMatchPatternDirective,
    ValidateSameValueDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ValidateMatchPatternDirective,
    ValidateSameValueDirective
  ]
})
export class SharedModule { }
