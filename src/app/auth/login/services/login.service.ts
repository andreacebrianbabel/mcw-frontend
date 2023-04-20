import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserLog(loggedUser: User): Observable<User> {
    return this.http.get<User>('api/users/'+loggedUser.username+"/"+loggedUser.password)
  }

  getUserLogin() {
    return sessionStorage.getItem('fullname' || '')
  }

  logout() {
    return sessionStorage.removeItem('fullname')
  }
}
