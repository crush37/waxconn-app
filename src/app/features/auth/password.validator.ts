import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [p: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  static matchValidator(control: AbstractControl): { [p: string]: any } | null {
    const password: string = control.parent?.get('password')?.value;
    return password === control.value ? null : { NoPasswordMatch: true };
  }
}
