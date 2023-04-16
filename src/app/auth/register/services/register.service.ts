import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: User) {
    return this.http.post<User>('api/users/add', newUser)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/all')
  }
}
