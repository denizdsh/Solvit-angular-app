import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm, NgModel, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[sameValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateSameValueDirective,
      multi: true
    }
  ]
})
export class ValidateSameValueDirective implements OnDestroy {
  @Input() sameValue!: NgModel; //second input
  subscription: Subscription | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    let invalid = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this.subscription = this.sameValue.valueChanges?.subscribe(() => { //listen to changes in second input
      control.updateValueAndValidity({ onlySelf: true });
    }) || null

    if (control.value?.trim() !== this.sameValue.value?.trim()) invalid = true;

    return invalid ? { sameValue: {} } : null;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
