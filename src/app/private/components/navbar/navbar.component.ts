import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/private/services/results.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private resultService: ResultsService) { }

  ngOnInit(): void {
    this.getUserDeposit()
  }

  getFullname = sessionStorage.getItem('username');
  sessionUserId = sessionStorage.getItem('user_id');
  deposit: string;

  getUserDeposit() {
    this.resultService.getUserById(this.sessionUserId!).subscribe(
      (user) => {
        this.deposit = user.deposit
      },
      (error) => {
        console.log(error)
      }
    )
    return
  }
}
