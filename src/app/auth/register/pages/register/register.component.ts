import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  userExist: boolean = false
  registeredEmail: string[]
  emailCoincidence?: string

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
    }
  )

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

  userRegistered() {
    this.registerService.getAllUsers().subscribe(
      (user) => {
        this.registeredEmail = user.map(element => element.email)

        this.emailCoincidence = this.registeredEmail.find(element => element === this.registerForm.get('email')?.value)

        if (!!this.emailCoincidence)
          this.userExist = true
      },
      (error) => {
        console.log(error)
      }
    )
    return this.emailCoincidence
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);

    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  newUser() {
    this.userRegistered()
    if (this.userExist == true) {

      this.openUserCoincidenceBar()

    } else if (this.registerForm.valid) {
      this.registerService.addNewUser(this.registerForm.value).subscribe(
        (user) => {
          this.openRegisterBar()
          setTimeout(() => {
            this.router.navigate(['/auth/login'])
          }, 3000)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  ngOnInit(): void {
  }

  openRegisterBar() {
    this.snackbar.open('El usuario se ha registrado exitosamente', '', {
      duration: 2500
    })
  }

  openUserCoincidenceBar() {
    this.snackbar.open('Este usuario ya está regisrado', '', {
      duration: 2500
    })
  }
}