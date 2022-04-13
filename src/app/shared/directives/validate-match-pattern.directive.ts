import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[matchPattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateMatchPatternDirective,
      multi: true
    }
  ]
})
export class ValidateMatchPatternDirective {
  @Input() matchPattern: RegExp = /./;

  validate(control: AbstractControl): ValidationErrors | null {
    if(!control.value) return null

    if(!control.value.match(this.matchPattern)) return { matchPattern: true };

    return control.value.match(this.matchPattern)[0] !== control.value ? { matchPattern: {} } : null;
  }
}