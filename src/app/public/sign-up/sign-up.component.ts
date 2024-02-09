import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ValidationServiceService } from 'src/app/validation-service.service';

@Component({
  selector: 'pm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  // signupForm = new FormGroup({
  //   fName: new FormControl('',Validators.required),
  //   lName: new FormControl('',[Validators.required, Validators.minLength(2)]),
  //   mName: new FormControl('',Validators.required),
  //   hasNoMiddleName: new FormControl(false),
  //   password:new FormControl('')
  // })

  signupForm = this.validator.signupForm


  constructor(private formBuilder: FormBuilder,private validator:ValidationServiceService) {}

  get favoriteProducts() {
    return this.validator.signupForm.get('favoriteProducts') as FormArray;
  }

  ngOnInit(): void {
    this.validator.signupForm.get('hasNoMiddleName')?.valueChanges.subscribe((val) => {
      const control = this.validator.signupForm.get('mName');
      if (control) {
        if (val == true) {
          control.clearValidators();
        } else {
          control.setValidators(Validators.required);
        }
        control.updateValueAndValidity();
      }
    });
  }

  resetForm() {
    this.validator.signupForm.reset();
  }


  addProduct() {
    this.favoriteProducts.push(this.formBuilder.control(''));
  }

  setValue() {
    this.validator.signupForm.setValue({
      fName: 'Casey',
      lName: 'Valdez',
      mName: 'Casey',
      hasNoMiddleName: true,
      email:'blah@blahblah.com',
      passwordGroup: {
        password: 'password',
        confirmPassword: 'password',
      },
      favoriteProducts: ['product1', 'product2'],
    });
  }

  patchValue() {
    this.validator.signupForm.patchValue({
      fName: 'Casey',
    });
  }
  submitForm() {
    if (this.validator.signupForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Successful!');
      console.log(this.validator.signupForm.value);
      this.validator.signupForm.reset();
    }
  }
}
