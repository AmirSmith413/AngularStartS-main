import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  constructor(private formBuilder:FormBuilder) { }


  signupForm = this.formBuilder.group({
    fName: ['', Validators.required],
    lName: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    mName: ['', Validators.required],
    hasNoMiddleName: [false],
    email:['',Validators.required],
    passwordGroup: this.formBuilder.group(
      {
        password: '',
        confirmPassword: '',
      },
      { validator: this.passwordMatch } as AbstractControlOptions
    ),
    favoriteProducts: this.formBuilder.array([this.formBuilder.control('')]),
  });

  forbiddenName(c: AbstractControl): ValidationErrors | null {
    if (c.value && c.value.toLowerCase() === 'test') {
      return { forbiddenName: true };
    }
    return null;
  }
  emailCheck(c: AbstractControl): ValidationErrors | null {
    if (c.value && c.value.includes('@')) {
      return { emailCheck: true };
    }
    return null;
  }
  passwordMatch(c: AbstractControl): ValidationErrors | null {
    const password = c.get('password');
    const confirmPassword = c.get('confirmPassword');

    if (
      password?.value &&
      confirmPassword?.value &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  }

}
