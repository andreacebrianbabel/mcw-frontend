import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public registerForm = this.fb.group({
    username: ['', Validators.minLength(3)],
    fullname: ['', Validators.required],
    password: ['', Validators.minLength(6)],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.email],
    deposit: ['', Validators.required],
  },
    {
      validator: this.matchingPassword("password", "confirmPassword")
    })

  matchingPassword(passwordControl: string, matchingPasswordControl: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[passwordControl]
      let matchingControl = formGroup.controls[matchingPasswordControl]

      if (matchingControl.errors && !matchingControl.errors.matchingPassword) { return; }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ matchingPassword: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);

    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  newUser() {
    if (this.registerForm.valid)
      console.log("nuevo usuario creado", this.registerForm.value)
    else
      console.log("fallo al crear el nuevo usuario", this.registerForm.value)
  }



}