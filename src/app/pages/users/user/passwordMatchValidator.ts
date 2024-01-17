import { FormGroup, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
  
    return password && passwordConfirm && password.value !== passwordConfirm.value
      ? { 'passwordsNotMatching': true }
      : null;
  };