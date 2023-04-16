import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user-model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLog!: User

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) { }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  loginUser() {
    this.loginService.getUserLog(this.loginForm.value).subscribe(
      (user) => {
        this.userLog = user;

        if (!this.userLog) {
          this.openLoginBar()

        }
        else {
          sessionStorage.setItem('username', this.loginForm.get('username')?.value)
          sessionStorage.setItem('user_id', this.userLog.user_id)
          this.redirection(this.userLog)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  openLoginBar() {
    this.snackbar.open('El usuario con el que intenta acceder no existe', '', {
      duration: 2500
    })
  }

  redirection(userLog: User) {
    if (userLog) {
      this.router.navigate(['/private/results'])
    } else {
      this.router.navigate(['/auth/register'])
    }
  }

  ngOnInit() { }
}
