import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { User } from 'src/app/auth/models/user-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister!: User

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService, private snackbar: MatSnackBar) { }

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
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)

      this.registerService.addNewUser(this.registerForm.value).subscribe(
        (user) => {
          this.redirection(this.userRegister)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  redirection(userRegister: User) {
    if (!!this.userRegister)
      this.router.navigate(['/auth/login'])
  }
  
  ngOnInit(): void {
  }

  openRegisterBar() {
    this.snackbar.open('El usuario se ha registrado exitosamente', '', {
      duration: 2500
    })
  }
}