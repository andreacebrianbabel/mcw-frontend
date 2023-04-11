import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user-model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLog!: User

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  loginUser() {
    this.loginService.getUserLog(this.loginForm.value).subscribe(
      (user) => {
        this.userLog = user;
        sessionStorage.setItem('name', this.loginForm.get('username')?.value)
        sessionStorage.setItem('user_id', this.userLog.user_id)

        console.log("usuario logeado", user)

        this.redirection(this.userLog)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  redirection(userLog: User) {
    if (this.userLog) {
      // this.router.navigate(['/results'])
    } else {
      this.router.navigate(['/auth/register'])
    }
  }

  ngOnInit() { }
}
